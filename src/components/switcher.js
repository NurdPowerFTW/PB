import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = createStyles({
  formControlLabel: {
    fontSize: "12",
    "& label": { fontSize: "12" },
    color: "grey",
  },
});

function Switcher(props) {
  const { onPublish, published } = props;
  const [state, setState] = React.useState({
    status: published,
  });

  const handleToggle = (event) => {
    setState({ ...state, status: event.target.checked });
    onPublish(!state.status);
  };

  useEffect(() => {
    setState((state) => ({
      ...state,
      status: props.published,
    }));
  }, [props.published]);

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        control={
          <Switch
            size="small"
            color="primary"
            checked={state.status}
            onChange={handleToggle}
          />
        }
        label={
          <Typography className={styles.formControlLabel}>Publish</Typography>
        }
        labelPlacement="top"
      />
    </FormControl>
  );
}

Switcher.propTypes = {};

export default Switcher;
