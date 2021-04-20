import React from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import Form from '../../layouts/Form';
import { Input, Select, Button } from '../../controls';


const pMethods = [
  { id: 'none', title: 'Select' },
  { id: 'cash', title: 'Select' },
  { id: 'card', title: 'Select' },
];

export default function OrderForm(props) {
  const {values, errors, handleInputChange} = props;
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
              InputProps={{ startAdornment:<InputAdornment position="start">#</InputAdornment> }}
            />
            <Select
              label="Customer"
              name="customerId"
              value={values.customerId}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
            <Input
              disabled
              label="Grand Total"
              name="gTotal"
              value={values.gTotal}
              InputProps={{ startAdornment:<InputAdornment position="start">₺</InputAdornment> }}
            />

            <Button size="large">Orders</Button>
          </Grid>
        </Grid>
      </Form>
    </>
  );
}
