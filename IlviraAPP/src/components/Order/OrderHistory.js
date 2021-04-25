import { TableCell, TableRow, TableHead, TableBody } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import Table from "../../layouts/Table";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

export default function OrderHistory(props) {
  const {
    setOrderId,
    setOrderHistoryVisibility,
    resetFormControls,
    setNotify,
  } = props;
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.ORDER)
      .fetchAll()
      .then((res) => {
        setOrderHistory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showForUpdate = (id) => {
    setOrderId(id);
    setOrderHistoryVisibility(false);
  };
  const deleteOrder = (id) => {
    if (window.confirm("are you sure to delete this order record?")) {
      createAPIEndpoint(ENDPOINTS.ORDER)
        .delete(id)
        .then((res) => {
          showForUpdate(0);
          resetFormControls();
          setNotify({
            isOpen: true,
            message: "Order record is deleted successfullt",
          });
        })
        .catch((err) => console.log(err));
    }
  };
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
        {orderHistory.map((item) => (
          <TableRow key={item.orderMasterId}>
            <TableCell>{item.orderNumber}</TableCell>
            <TableCell>{item.customer.customerName}</TableCell>
            <TableCell>{item.pMethod}</TableCell>
            <TableCell>{item.gTotal + " ₺"}</TableCell>
            <TableCell>
              <DeleteTwoToneIcon
                color="secondary"
                onClick={(e) => deleteOrder(item.orderMasterId)}
              />
              <EditTwoToneIcon
                color="primary"
                onClick={(e) => showForUpdate(item.orderMasterId)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
