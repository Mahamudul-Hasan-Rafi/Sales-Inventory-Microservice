import { useState, useEffect } from "react";

const product_url="http://localhost:8100/"
const order_url="http://localhost:8200/"

export const Order=()=>{
    const[id,setId]=useState('')
    const[quantity, setQuantity]=useState('')
    const[message, setMessage]=useState('')

    useEffect(()=>{
        fetch(product_url+"product/"+id)
        .then(response=>{
            if(response.ok){
                return response.json();
            }
            throw response;
        })
        .then(data=>{
            const price=parseFloat(data.price);
            setMessage(`Your Product Price is $${price+price*0.2}`)
        })
        .catch(error=>{
            console.log(error);
        })
    },[id])

    const handleOrder=(event)=>{
        event?.preventDefault();

        const json_string=JSON.stringify({'product_id':id, 'quantity':quantity})
        console.log('Ola')

        const requestOption={
            method: 'POST',
            headers: new Headers({
                'Content-Type':'application/json'
            }),
            body: json_string
        }

        fetch(order_url+"orders",requestOption)
        .then(response=>{
            if(response.ok){
                return response.json()
            }
            throw response;
        })
        .then(data=>{
            setMessage(`Order sent for ${quantity} items`)
        })
        .catch(error=>{
            console.log(error);
        })
    }

    return (
        <div className="body">
            <div className="order_title title">Order</div>
            <div>
                <input className="input-1" placeholder="Id" onChange={(event)=>setId(event.target.value)}/>
            </div>
            <div>
                <input className="input-1" placeholder="Quantity" onChange={(event)=>setQuantity(event.target.value)}/>
            </div>
            <button className="button-4" onClick={handleOrder}>Place Order</button>
            <div className="form_message">
                {message}
            </div>
        </div>
    )
}