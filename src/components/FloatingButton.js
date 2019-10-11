import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    position: "fixed",
    right: 20,
    bottom: 20
  }
}));

export default function FloatingButton({ addClicked }) {
  const classes = useStyles();
  return (
    <div>
      <Fab
        color="primary"
        variant="extended"
        aria-label="delete"
        className={classes.fab}
        onClick={addClicked}
      >
        <AddIcon />
        Add Image
      </Fab>
    </div>
  );
}
