import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Stepper, Step, StepLabel } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  textfield: { marginTop: 20 },
}));

const UpdateCustomer = () => {
  let navigate = useNavigate();
  const classes = useStyles();

  const [customer, setCustomer] = useState({
    identityNumber: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const getCustomer = async () => {
      const response = await axios.get(`/api/v1/customers/get/${id}`);
      setCustomer(response.data);
    };
    getCustomer();
  }, [id]);

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    await axios.put(`/api/v1/customers/${id}`, customer);
    navigate("/api/v1/customers");
  };

  return (
    <div>
      <Stepper activeStep={0}>
        <Step>
          <StepLabel>Update a Customer</StepLabel>
        </Step>
      </Stepper>

      <Typography variant="h5">
        <b>Update a Customer</b>
      </Typography>
      <TextField
        disabled
        id="identityNumber"
        label="Identity Number"
        type="number"
        value={customer.identityNumber}
        onChange={handleChange}
        className={classes.textfield}
      />
      <TextField
        label="First Name"
        name="firstName"
        value={customer.firstName}
        onChange={handleChange}
        className={classes.textfield}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={customer.lastName}
        onChange={handleChange}
        className={classes.textfield}
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={customer.phoneNumber}
        onChange={handleChange}
        className={classes.textfield}
      />
      <TextField
        label="Birth Date"
        name="birthDate"
        type="date"
        value={customer.birthDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        className={classes.textfield}
      />
      <Button
        style={{ marginLeft: -100, marginTop: 100 }}
        onClick={handleUpdate}
      >
        <b>Update</b>
      </Button>
    </div>
  );
};
export default UpdateCustomer;
