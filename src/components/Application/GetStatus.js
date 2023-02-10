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

const useStyles = makeStyles({
  table: {
    minWidth: 500,
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
    <div>
      <h2 style={{ marginLeft: -80 }}>Get Application Status</h2>
      <br />
      <TextField
        label="Identity Number"
        value={identityNumber}
        onChange={(e) => setIdentityNumber(e.target.value)}
        style={{ margin: "5px 0" }}
      />
      <TextField
        label="Doğum Tarihi"
        name="birthDate"
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        style={{ margin: "5px 0" }}
      />
      <Button
        style={{ paddingLeft: 30, paddingTop: 30 }}
        onClick={handleSubmit}
      >
        <b>SEARCH</b>
      </Button>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Application Id</TableCell>
              <TableCell align="center">Customer Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Surname</TableCell>
              <TableCell align="center">Credit Score</TableCell>
              <TableCell align="center">Credit Limit</TableCell>
              <TableCell align="center">Credit Result</TableCell>
              <TableCell align="center">Salary</TableCell>
              <TableCell align="center">Guarantee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicationList.map((application) => (
              <TableRow key={application.id}>
                <TableCell component="th" scope="row">
                  {application.id}
                </TableCell>
                <TableCell align="center">{application.customer.id}</TableCell>
                <TableCell align="center">
                  {application.customer.firstName}
                </TableCell>
                <TableCell align="center">
                  {application.customer.lastName}
                </TableCell>
                <TableCell align="center">{application.creditScore}</TableCell>
                <TableCell align="center">{application.creditLimit}</TableCell>
                <TableCell align="center">{application.creditResult}</TableCell>
                <TableCell align="center">{application.salary}</TableCell>
                <TableCell align="center">{application.guarantee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default GetStatus;
