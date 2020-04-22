import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Theme1 from "../theme1.png";
import Theme2 from "../theme2.png";
import Theme3 from "../theme3.png";
import Theme4 from "../theme4.png";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Switcher from "./switcher";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "wrap",
  },
  divider: {
    alignSelf: "stretch",
    height: "auto",
    margin: theme.spacing(1, 0.5),
  },
  formControl: {
    margin: theme.spacing(0.2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "none",
    padding: theme.spacing(0, 1),
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

function CustomizedDividers(props) {
  const {
    onAlignmentChange,
    onFocus,
    focused,
    alignment,
    onSave,
    onProject,
    onPreview,
    onFontFamilyChange,
    onPublish,
    published,
    defaultFontType,
    defaultThemeColor,
    onThemeChange,
  } = props;

  const [state, setState] = React.useState({
    family: "",
    themeColor: "",
  });

  const handleFontFamily = (event) => {
    setState({
      ...state,
      family: event.target.value,
    });
    onFontFamilyChange(event.target.value);
  };

  const handleThemeColor = (event) => {
    setState({
      ...state,
      themeColor: event.target.value,
    });
    onThemeChange(event.target.value);
  };

  const handleAlignment = (event, newAlignment) => {
    console.log("handleAlignment -> newAlignment", newAlignment);
    onAlignmentChange(newAlignment);
  };

  const handleSave = (event) => {
    onSave(event);
  };

  const handleProject = (event) => {
    onProject(event);
  };

  const handlePreview = (event) => {
    onPreview(event);
  };

  const handlePublish = (published) => {
    onPublish(published);
  };
  const classes = useStyles();

  var theme = (type) => {
    if (type == 1) return Theme1;
    if (type == 2) return Theme2;
    if (type == 3) return Theme3;
    if (type == 4) return Theme4;
  };

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            value="left"
            aria-label="left aligned"
            disabled={!focused}
          >
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton
            value="center"
            aria-label="centered"
            disabled={!focused}
          >
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton
            value="right"
            aria-label="right aligned"
            disabled={!focused}
          >
            <FormatAlignRightIcon />
          </ToggleButton>
          <ToggleButton
            value="justify"
            aria-label="justified"
            disabled={!focused}
          >
            <FormatAlignJustifyIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider orientation="vertical" className={classes.divider} />

        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="font-family-native-label-placeholder">
            Font Family
          </InputLabel>
          <Tooltip title="Change Font Type">
            <NativeSelect
              value={state.family}
              onChange={handleFontFamily}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{
                name: "Font Family",
                id: "font-family-native-label-placeholder",
              }}
            >
              <option value="" disabled>
                {defaultFontType}
              </option>
              <option value={10}>Arial</option>
              <option value={20}>Comic Sans </option>
              <option value={30}>Courier</option>
              <option value={40}>Fira Code</option>
              <option value={50}>Roboto</option>
              <option value={60}>Times New Roman</option>
            </NativeSelect>
          </Tooltip>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="theme-color-native-label-placeholder">
            Theme Color
          </InputLabel>
          <Select
            value={state.themeColor}
            onChange={handleThemeColor}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{
              name: "Theme Selection",
              id: "theme-color-native-label-placeholder",
            }}
          >
            <MenuItem value="" disabled>
              <img
                src={theme(defaultThemeColor)}
                alt="title"
                height="15"
                width="100"
              />
            </MenuItem>
            <MenuItem value={10}>
              <img src={Theme1} alt="title" height="15" width="100" />
            </MenuItem>
            <MenuItem value={20}>
              <img src={Theme2} alt="title" height="15" width="100" />
            </MenuItem>
            <MenuItem value={30}>
              <img src={Theme3} alt="title" height="15" width="100" />
            </MenuItem>
            <MenuItem value={40}>
              <img src={Theme4} alt="title" height="15" width="100" />
            </MenuItem>
          </Select>
        </FormControl>
        <Tooltip title="Save Progress">
          <IconButton aria-label="Save your progress" onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add Project">
          <IconButton aria-label="Add new project" onClick={handleProject}>
            <AddBoxIcon />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" className={classes.divider} />
        <Switcher published={published} onPublish={handlePublish} />
        <Tooltip title="Preview Portfolio">
          <IconButton
            aria-label="Preview portfolio"
            onClick={handlePreview}
            disabled={published == false}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    </div>
  );
}

CustomizedDividers.propTypes = {
  onAlignmentChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onFontFamilyChange: PropTypes.func.isRequired,
};
export default CustomizedDividers;
