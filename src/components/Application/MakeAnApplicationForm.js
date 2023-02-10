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

function CreateACustomerAndMakeAnApplicationForm() {
  const classes = useStyles();
  const refreshPage = () => window.location.reload(true);
  let navigate = useNavigate();

  const [stateApplication, setStateApplication] = useState({
    identityNumber: "",
    salary: "",
    guarantee: "",
  });

  const steps = ["Başvuru Yap"];

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
      <Stepper>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <Typography style={{ marginLeft: -60 }} variant="h6">
            Başvuru Yap
          </Typography>
          <TextField
            label="Kimlik Numarası"
            name="identityNumber"
            value={stateApplication.identityNumber}
            className={classes.textfield}
            onChange={(event) =>
              setStateApplication({
                ...stateApplication,
                identityNumber: event.target.value,
              })
            }
          />
          <TextField
            label="Maaş"
            name="salary"
            value={stateApplication.salary}
            className={classes.textfield}
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
            className={classes.textfield}
            onChange={(event) =>
              setStateApplication({
                ...stateApplication,
                guarantee: event.target.value,
              })
            }
          />
          <Button
            style={{ paddingLeft: 40, paddingTop: 40 }}
            onClick={handleApplicationSubmit}
          >
            Başvuru Yap
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateACustomerAndMakeAnApplicationForm;
