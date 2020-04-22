import React, { useRef } from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles, responsiveFontSizes } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import LocalProject from "../models/localProject";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import RadioGroup from "@material-ui/core/RadioGroup";
import { green } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import ProgressGuide from "../components/stepper";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 170,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper2: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  myAppBar: {
    backgroundColor: "#3C3C55",
  },
  footer: {
    backgroundColor: "#3C3C55",
    color: "#ffffff",
    padding: theme.spacing(6),
  },
  heroContentMain: {
    margin: theme.spacing(3, 0, 10),
  },
  finishButton: {
    backgroundColor: "#3C3C55",
    color: "#ffffff",
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(-1, -2, 0),
    color: "#3C3C55",
  },
  upload: {
    margin: theme.spacing(1),
  },
});

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      uid: null,
      isSignedIn: false,
      repos: [],
      uploads: [],
      success: false,
      buttonValue: "1",
      uploadNum: 0,
      tempTitle: null,
      tempDescription: null,
      tempKeywords: null,
      tempContrib: null,
      tempLanguages: [],
      selectedOther: [],
      languagesDisplay: [],
      localProjects: [],
      loading: false,
      tempFile: null,
      saved: [],
      stageCompleted: false,
      //uploads: [0],
    };
    this.finishSignUp = this.finishSignUp.bind(this);
    this.addUpload = this.addUpload.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.titleInput = this.titleInput.bind(this);
    this.descriptionInput = this.descriptionInput.bind(this);
    this.keywordInput = this.keywordInput.bind(this);
    this.numContInput = this.numContInput.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleSelectLanguage = this.handleSelectLanguage.bind(this);
    this.otherLanguage = this.otherLanguage.bind(this);
  }

  finishSignUp() {
    if (this.state.localProjects.length > 0) {
      this.setState({
        success: false,
        loading: true,
      });
      this.handleUploads();
    } else {
      this.setState(
        {
          stageCompleted: true,
          loading: true,
        },
        () => {
          setTimeout(() => {
            this.setState({ success: true });
          }, 3000);
        }
      );
    }
  }

  async handleUploads() {
    let uploadUrl = process.env.REACT_APP_UPLOAD_LOCAL_ENDPOINT;
    let size = this.state.localProjects.length;

    console.log("handleUploads: ", this.props.location.user.userId);
    this.state.localProjects.map((project, i) => {
      console.log("Step 3. file:" + project.project_file);
      console.log("Step 4. contribs:" + project.project_contributors);
      let formData = new FormData();
      formData.set("id", this.props.location.user.userId);
      formData.set("repo_name", project.project_name);
      formData.set("repo_description", project.project_description);
      formData.set("repo_language", project.project_language);
      formData.set("localProj", project.project_file);
      formData.set("repo_topics[0]", project.project_keywords);
      formData.set("repo_numContri", project.project_contributors);

      axios({
        method: "post",
        url: uploadUrl,
        data: formData,
        headers: {
          "content-type": `multipart/form-data; boundary=${formData._boundary}`,
        },
        // onUploadProgress: (progressEvent) => {
        //   const totalLength = progressEvent.lengthComputable
        //     ? progressEvent.total
        //     : progressEvent.target.getResponseHeader("content-length") ||
        //       progressEvent.target.getResponseHeader(
        //         "x-decompressed-content-length"
        //       );
        //   console.log("onUploadProgress", totalLength);
        //   if (totalLength !== null)
        //     console.log(Math.round((progressEvent.loaded * 100) / totalLength));
        // },
        // onDownloadProgress: (progressEvent) => {
        //   console.log(progressEvent);
        // },
      })
        .then((res) => {
          console.log("TCL: UploadPage -> handleUploads -> res", res);
          if (res.status === 200) {
            this.setState({
              success: true,
              loading: false,
            });
          }
        })
        .catch((err) => {
          console.log("We got an error:", err);
        });
    });
  }

  titleInput = (event) => {
    this.setState({
      tempTitle: event.target.value,
    });
  };

  handleChange = (event) => {
    let target = event.target; //an array

    if (target.checked) {
      this.setState({
        tempLanguages: [...this.state.tempLanguages, target.value],
      });
    } else {
      //TODO: implement a remove function for user repo removal
    }
  };

  handleSelectLanguage(index, event) {
    index = index + 1;
    this.setState({
      tempLanguages: event.target.value,
    });

    if (
      this.state.selectedOther != null &&
      this.state.selectedOther.length >= index
    ) {
      this.setState((state) => {
        const selectedOther = this.state.selectedOther.map((item, j) => {
          if (j + 1 === index) {
            if (event.target.value === "Other") return true;
          } else {
            return item;
          }
        });
        return {
          selectedOther,
        };
      });
    } else {
      if (event.target.value === "Other") {
        this.setState({
          selectedOther: this.state.selectedOther.concat(true),
        });
      } else {
        this.setState({
          selectedOther: this.state.selectedOther.concat(false),
        });
      }
    }
  }

  otherLanguage = (event) => {
    this.setState({
      tempLanguages: event.target.value,
    });
  };

  uploadFile = (event) => {
    this.setState({
      tempFile: event.target.files[0],
    });
  };

  descriptionInput = (event) => {
    this.setState({
      tempDescription: event.target.value,
    });
  };

  keywordInput = (event) => {
    this.setState({
      tempKeywords: event.target.value,
    });
  };

  numContInput = (event) => {
    this.setState({
      tempContrib: event.target.value,
    });
  };

  handleAdd(event, i) {
    var langs = "";
    this.state.tempLanguages.map((item, key) => (langs = langs + item));
    console.log(langs);
    console.log(this.state.tempLanguages);
    this.setState({
      saved: this.state.saved.concat(this.state.uploadNum),
    });
    this.setState({
      localProjects: [
        ...this.state.localProjects,
        new LocalProject(
          this.state.tempTitle,
          this.state.tempDescription,
          this.state.tempLanguages,
          this.state.tempFile,
          this.state.tempKeywords,
          this.state.tempContrib
        ),
      ],
    });

    this.setState({ tempLanguages: [] });
  }

  addUpload = () => {
    this.setState({
      uploadNum: this.state.uploadNum + 1,
      uploads: this.state.uploads.concat(this.state.uploadNum),
      //selectedOther: this.state.uploads.concat(true)
    });
  };

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    const buttonClassname = clsx({
      [classes.buttonSuccess]: this.state.success,
    });
    if (this.state.success)
      return (
        <Redirect
          to={{
            pathname: "/editor/" + this.props.location.user.userName, //switch to appending username
            username: this.props.location.user.userName,
          }}
        />
      );
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar className={classes.myAppBar} position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Portfolio Builder
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.heroContentMain}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <ProgressGuide
                  stage={
                    this.state.stageCompleted == true ? "complete" : "local"
                  }
                />
                <Typography variant="h4">Upload Local Projects</Typography>
                <br />
                <Typography variant="body1" align="justify">
                  If you have any projects on your device that you'd like to
                  include in your portfolio, upload them as a zip file here!
                </Typography>
                <Grid>
                  <div className={classes.paper2}>
                    {this.state.uploads.map((uploads, i) => (
                      <Paper className={classes.form} noValidate>
                        <div className={classes.upload}>
                          <input
                            type="file"
                            accept=".zip"
                            className={classes.input}
                            onChange={(e) => this.uploadFile(e)} //TODO
                          />
                          <form noValidate autoComplete="off">
                            <TextField
                              label="*Project Title"
                              id="title"
                              fullWidth
                              onChange={this.titleInput}
                            />
                            <TextField
                              label="*Project Description"
                              id="description"
                              fullWidth
                              onChange={this.descriptionInput}
                            />
                            <TextField
                              label="*Project Keywords"
                              id="keywords"
                              fullWidth
                              onChange={this.keywordInput}
                            />
                            <TextField
                              label="*Number of Contributors"
                              fullWidth
                              id="numContrib"
                              onChange={this.numContInput}
                            />
                            <RadioGroup value={this.state.buttonValue}>
                              <FormControlLabel
                                label={"Java"}
                                value={"Java"}
                                control={
                                  <Checkbox onChange={this.handleChange} />
                                }
                              />
                              <FormControlLabel
                                label={"Python"}
                                value={"Python"}
                                control={
                                  <Checkbox onChange={this.handleChange} />
                                }
                              />
                              <FormControlLabel
                                label={"Swift"}
                                value={"Swift"}
                                control={
                                  <Checkbox onChange={this.handleChange} />
                                }
                              />
                              <FormControlLabel
                                label={"C"}
                                value={"C"}
                                control={
                                  <Checkbox onChange={this.handleChange} />
                                }
                              />
                              <FormControlLabel
                                label={"C++"}
                                value={"C++"}
                                control={
                                  <Checkbox onChange={this.handleChange} />
                                }
                              />
                              <FormControlLabel
                                label={"Javascript"}
                                value={"Javascript"}
                                control={
                                  <Checkbox onChange={this.handleChange} />
                                }
                              />
                              <FormControlLabel
                                label={"Other"}
                                value={"Other"}
                                control={
                                  <Checkbox onChange={this.handleChange} />
                                }
                              />
                            </RadioGroup>
                            {this.state.selectedOther[i] ? (
                              <form noValidate autoComplete="off">
                                <TextField
                                  label="*Language"
                                  id="other"
                                  onChange={this.otherLanguage}
                                />
                                <br />
                                <text style={{ fontSize: "10px" }}>
                                  Projects written in this language are unable
                                  to be graded at this time. You will not have a
                                  score displayed for this project on your
                                  portfolio.
                                </text>
                              </form>
                            ) : (
                              ""
                            )}
                          </form>
                        </div>
                        {!this.state.saved[i] ? (
                          <Button
                            onClick={(e) => this.handleAdd(e, i)}
                            style={{ bottom: -20, right: -225 }}
                          >
                            <SaveIcon style={{ bottom: -20, right: -225 }} />
                            Save Project
                          </Button>
                        ) : (
                          <Button disabled style={{ bottom: -20, right: -280 }}>
                            <DoneOutlineIcon
                              style={{
                                bottom: -20,
                                right: -280,
                              }}
                            />
                            Saved
                          </Button>
                        )}
                      </Paper>
                    ))}
                  </div>
                </Grid>
                <br />
                <Button
                  onClick={this.addUpload}
                  size="small"
                  className={classes.button}
                >
                  <AddIcon />
                  Add A Project
                </Button>
                <br />
              </div>
              <br />
              <Divider />
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={buttonClassname}
                  disabled={this.state.loading}
                  onClick={this.finishSignUp}
                >
                  Finish Portfolio!
                </Button>
                {this.state.loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Container>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Portfolio Builder 2020
          </Typography>
          <Typography variant="subtitle1" align="center" component="p">
            Created by Codify <br /> @ University of Utah
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

UploadPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(UploadPage);
