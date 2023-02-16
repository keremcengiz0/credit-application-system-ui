import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@mui/material/Container";

import Grid from "@mui/material/Unstable_Grid2";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  tableTitle: {
    fontWeight: "bold",
  },
});

function GetStatus() {
  const [identityNumber, setIdentityNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [applicationList, setApplicationList] = useState([]);
  const classes = useStyles();

  const handleSubmit = async () => {
    const response = await axios.get(
      `/api/v1/applications/get-status?identityNumber=${identityNumber}&birthDate=${birthDate}`
    );
    setApplicationList(response.data);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container maxWidth="lg">
        <br />
        <br />
        <h2 style={{ textAlign: "center" }}>Get Application Status</h2>
        <br />
        <Grid container spacing={1} justifyContent="left">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Identity Number"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              style={{ margin: "10px 0" }}
            />
            <TextField
              label="Birthdate"
              name="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              style={{ margin: "10px 0" }}
            />
            <Button
              onClick={handleSubmit}
              style={{ marginLeft: 30, marginTop: 30 }}
            >
              <b>SEARCH</b>
            </Button>
          </Grid>
        </Grid>
        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className={classes.tableTitle}>
                  Application Id
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Customer Id
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Name
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Surname
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Credit Score
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Credit Limit
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Credit Result
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Salary
                </TableCell>
                <TableCell align="center" className={classes.tableTitle}>
                  Guarantee
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicationList.map((application) => (
                <TableRow key={application.id}>
                  <TableCell component="th" scope="row">
                    {application.id}
                  </TableCell>
                  <TableCell align="center">
                    {application.customer.id}
                  </TableCell>
                  <TableCell align="center">
                    {application.customer.firstName}
                  </TableCell>
                  <TableCell align="center">
                    {application.customer.lastName}
                  </TableCell>
                  <TableCell align="center">
                    {application.creditScore}
                  </TableCell>
                  <TableCell align="center">
                    {application.creditLimit}
                  </TableCell>
                  <TableCell align="center">
                    {application.creditResult}
                  </TableCell>
                  <TableCell align="center">{application.salary}</TableCell>
                  <TableCell align="center">{application.guarantee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default GetStatus;
