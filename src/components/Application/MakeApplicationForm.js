import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  textfield: { marginTop: 20 },
}));

function MakeApplicationForm() {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const refreshPage = () => window.location.reload(true);
  let navigate = useNavigate();

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
  const steps = ["Müşteri Oluştur", "Başvuru Yap"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
        handleNext();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleApplicationSubmit = async () => {
    const applicationData = { ...stateApplication };
    try {
      const response = await Axios.post(
        `/api/v1/applications/${applicationData.identityNumber}`,
        applicationData
      ).then((response) => {
        refreshPage();
      });
      if (response.status === 200) {
        console.log("Başvuru oluşturuldu!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && (
          <div>
            <Typography variant="h6">Müşteri Oluştur</Typography>
            <TextField
              label="Kimlik Numarası"
              name="identityNumber"
              value={stateCustomer.identityNumber}
              onChange={handleChange}
              className={classes.textfield}
            />
            <TextField
              label="İsim"
              name="firstName"
              value={stateCustomer.firstName}
              onChange={handleChange}
              className={classes.textfield}
            />
            <TextField
              label="Soyisim"
              name="lastName"
              value={stateCustomer.lastName}
              onChange={handleChange}
              className={classes.textfield}
            />
            <TextField
              label="Telefon Numarası"
              name="phoneNumber"
              value={stateCustomer.phoneNumber}
              onChange={handleChange}
              className={classes.textfield}
            />
            <TextField
              label="Doğum Tarihi"
              name="birthDate"
              type="date"
              value={stateCustomer.birthDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              className={classes.textfield}
            />
            <Button
              style={{ marginLeft: -150, paddingTop: 100 }}
              onClick={handleSubmit}
            >
              Müşteri Oluştur
            </Button>
          </div>
        )}
        {activeStep === 1 && (
          <div>
            <Typography variant="h6">Başvuru Yap</Typography>
            <TextField
              label="Kimlik Numarası"
              name="identityNumber"
              value={stateApplication.identityNumber}
              disabled
            />
            <TextField
              label="Maaş"
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
              label="Teminat"
              name="guarantee"
              value={stateApplication.guarantee}
              onChange={(event) =>
                setStateApplication({
                  ...stateApplication,
                  guarantee: event.target.value,
                })
              }
            />
            <Button onClick={handleBack}>Geri</Button>
            <Button onClick={handleApplicationSubmit}>Başvuru Yap</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MakeApplicationForm;