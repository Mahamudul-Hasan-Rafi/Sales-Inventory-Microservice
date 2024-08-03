import {useEffect, useState} from 'react'
import './Products.css'
import { Link } from 'react-router-dom';

const base_url="http://localhost:8100/"
export const Products = ()=>{
    const[products, setProducts] = useState([]);
    const[polling, setPolling] = useState(true);

    useEffect(()=>{
        const fetchData=()=>{
            fetch(base_url+"products")
            .then(response=>{
                const json=response.json()

                if(response.ok){
                    setPolling(false);
                    return json
                }

                throw response
            })
            .then(data=>{
                setProducts(data);
            })
            .catch(error=>{
                console.log(error)
            })
        }

        if(polling){
            const intervalId = setInterval(fetchData, 1000);
            
            return ()=>clearInterval(intervalId)
        }

    },[polling])

    const handleDelete=(event, id)=>{
        event?.preventDefault()

        const requestOption={
            method: 'DELETE'
        }

        fetch(base_url+"product/"+id, requestOption)
        .then(response=>{
            if(response.ok){
                window.location.reload()
            }
            throw response
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <div className='products_div body'>
            <div className='products_title title'>Products</div>
            <div className='products_add_div'>
                <Link to={'/create'} className='products_add button-4'>Add</Link>
                <table className='products_table'>
                    <thead className='products_table_head'>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Action</th>
                    </thead>
                    <tbody>
                        {
                            products.map(product=>{
                                return <tr className='products_table_row' key={product.id}>
                                    <td className='products_table_td'>{product.id}</td>
                                    <td className='products_table_td'>{product.name}</td>
                                    <td className='products_table_td'>{product.price}</td>
                                    <td className='products_table_td'>{product.quantity}</td>
                                    <td className='products_table_td'>
                                        <a href="#" className='products_delete_link' onClick={event=>handleDelete(event, product.id)}>Delete</a>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='products_order_div'>
                <Link to={'/order'} className='products_order button-4'>Order</Link>
            </div>
        </div>
    );
}