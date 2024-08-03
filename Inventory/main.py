from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from elasticsearch import Elasticsearch
from pydantic import BaseModel

app = FastAPI()

es=Elasticsearch(hosts=["http://localhost:9200"], basic_auth=('elastic','mmfqPmv=Qqx-aciUy6uj'))

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)

class Product(BaseModel):
    name: str
    price: float
    quantity: int

@app.post("/product")
def create_product(product: Product):
    try:
        response=es.index(index="products", body=product.model_dump())
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/product/{pk}")
def get(pk: str):
    try:
        return format(pk)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/products")
def get_all():
    query={
        "query":{
            "match_all":{}
        }
    }

    response=es.search(index="products", body=query)
    products=response['hits']['hits']

    return [format(product['_id']) for product in products]

def format(pk: str):
    try:
        product=es.get(index="products", id=pk)

        return {
            "id": product['_id'],
            "name":product['_source']['name'],
            "price":product['_source']['price'],
            "quantity":product['_source']['quantity']
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.put("/product/{pk}")
def update(pk: str, product: Product):
    try:
        return es.update(index="products", id=pk, body={'doc':product.model_dump()})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/product/{pk}")
def delete(pk: str):
    try:
        return es.delete(index="products", id=pk)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
