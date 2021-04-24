import React from "react";
import OrderForm from "./OrderForm";
import { useForm } from "../../hooks/useForm";
import { Grid } from "@material-ui/core";
import SearchDessertItems from "./SearchDessertItems";
import OrderedDessertItems from "./OrderedDessertItems";

const generateOrderNumber = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const getFreshModelObject = () => ({
  orderMasterId: 0,
  orderNumber: generateOrderNumber(),
  customerId: 0,
  pMethod: "none",
  gTotal: 0,
  deletedOrderItemIds: "",
  orderDetails: [],
});
export default function Order() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getFreshModelObject);

  const addDessertItem = (dessertItem) => {
    let dItem = {
      orderMasterId: values.orderMasterId,
      orderDetailId: 0,
      dessertItemId: dessertItem.dessertItemId,
      quantity: 1,
      dessertItemPrice: dessertItem.price,
      dessertItemName: dessertItem.dessertName,
    };
    setValues({
      ...values,
      orderDetails: [...values.orderDetails, dItem],
    });
  };
  const removeDessertItem = (index, id) => {
    let dItem = { ...values };
    dItem.orderDetails = dItem.orderDetails.filter((_, i) => i !== index);
    setValues({ ...dItem });
};
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <OrderForm
          {...{ values, errors, handleInputChange, resetFormControls }}
        />
      </Grid>
      <Grid item xs={6}>
        <SearchDessertItems {...{ addDessertItem,  orderedDessertItems: values.orderDetails, removeDessertItem  }} />
      </Grid>
      <Grid item xs={6}>
        <OrderedDessertItems
          {...{ orderedDessertItems: values.orderDetails, removeDessertItem }}
        />
      </Grid>
    </Grid>
  );
}
