import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
  button: {
    marginLeft: "auto",
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#4691fb" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Credit Application System
          </Typography>
          <Button color="inherit" className={classes.button}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
