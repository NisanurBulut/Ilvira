import React, {useEffect} from 'react'
import {createAPIEndpoint,ENDPOINTS} from "../../api";
export default function OrderHistory() {

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.ORDER).fetchAll()
        .then((res)=>{
            
        })
        .catch(err=>console.log(err));
    }, [])

    return (
        <div>
            History of Orders
        </div>
    )
}
