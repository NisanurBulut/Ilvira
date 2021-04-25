import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { roundTo2DecimalPoint } from "../../utils";
const useStyles = makeStyles((theme) => ({
  PaperRoot: {
    margin: "15px 0px",
    "&:hover": {
      cursor: "pointer",
    },
    "&:hover $deleteButton": {
      display: "block",
    },
  },
  buttonGroup: {
    backgroundColor: "#f8d7ec",
    borderRadius: 8,
    "& .MuiButtonBase-root ": {
      border: "none",
      minWidth: "25px",
      padding: "1px",
    },
    "& button:nth-child(2)": {
      fontSize: "1.2em",
      color: "#000",
    },
  },
  deleteButton: {
    display: "none",
  },
  totalPerItem: {
    fontWeight: "bolder",
    fontSize: "1.2em",
    margin: "0px 20px",
  },
  listRoot: {
    marginTop: theme.spacing(1),
    maxHeight: 450,
    overflow: "auto",
    "& li:hover": {
      cursor: "pointer",
      backgroundColor: "#fbebf5",
    },
    "& li:hover .MuiButtonBase-root": {
      display: "block",
      color: "#D4389A",
    },
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "& .MuiButtonBase-root:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default function OrderedDessertItems(props) {
  const { values, setValues } = props;
  const classes = useStyles();

  let orderedDessertItems = values.orderDetails;

  const removeDessertItem = (index, id) => {
    let dItem = { ...values };
    dItem.orderDetails = dItem.orderDetails.filter((_, i) => i !== index);
    if (id !== 0)
      dItem.deleteOrderItemIds = dItem.deleteOrderItemIds + id + ",";
    setValues({ ...dItem });
  };

  const updateQuantity = (index, value) => {
    let dItemDetails = { ...values };
    let dItem = dItemDetails.orderDetails[index];
    if (dItem.quantity + value > 0) {
      dItem.quantity += value;
      setValues({ ...dItemDetails });
    }
  };

  return (
    <List className={classes.listRoot}>
      {orderedDessertItems.length === 0 ? (
        <ListItem>
          <ListItemText
            primary="Please select dessert items"
            primaryTypographyProps={{
              style: {
                textAlign: "center",
                fontStyle: "italic",
              },
            }}
          />
        </ListItem>
      ) : (
        orderedDessertItems.map((item, index) => (
          <Paper key={index} className={classes.PaperRoot}>
            <ListItem>
              <ListItemText
                primary={item.dessertItemName}
                primaryTypographyProps={{
                  component: "h1",
                  style: {
                    fontWeight: "500",
                    fontSize: "1.2em",
                  },
                }}
                secondary={
                  <>
                    <ButtonGroup size="small" className={classes.buttonGroup}>
                      <Button onClick={(e) => updateQuantity(index, -1)}>
                        -
                      </Button>
                      <Button disabled>{item.quantity}</Button>
                      <Button onClick={(e) => updateQuantity(index, +1)}>
                        +
                      </Button>
                    </ButtonGroup>

                    <span className={classes.totalPerItem}>
                      {roundTo2DecimalPoint(
                        item.quantity * item.dessertItemPrice
                      ) + " ₺"}
                    </span>
                  </>
                }
                secondaryTypographyProps={{
                  component: "div",
                }}
              />
              <ListItemSecondaryAction className={classes.deleteButton}>
                <IconButton
                  disableRipple
                  onClick={(e) => removeDessertItem(index, item.orderDetailsId)}
                >
                  <DeleteTwoToneIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))
      )}
    </List>
  );
}
