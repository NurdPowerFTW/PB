import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Select Github Projects",
    "Upload Local Projects",
    "Portfolio Preview Ready!",
  ];
}

export default function ProgressGuide(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    activeStep: 0,
  });
  const steps = getSteps();

  useEffect(() => {
    if (props.stage == "github") {
      setState((state) => ({
        ...state,
        activeStep: 0,
      }));
    } else if (props.stage == "local") {
      setState((state) => ({
        ...state,
        activeStep: 1,
      }));
    } else {
      setState((state) => ({
        ...state,
        activeStep: 2,
      }));
    }
  }, [props.stage]);

  return (
    <div className={classes.root}>
      <Stepper activeStep={state.activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {state.activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {/* {getStepContent(activeStep)} */}
            </Typography>
            <div>
              {/* <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
