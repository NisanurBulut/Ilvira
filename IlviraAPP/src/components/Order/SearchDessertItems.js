import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import SearchTwoTone from "@material-ui/icons/SearchTwoTone";
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
}));

export default function SearchDessertItems() {
  const [dessertItems, setDessertItems] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.DESSERTITEM)
      .fetchAll()
      .then((res) => {
        setDessertItems(res.data);
        console.log(dessertItems);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Paper className={classes.searchPaper}>
        <InputBase placeholder="Search desserts" className={classes.searchInput} />
        <IconButton>
          <SearchTwoTone />
        </IconButton>
      </Paper>
      <List>
        {dessertItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={item.dessertName}
              secondary={item.price + "₺"}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
