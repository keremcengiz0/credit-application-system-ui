import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  tableTitle: {
    fontWeight: "bold",
  },
});

function GetCustomer() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);
  const classes = useStyles();

  const deleteCustomer = (customerId) => {
    axios
      .delete(`/api/v1/customers/${customerId}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`/api/v1/customers`)
      .then(
        (response) => {
          setIsLoaded(true);
          setCustomers(response.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container maxWidth="lg">
        <br />
        <h2 style={{ textAlign: "center" }}>Customers</h2>
        <br />

        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.tableTitle}>
                  Customer Id
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Identity Number
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Name
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Surname
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Phone Number
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Birth Date (yyyy-mm-dd)
                </TableCell>
                <TableCell align="center" className={classes.tableTitle} />
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell component="th" scope="row">
                    {customer.id}
                  </TableCell>
                  <TableCell align="center">
                    {customer.identityNumber}
                  </TableCell>
                  <TableCell align="center">{customer.firstName}</TableCell>
                  <TableCell align="center">{customer.lastName}</TableCell>
                  <TableCell align="center">
                    (+90){customer.phoneNumber}
                  </TableCell>
                  <TableCell align="center">{customer.birthDate}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        deleteCustomer(customer.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        window.location = `/api/v1/customers/update/${customer.id}`;
                      }}
                    >
                      <SystemUpdateAltIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default GetCustomer;
