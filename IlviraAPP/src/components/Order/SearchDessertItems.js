import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import SearchTwoTone from "@material-ui/icons/SearchTwoTone";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    marginLeft: theme.spacing(1.5),
    flex: 1,
  },
  largeAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(8),
  },
  listItemText: {
    textAlign: "center",
    fontStyle: "italic",
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

export default function SearchDessertItems(props) {
  const { values, setValues } = props;
  const [dessertItems, setDessertItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const classes = useStyles();

  let orderedDessertItems = values.orderDetails;

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

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.DESSERTITEM)
      .fetchAll()
      .then((res) => {
        setDessertItems(res.data);
        setSearchList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let dList = [...dessertItems];
    dList = dList.filter((item) => {
      return (
        item.dessertName
          .toLocaleLowerCase()
          .includes(searchKey.toLocaleLowerCase()) &&
        orderedDessertItems.every((oiled) => oiled.dessertItemId !== item.dessertItemId
        )
      );
    });
    setSearchList(dList);
  }, [searchKey, orderedDessertItems]);

  return (
    <>
      <Paper className={classes.searchPaper}>
        <InputBase
          placeholder="Search desserts"
          className={classes.searchInput}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <IconButton>
          <SearchTwoTone />
        </IconButton>
      </Paper>
      <List className={classes.listRoot}>
        {searchList.map((item, index) => (
          <ListItem key={index} onClick={e => addDessertItem(item)}>
            <ListItemAvatar>
              <Avatar
                className={classes.largeAvatar}
                variant="square"
                alt={item.dessertName}
                src={item.imageUrl}
              />
            </ListItemAvatar>
            <ListItemText
              className={classes.listItemText}
              primary={item.dessertName}
              secondary={item.price + " ₺"}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={(e) => addDessertItem(item)}>
                <PlusOneIcon />
                <ArrowForwardIos />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
