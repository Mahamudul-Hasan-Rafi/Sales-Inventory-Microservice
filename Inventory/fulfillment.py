from redis_om import get_redis_connection
from main import es, Product
import time

redis = get_redis_connection(
    host="redis-14929.c326.us-east-1-3.ec2.redns.redis-cloud.com",
    port=14929,
    password="EIwv3da44ssyv9GR5gYNeSoVlDBu26uc",
    decode_responses=True
)

key="order-completed"
group="redis-stream"

try:
    redis.xgroup_create(name=key, groupname=group, mkstream=True)
except Exception as e:
    print(str(e))


while True:
    try:
        results=redis.xreadgroup(groupname=group, consumername=key, streams={key:'>'})
        if results!=[]:
            for result in results:
                order=result[1][0][1]
                print(order)
                try:
                    prod=es.get(index="products", id=order['product_id'])
                    prod['_source']['quantity']-=int(order["quantity"])
                    if prod['_source']['quantity']<0:
                        order["status"]="refunded"
                        redis.xadd(name='refunded', fields=order)
                    else:
                        es.update(index="products", id=order["product_id"], body={'doc':prod['_source']})
                except Exception as e:
                    redis.xadd(name='refunded', fields=order)
    except Exception as e:
        print(str(e))

    time.sleep(3)