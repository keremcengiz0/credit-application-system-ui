import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Snackbar,
} from "@material-ui/core";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  textfield: { marginTop: 20 },
}));

function CreateACustomerAndMakeAnApplicationForm() {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  let navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [stateCustomer, setStateCustomer] = useState({
    identityNumber: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
  });
  const [stateApplication, setStateApplication] = useState({
    identityNumber: "",
    salary: "",
    guarantee: "",
  });
  const steps = ["Create a Customer", "Make an Application"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStateCustomer({ ...stateCustomer, [name]: value });
  };

  const handleSubmit = async () => {
    const customerData = { ...stateCustomer };
    try {
      const response = await Axios.post("/api/v1/customers", customerData);
      if (response.status === 200) {
        setStateApplication({
          ...stateApplication,
          identityNumber: customerData.identityNumber,
        });
        setAlertType("success");
        setAlertMessage("The customer has been successfully created");
        setAlertOpen(true);
        setTimeout(() => {
          handleNext();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setAlertType("error");
      setAlertMessage("Failed to create customer");
      setAlertOpen(true);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const handleApplicationSubmit = async () => {
    const applicationData = { ...stateApplication };
    try {
      const response = await Axios.post(
        `/api/v1/applications/${applicationData.identityNumber}`,
        applicationData
      );
      if (response.status === 200) {
        setAlertType("success");
        setAlertMessage("Application completed successfully");
        setAlertOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage("Application failed");
      setAlertOpen(true);
      console.error(error);
    }
  };

  return (
    <div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stepper
          activeStep={activeStep}
          style={{
            width: "80%",
            backgroundColor: "transparent",
            marginLeft: 100,
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <br />
      <br />

      <div>
        {activeStep === 0 && (
          <div>
            <Typography variant="h5">
              <b>Create a Customer</b>
            </Typography>
            <TextField
              label="Identity Number"
              name="identityNumber"
              value={stateCustomer.identityNumber}
              onChange={handleChange}
              className={classes.textfield}
            />
            <TextField
              label="Name"
              name="firstName"
              value={stateCustomer.firstName}
              onChange={handleChange}
              className={classes.textfield}
            />
            <TextField
              label="Surname"
              name="lastName"
              value={stateCustomer.lastName}
              onChange={handleChange}
              className={classes.textfield}
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={stateCustomer.phoneNumber}
              onChange={handleChange}
              className={classes.textfield}
            />
            <TextField
              label="Birthdate"
              name="birthDate"
              type="date"
              value={stateCustomer.birthDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              className={classes.textfield}
            />
            <Button
              style={{ marginLeft: -100, marginTop: 100 }}
              onClick={handleSubmit}
            >
              <b>CREATE</b>
            </Button>

            <Snackbar
              open={alertOpen}
              autoHideDuration={1500}
              onClose={handleCloseAlert}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleCloseAlert}
                severity={alertType}
              >
                {alertMessage}
              </MuiAlert>
            </Snackbar>
          </div>
        )}
        {activeStep === 1 && (
          <div>
            <Typography variant="h5">Make an Application</Typography>
            <br />
            <br />
            <TextField
              label="Identity Number"
              name="identityNumber"
              value={stateApplication.identityNumber}
              disabled
            />
            <TextField
              label="Salary"
              name="salary"
              value={stateApplication.salary}
              onChange={(event) =>
                setStateApplication({
                  ...stateApplication,
                  salary: event.target.value,
                })
              }
            />
            <TextField
              label="Guarantee"
              name="guarantee"
              value={stateApplication.guarantee}
              onChange={(event) =>
                setStateApplication({
                  ...stateApplication,
                  guarantee: event.target.value,
                })
              }
            />
            <Button
              onClick={handleApplicationSubmit}
              style={{ marginLeft: 25, marginTop: 20 }}
            >
              <b>APPLY</b>
            </Button>
            <Snackbar
              open={alertOpen}
              autoHideDuration={1500}
              onClose={handleCloseAlert}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleCloseAlert}
                severity={alertType}
              >
                {alertMessage}
              </MuiAlert>
            </Snackbar>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateACustomerAndMakeAnApplicationForm;
