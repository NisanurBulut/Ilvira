import React from "react";
import {
  ButtonGroup,
  Grid,
  InputAdornment,
  makeStyles,
  Button as MuiButton,
} from "@material-ui/core";
import Form from "../../layouts/Form";
import { Input, Select, Button } from "../../controls";
import ReplayIcon from "@material-ui/icons/Replay";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ReorderIcon from "@material-ui/icons/Reorder";

const pMethods = [
  { id: "none", title: "Select" },
  { id: "cash", title: "Select" },
  { id: "card", title: "Select" },
];

const useStyles = makeStyles((theme) => ({
  adornmentText: {
    "& .MuiTypography-root": {
      color: "#DD3AA0",
      fontWeight: "bolder",
      fontSize: "1.5rem",
    },
  },
  submitButtonGroup: {
    backgroundColor: "#DD3AA0",
    color: "#fff",
    margin: theme.spacing(1),
    "& .MuiButton-label": {
      textTransform: "none",
      color: "#fff",
    },
    "& .hover": {
      backgroundColor: "#c68fb1",
    },
  },
}));

export default function OrderForm(props) {
  const { values, errors, handleInputChange } = props;
  const classes = useStyles();

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
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className={classes.adornmentText}
                    position="start"
                  >
                    #
                  </InputAdornment>
                ),
              }}
            />
            <Select
              label="Customer"
              name="customerId"
              value={values.customerId}
              onChange={handleInputChange}
              options={[
                { id: 1, title: "Customer 1" },
                { id: 2, title: "Customer 2" },
                { id: 3, title: "Customer 3" },
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
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className={classes.adornmentText}
                    position="start"
                  >
                    ₺
                  </InputAdornment>
                ),
              }}
            />

            <ButtonGroup className={classes.submitButtonGroup}>
              <MuiButton
                size="large"
                type="submit"
                endIcon={<RestaurantMenuIcon />}
              >
                Submit
              </MuiButton>
              <MuiButton size="small" startIcon={<ReplayIcon />}></MuiButton>
              <MuiButton size="small" startIcon={<ReorderIcon />}>
                Orders
              </MuiButton>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Form>
    </>
  );
}
