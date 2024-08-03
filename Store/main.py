from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection, HashModel
from pydantic import BaseModel
import requests # type: ignore
from fastapi.background import BackgroundTasks
import time


app=FastAPI()

redis = get_redis_connection(
    host="redis-14929.c326.us-east-1-3.ec2.redns.redis-cloud.com",
    port=14929,
    password="EIwv3da44ssyv9GR5gYNeSoVlDBu26uc",
    decode_responses=True
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


class ProductOrder(BaseModel):
    product_id: str
    quantity: int


class Order(HashModel):
    product_id: str
    price: float
    fee: float
    total: float
    quantity: int
    status: str

    class Meta:
        database=redis


@app.post("/orders")
def create_order(productOrder:ProductOrder, background_tasks: BackgroundTasks):
    response=requests.get(f"http://127.0.0.1:8100/product/{productOrder.product_id}")
    product=response.json()

    fee=product['price']*0.2
    quantity=productOrder.quantity

    order=Order(
        product_id=product['id'],
        price=product['price'],
        fee=fee,
        quantity=productOrder.quantity,
        total=(product['price']+fee)*quantity,
        status="pending"
    )

    order.save()
    background_tasks.add_task(order_completed, order)

    return order


@app.get("/order/{pk}")
def get(pk: str):
    try:
        return format(pk)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@app.get("/orders")
def all_orders():
    return [format(pk) for pk in Order.all_pks()]

def format(pk: str):
    order=Order.get(pk)

    return {
        "order_id":order.pk,
        "product_id":order.product_id,
        "price":order.price,
        "fee":order.fee,
        "quantity":order.quantity,
        "total":order.total,
        "status":order.status
    }

@app.delete("/order/{pk}")
def delete(pk: str):
    try:
        return Order.delete(pk)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    
@app.delete("/orders")
def delete_all():
    return redis.flushdb()


def order_completed(order: Order):
    time.sleep(5)
    order.status='completed'
    order.save()

    print('heyyy')

    redis.xadd(name="order-completed", fields=order.model_dump())

