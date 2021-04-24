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

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  listRoot: {
    marginTop: theme.spacing(1),
    maxHeight: 450,
    overflow: "auto",
    "& li:hover": {
      cursor: "pointer",
      backgroundColor: "#E3E3E3",
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
  const { removeDessertItem, values, setValues } = props;
  const classes = useStyles();
  let orderedDessertItems = values.orderDetails;
  const updateQuantity = (index, value) => {
    let dItem = { ...values };
    dItem.orderDetails[index].quantity += value;
    setValues({ ...dItem });
  };

  return (
    <List className={classes.listRoot}>
      {orderedDessertItems.map((item, index) => (
        <Paper key={index}>
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
                  <ButtonGroup size="small">
                    <Button onClick={(e) => updateQuantity(index, -1)}>
                      -
                    </Button>
                    <Button disabled>{item.quantity}</Button>
                    <Button onClick={(e) => updateQuantity(index, +1)}>
                      +
                    </Button>
                  </ButtonGroup>
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                disableRipple
                onClick={(e) => removeDessertItem(index, item.orderDetailsId)}
              >
                <DeleteTwoToneIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}
