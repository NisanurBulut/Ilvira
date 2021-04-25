import { TableCell, TableRow, TableHead, TableBody } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import {createAPIEndpoint,ENDPOINTS} from "../../api";
import Table from '../../layouts/Table';
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

export default function OrderHistory() {

    const [orderHistory, setOrderHistory]= useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.ORDER).fetchAll()
        .then((res)=>{
            setOrderHistory(res.data);
        })
        .catch(err=>console.log(err));
    }, [])

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Order No</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Payed With</TableCell>
                    <TableCell>Grand Total</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    orderHistory.map((item)=>(
                        <TableRow key={item.orderMasterId}>
                            
                                <TableCell>{item.orderNumber}</TableCell>
                                <TableCell>{item.customer.customerName}</TableCell>
                                <TableCell>{item.pMethod}</TableCell>
                                <TableCell>{item.gTotal +" ₺"}</TableCell>
                                <TableCell><DeleteTwoToneIcon color="secondary" /></TableCell>
                            
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
