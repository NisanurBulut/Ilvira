import { Grid } from '@material-ui/core';
import React from 'react';
import Form from '../../layouts/Form';

export default function OrderForm() {
  return (
    <Form>
      <Grid container>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
      </Grid>
    </Form>
  );
}
