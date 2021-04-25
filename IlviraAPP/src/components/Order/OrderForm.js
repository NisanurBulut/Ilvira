import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  Grid,
  InputAdornment,
  makeStyles,
  Button as MuiButton,
} from "@material-ui/core";
import Form from "../../layouts/Form";
import Popup from "../../layouts/Popup";
import ReplayIcon from "@material-ui/icons/Replay";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import { Input, Select } from "../../controls";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { roundTo2DecimalPoint } from "../../utils";
import OrderHistory from "./OrderHistory";
const pMethods = [
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
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
    "& .MuiButtonBase-root ": {
      border: "none",
    },
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
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;
  const classes = useStyles();
  const [customerList, setCustomerList] = useState([]);
  const [orderHistoryVisibility, setOrderHistoryVisibility] = useState(false);
  const [orderId, setOrderId] = useState(0);
  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.CUSTOMER)
      .fetchAll()
      .then((res) => {
        let customerData = res.data.map((item) => ({
          id: item.customerId,
          title: item.customerName,
        }));
        setCustomerList(customerData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.dessertItemPrice;
    }, 0);
    setValues({ ...values, gTotal: roundTo2DecimalPoint(gTotal) });
  }, [JSON.stringify(values.orderDetails)]);

  useEffect(() => {
    if (orderId === 0) resetFormControls();
    else {
      createAPIEndpoint(ENDPOINTS.ORDER)
        .fetchById(orderId)
        .then((res) => {
          setValues(res.data);
          setErrors({});
        })
        .catch((err) => console.log(err));
    }
  }, [orderId]);

  const validateForm = () => {
    let temp = {};
    temp.customerId = values.customerId !== 0 ? "" : "This field is required";
    temp.pMethod = values.pMethod !== "none" ? "" : "This field is required.";
    temp.orderDetails =
      values.orderDetails.length !== 0 ? "" : "This field is required";
    setErrors({ ...temp });
    return Object.values(temp).every((a) => a === "");
  };

  const createOrder = () => {
    createAPIEndpoint(ENDPOINTS.ORDER)
      .create(values)
      .then((res) => {
        resetFormControls();
      })
      .catch((err) => console.log(err));
  };
  const updateOrder = (id) => {
    createAPIEndpoint(ENDPOINTS.ORDER)
      .update(id, values)
      .then((res) => {
        setOrderId(0);
      })
      .catch((err) => console.log(err));
  };
  const submitOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (values.orderMasterId === 0) {
        createOrder();
      } else {
        updateOrder(values.orderMasterId);
      }
    }
  };
  const resetForm = ()=>{
    resetFormControls();
    setOrderId(0);
  }
  const openHistoryOfOrders = (e) => {
    setOrderHistoryVisibility(true);
  };

  return (
    <>
      <Form onSubmit={submitOrder}>
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
              options={customerList}
              error={errors.customerId}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              label="Payment Method"
              name="pMethod"
              value={values.pMethod}
              options={pMethods}
              onChange={handleInputChange}
              error={errors.pMethod}
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
              <MuiButton onClick={resetForm} size="small" startIcon={<ReplayIcon />}></MuiButton>
              <MuiButton
                size="small"
                onClick={openHistoryOfOrders}
                endIcon={<VisibilityTwoToneIcon />}
              >
                Orders
              </MuiButton>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Form>
      <Popup
        title={<><RestaurantMenuIcon />   History of Orders</> }
        openPopup={orderHistoryVisibility}
        setOpenPopup={setOrderHistoryVisibility}
      >
        <OrderHistory {...{ setOrderId, setOrderHistoryVisibility }} />
      </Popup>
    </>
  );
}
