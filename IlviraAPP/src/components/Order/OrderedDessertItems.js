import React from "react";
import { Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, makeStyles } from "@material-ui/core";
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

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
  const { orderedDessertItems } = props;
  const classes = useStyles();

  return (
    <List className={classes.listRoot}>
      { orderedDessertItems.map((item, index) => (
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
            />
            <ListItemSecondaryAction>
              <IconButton>
                <DeleteTwoToneIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}
