import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from "react-router-dom";
import { LockOpen } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  link: {
    fontSize: "16px",
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
  makeApplication: {
    paddingLeft: 50,
  },
  getStatus: {
    paddingLeft: 60,
  },
  customer: {
    paddingLeft: 65,
  },
}));

function Navbar() {
  const classes = useStyles();
  let navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("userName");
    navigate("/auth/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#4691fb" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              display: { xs: "none", sm: "block" },
            }}
          >
            <Link className={classes.link} to={{ pathname: "/" }}>
              Credit Application System
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            className={classes.makeApplication}
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
            }}
          >
            <Link
              className={classes.link}
              to={{
                pathname:
                  "/api/v1/applications/create-customer-and-make-application",
              }}
            >
              Create a Customer And Make an Application
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            className={classes.getStatus}
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
            }}
          >
            <Link
              className={classes.link}
              to={{ pathname: "/api/v1/applications/make-application" }}
            >
              Make an Application
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            className={classes.customer}
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
            }}
          >
            <Link
              className={classes.link}
              to={{ pathname: "/api/v1/customers" }}
            >
              Get Status
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            className={classes.customer}
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
            }}
          >
            <Link
              className={classes.link}
              to={{ pathname: "/api/v1/customers" }}
            >
              Get Customer
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <Typography variant="h10">
                {localStorage.getItem("currentUser") == null ? (
                  <Link className={classes.link} to="/auth/login">
                    LOGIN
                  </Link>
                ) : (
                  <div>
                    <IconButton variant="h6" onClick={onClick}>
                      <LockOpen> </LockOpen>
                    </IconButton>
                  </div>
                )}
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
