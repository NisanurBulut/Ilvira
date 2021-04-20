import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import Form from '../../layouts/Form';
import { Input, Select, Button } from '../../controls';

const pMethods = [
  { id: 'none', title: 'Select' },
  { id: 'cash', title: 'Select' },
  { id: 'card', title: 'Select' },
];
const generateOrderNumber = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const getFreshModelObject = () => ({
  orderMasterId: 0,
  orderNumber: generateOrderNumber(),
  customerId: 0,
  pMethod: 'none',
  gTotal: 0,
  deletedOrderItemIds: '',
  orderDetails: [],
});
export default function OrderForm() {
  const [values, setValues] = useState(getFreshModelObject());
  return (
    <>
    <Form>
        <Grid container>
            <Grid item xs={6}>
                <Input
                    disabled
                    label="Order Number"
                    name="orderNumber"
                    value={values.orderNumber}

                />
                <Select
                    label="Customer"
                    name="customerId"
                    value={values.customerId}
                    options={[
                      { id: 1, title: 'Customer 1' },
                      { id: 2, title: 'Customer 2' },
                      { id: 3, title: 'Customer 3' },
                    ]}
                />
            </Grid>
            <Grid item xs={6}>
                <Select
                    label="Payment Method"
                    name="pMethod"
                    value={values.pMethod}
                    options={pMethods}
                />
                <Input
                    disabled
                    label="Grand Total"
                    name="gTotal"
                    value={values.gTotal}
                />

                <Button
                    size="large"
                >Orders</Button>
            </Grid>
        </Grid>
    </Form>
</>
  );
}
