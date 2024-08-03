from redis_om import get_redis_connection
from main import redis, Order
import time

key="refunded"
group="group-stream"

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
                order_refunded=Order.get(order['pk'])
                order_refunded.status=order['status']
                print(order_refunded)
                order_refunded.save()

    except Exception as e:
        print(str(e))

    time.sleep(3)