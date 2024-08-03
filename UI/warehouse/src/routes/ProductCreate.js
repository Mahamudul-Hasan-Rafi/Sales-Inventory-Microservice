import { useState } from "react";
import { useNavigate } from "react-router-dom";

const base_url="http://localhost:8100/"

export const ProductCreate=()=>{
    const[name, setName]=useState('')
    const[price, setPrice]=useState('')
    const[quantity, setQuantity]=useState('')
    const navigate=useNavigate()

    const handleCreateProduct=(event)=>{
        event?.preventDefault()
        const json_string=JSON.stringify({name, price, quantity})

        console.log("Hello")

        const requestOption={
            method:'POST',
            headers: new Headers({
                'Content-Type':'application/json'
            }),
            body: json_string
        }

        fetch(base_url+"product", requestOption)
        .then(response=>{
            if(!response.ok)
                throw response
        })
        .then(data=>{
            navigate("/")
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <div className="new_product body">
            <div className="new_product_title title">
                Create a New Product
            </div>
            <div>
                <input className="input-1" placeholder="Name" onChange={(event)=>setName(event.target.value)}/>
            </div>
            <div>
                <input className="input-1" placeholder="Price" onChange={(event)=>setPrice(event.target.value)}/>
            </div>
            <div>
                <input className="input-1" placeholder="Quantity" onChange={(event)=>setQuantity(event.target.value)}/>
            </div>
            <div>
                <button className="button-4" onClick={handleCreateProduct}>Create Product</button>
            </div>
        </div>
    )
}