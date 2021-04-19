import { Grid } from '@material-ui/core';
import React from 'react';
import Form from '../../layouts/Form';
import Input from '../../controls/Input';
import Select from '../../controls/Select';

const pMethods = [
  { id: 'none', title: 'Select' },
  { id: 'cash', title: 'Select' },
  { id: 'card', title: 'Select' },
];
export default function OrderForm() {
  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Input disabled label="Order Number" name="orderNumber" />
          <Select
            label="Customer"
            name="customerId"
            options={[
              { id: 1, title: 'Customer 1' },
              { id: 2, title: 'Customer 2' },
              { id: 3, title: 'Customer 3' },
            ]}
          ></Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Payment Method"
            name="pMethod"
            options={pMethods}
          ></Select>
          <Input disabled label="Grand Total" name="gTotal" />
        </Grid>
      </Grid>
    </Form>
  );
}
