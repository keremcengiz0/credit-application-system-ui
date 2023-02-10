import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";

function GetStatus() {
  const [identityNumber, setIdentityNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [applicationList, setApplicationList] = useState([]);

  const handleSubmit = async () => {
    const response = await axios.get(
      `/api/v1/applications/get-status?identityNumber=${identityNumber}&birthDate=${birthDate}`
    );
    setApplicationList(response.data);
  };

  return (
    <div>
      <TextField
        label="Identity Number"
        value={identityNumber}
        onChange={(e) => setIdentityNumber(e.target.value)}
      />
      <TextField
        label="Doğum Tarihi"
        name="birthDate"
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />

      <Button onClick={handleSubmit}>Sorgula</Button>
      {applicationList.map((application) => (
        <div key={application.id}>
          <p>ID: {application.id}</p>
          <p>Credit Score: {application.creditScore}</p>
          <p>Credit Limit: {application.creditLimit}</p>
          <p>Credit Result: {application.creditResult}</p>
          <p>Salary: {application.salary}</p>
          <p>Guarantee: {application.guarantee}</p>
          <p>Customer ID: {application.customer.id}</p>
        </div>
      ))}
    </div>
  );
}

export default GetStatus;
