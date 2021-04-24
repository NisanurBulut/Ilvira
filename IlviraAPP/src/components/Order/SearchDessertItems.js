import { List, ListItem, ListItemText } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../../api";

export default function SearchDessertItems() {
  const [dessertItems, setDessertItems] = useState([]);

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
    <List>
      {dessertItems.map((item, index) =>(
          <ListItem key={index}>
          <ListItemText primary={item.dessertName} secondary={item.price+'₺'} />
        </ListItem>
      ))}
    </List>
  );
}
