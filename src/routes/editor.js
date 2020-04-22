import React from "react";
import Button from "@material-ui/core/Button";
import {
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import ScoreCard from "../components/scoreCard";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import LinkMaterialUI from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import Avatar from "@material-ui/core/Avatar";
import EditWidget from "../components/editingWidget";
import SpeedDial from "../components/speedDial";
import TextField from "@material-ui/core/TextField";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import DescriptionIcon from "@material-ui/icons/Description";
import GitHubIcon from "@material-ui/icons/GitHub";
import Grow from "@material-ui/core/Grow";
import { green } from "@material-ui/core/colors";
import { Redirect } from "react-router";
import InputBase from "@material-ui/core/InputBase";
import Alert from "../components/alert";
import { red } from "@material-ui/core/colors";
import SlideDialog from "../components/slideDialog";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    paddingTop: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },

  multilineColor: {
    color: "red",
  },

  margin: {
    margin: theme.spacing(1),
  },
  heroContent: {
    //padding: theme.spacing(3, 0, 3)
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFF2F2",
  },
  linkOptions: {
    padding: theme.spacing(1),
    color: green,
  },
  cardMedia: {
    paddingTop: "50%",
  },
  cardContent: {
    flexGrow: 1,
    paddingTop: "0%",
  },
  footer: {
    padding: theme.spacing(6),
  },
  myPaper: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    height: "110px",
  },

  signOutButton: {
    backgroundColor: "#ffffff",
    top: 10,
    right: 10,
    position: "fixed",
  },
  saveButton: {
    marginRight: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
  buttonContent: {
    backgroundColor: "#f3f6f9",
    padding: theme.spacing(3),
  },
  toolbar: {
    paddingRight: 24,
  },
  table: {
    minWidth: 450,
  },
  textFieldOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important",
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  avatar: {
    backgroundColor: red[500],
  },
});

var font = "Arial";
var theme = createMuiTheme({
  typography: {
    fontFamily: font,
    fontSize: 12,
  },
  // overrides: {
  //   MuiCssBaseline: {
  //     "@global": {
  //       "@font-face": [sfmono_font]
  //     }
  //   }
  // },
  palette: {
    primary: green,
  },
});

var buffer = [];
var userBioRegex = /editable-bio/;
var projectTitleRegex = /editable-repo-title-[0-9]/;
var projectDescRegex = /editable-repo-description-[0-9]/;
var projectImgRegex = /editable-repo-img-[0-9]/;
var themeChoice = [
  { appBarColor: "#487091", middleColor: "#f3f6f9", bottomColor: "#e2e9f1" },
  { appBarColor: "#e6a4b4", middleColor: "#f5eee6", bottomColor: "#f3d7ca" },
  { appBarColor: "#52616b", middleColor: "#f0f5f9", bottomColor: "#c9d6df" },
  { appBarColor: "#357376", middleColor: "#e5dfdf", bottomColor: "#6ba8a9" },
];

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      dialogs: [],
      popUpOpen: false,
      file: null,
      user: null,
      focusField: null,
      editTimer: null,
      doneTimer: null,
      editSaved: false,
      savedChanges: [],
      theme: theme,
      themeColor: themeChoice[0],
      user: null,
      preview: false,
      showPreview: false,
      newProject: false,
      ghRepos: null,
      published: false,
      deleted: null,
      showDeleteWarning: false,
      showAddWarning: false,
    };
    this.handleAnalysisDialogOpen = this.handleAnalysisDialogOpen.bind(this);
    this.updateAlignment = this.updateAlignment.bind(this);
  }

  handleFontFamilyChange = (event) => {
    // console.log("Editor -> event", event);
    if (event == 10) {
      this.setState((prevState) => ({
        ...prevState,
        theme: {
          ...prevState.theme,
          typography: {
            ...prevState.theme.typography,
            fontFamily: "Arial",
          },
        },
      }));
    } else if (event == 20) {
      this.setState((prevState) => ({
        ...prevState,
        theme: {
          ...prevState.theme,
          typography: {
            ...prevState.theme.typography,
            fontFamily: "Comic Sans",
          },
        },
      }));
    } else if (event == 30) {
      this.setState((prevState) => ({
        ...prevState,
        theme: {
          ...prevState.theme,
          typography: {
            ...prevState.theme.typography,
            fontFamily: "Courier",
          },
        },
      }));
    } else if (event == 40) {
      this.setState((prevState) => ({
        ...prevState,
        theme: {
          ...prevState.theme,
          typography: {
            ...prevState.theme.typography,
            fontFamily: "Fira Code",
          },
        },
      }));
    } else if (event == 50) {
      this.setState((prevState) => ({
        ...prevState,
        theme: {
          ...prevState.theme,
          typography: {
            ...prevState.theme.typography,
            fontFamily: "Roboto",
          },
        },
      }));
    } else if (event == 60) {
      this.setState((prevState) => ({
        ...prevState,
        theme: {
          ...prevState.theme,
          typography: {
            ...prevState.theme.typography,
            fontFamily: "Times New Roman",
          },
        },
      }));
    }
  };

  handleThemeChange = (event) => {
    console.log("Editor -> event", event);
    if (event == 10) {
      this.setState((prevState) => ({
        ...prevState,
        themeColor: themeChoice[0],
        user: {
          ...prevState.user,
          themeChoice: 1,
        },
      }));
    } else if (event == 20) {
      this.setState((prevState) => ({
        ...prevState,
        themeColor: themeChoice[1],
        user: {
          ...prevState.user,
          themeChoice: 2,
        },
      }));
    } else if (event == 30) {
      this.setState((prevState) => ({
        ...prevState,
        themeColor: themeChoice[2],
        user: {
          ...prevState.user,
          themeChoice: 3,
        },
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        themeColor: themeChoice[3],
        user: {
          ...prevState.user,
          themeChoice: 4,
        },
      }));
    }
  };

  handleClickOpen = () => {
    this.setState({
      popUpOpen: true,
    });
  };
  handleClose = () => {
    this.setState({
      popUpOpen: false,
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                   EventHandler - Grading Analysis Dialog                   */
  /* -------------------------------------------------------------------------- */
  handleAnalysisDialogOpen = (id) => {
    this.setState({ [id]: true });
  };

  handleDialogClose = (id) => {
    this.setState({ [id]: false });
  };

  handleImpactDialogOpen = (id) => {
    this.setState({ [id]: true });
  };
  /* ---------------------- End - Grading Analysis Dialog --------------------- */

  /* -------------------------------------------------------------------------- */
  /*  This handler captures the mouse focus and switch to the current focused 
		textfield
		Type: onMouseDown
	/* -------------------------------------------------------------------------- */
  handleTextFocus = (event) => {
    this.setState({ editSaved: false });
    let id = event.target.id;
    let index = 0;
    if (id.match(projectTitleRegex) || id.match(projectDescRegex)) {
      index = parseInt(id.split("-")[3]) + 1;
    }

    if (index == 0) {
      let align =
        buffer[index] == null
          ? this.state.user.bio.alignment
          : buffer[0].alignment;
      // console.log("TCL: Editor -> align", align);
      let content =
        buffer[index] == null ? this.state.user.bio.bio : buffer[0].bio;
      let object = {
        id: id,
        bio: content,
        alignment: align,
        doneEditing: false,
      };

      buffer[0] = object;
      this.setState({ editSaved: false, focusField: id });
    }
  };

  /* -------------------------------------------------------------------------- */

  /*         EventHandler - Textfield update (Alignment, Content, Focus...etc)  */
  /* -------------------------------------------------------------------------- */
  updateAlignment = (alignment) => {
    this.setState({ editSaved: false });
    let focused = buffer[0];
    focused.alignment = alignment;
    buffer[0].alignment = alignment;
    this.setState({ [focused.id]: focused });
  };

  /* -------------------------------------------------------------------------- */
  /*  This handler captures Enter key event and trigger the save event
  Type: onKeyDown (ENTER key)
	/* -------------------------------------------------------------------------- */
  textEditSave = (event) => {
    if (event.key === "Enter") {
      this.setState({ focusField: event.target.id }, () => {
        console.log(this.state.theme.typography);
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*  TODO 
    This handler captures the mouse focus lost event
    Type: onBlur
  /* -------------------------------------------------------------------------- */
  onLostTextFocus = (event) => {
    // console.log("Editor -> event", event.target);

    if (!this.state.editSaved) {
      this.saveEditSnapshot(event);
      return;
    }
    this.resetFocus();
  };

  saveEditSnapshot = (event) => {
    this.setState({ editSaved: false });
    let id = event.target.id;
    let projectInfo = null;

    // console.log("Editor -> event", event.target);
    if (id.match(userBioRegex)) {
      this.setState({ editSaved: false, focusField: id });
      if (buffer[0]) {
        buffer[0].bio = event.target.value;
        return;
      }
      buffer[0] = {
        id: id,
        bio: event.target.value,
        alignment: "left",
        doneEditing: true,
      };
    } else if (id.match(projectTitleRegex)) {
      let index = parseInt(id.split("-")[3]);
      if (buffer[index + 1]) {
        buffer[index + 1].name = event.target.value;
        return;
      }
      projectInfo = this.state.user.repos[index];
      buffer[index + 1] = {
        id: id,
        name: event.target.value,
        desc: projectInfo.description,
      };
    } else {
      let index = parseInt(id.split("-")[3]);
      if (buffer[index + 1]) {
        // console.log(buffer[index + 1]);
        buffer[index + 1].desc = event.target.value;
        return;
      }
      projectInfo = this.state.user.repos[index];
      buffer[index + 1] = {
        id: id,
        name: projectInfo.name,
        desc: event.target.value,
      };
    }
  };

  handleImageLoad = (event) => {
    this.setState({ editSaved: false });
    let id = event.target.id;
    let file = event.target.files[0];
    // console.log("Editor -> file", file);

    let object = {
      id: id,
      projectImg: URL.createObjectURL(file),
    };

    this.setState({ [id]: object }, () => {
      let index = parseInt(id.split("-")[3]);
      if (buffer[index + 1]) {
        // console.log(buffer[index + 1]);
        buffer[index + 1].Pic = file;
        return;
      }
      let projectInfo = this.state.user.repos[index];
      // console.log("Editor -> projectInfo", projectInfo);

      buffer[index + 1] = {
        id: id,
        name: projectInfo.name,
        desc: projectInfo.description,
        Pic: file,
      };

      // console.log(buffer[index + 1]);
    });
  };

  handleDeleteProject = (repoId) => {
    this.setState({ deleted: repoId, showDeleteWarning: true });
  };

  handleConfirmDelete = (confirm) => {
    if (confirm) {
      let request = {
        id: this.state.user.userId,
        repoId: this.state.deleted,
      };
      axios
        .post(process.env.REACT_APP_REMOVE_PROJECT, request)
        .then((res) => {
          console.log("handleDelete -> res", res);
          if (res.status == 202) {
            this.getUserService();
            this.setState({ showDeleteWarning: false });
          }
        })
        .catch((err) => {
          console.log("handleDelete -> err", err);
        });
    } else {
      this.setState({ showDeleteWarning: false });
    }
  };

  handleNewProject = (event) => {
    this.setState({ showAddWarning: true });
  };

  handleConfirmAdd = (confirm) => {
    if (confirm) {
      let url =
        process.env.REACT_APP_ADD_PROJECT +
        "githubUsername=" +
        this.state.user.githubURL;
      console.log("handleNewProject -> url", url);

      axios
        .get(url)
        .then((res) => {
          console.log("handleNewProject -> res", res);
          this.setState({ ghRepos: res.data, newProject: true });
        })
        .catch((err) => {
          console.log("handleNewProject -> err", err);
        });
    } else {
      this.setState({ showAddWarning: false });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*  TODO 
		Helper function for reseting the current focus
	/* -------------------------------------------------------------------------- */
  resetFocus = () => {
    // console.log(this.state.focusField + " losing focus");
    this.setState({ focusField: null });
  };

  /* ------------------------- End - Textfield update ------------------------- */

  /* ----------------------------- Save User Edits ---------------------------- */

  /* -------------------------------------------------------------------------- */
  /* This Handler triggers the save action
	   Type: onClick								                                              */
  /* -------------------------------------------------------------------------- */
  handleSavedChanges = (event) => {
    // console.log("Changes to be made: ", buffer);

    this.setState({ editSaved: true }, () => {
      buffer.map((entry, index) => {
        if (entry != null) {
          // console.log("saving entry: ", entry);
          if (index == 0) {
            // console.log("entering user");
            const bio = {
              bio: entry.bio,
              alignment: entry.alignment,
              color: "black",
            };
            const font = {
              family: this.state.theme.typography.fontFamily,
            };

            const serviceParams = {
              id: this.state.user.userId,
              bio: bio,
              font: font,
              themeChoice: this.state.user.themeChoice,
            };
            console.log("Editor -> serviceParams", serviceParams);
            this.pushUserEdits(
              process.env.REACT_APP_SAVE_USER_EDITS,
              serviceParams
            );
          } else {
            // console.log("entering project");
            // Split id string to figure out which project has been updated
            let projectIndex = entry.id.split("-")[3];
            let projectInfo = this.state.user.repos[projectIndex];
            // console.log(projectInfo);
            let formData = new FormData();
            formData.set("id", this.state.user.userId);
            formData.set("repos[repo_id]", projectInfo._id);
            formData.set("repos[repo_name]", entry.name);
            formData.set(
              "repos[repo_description]",
              entry.desc == null ? projectIndex.description : entry.desc
            );
            // formData.set("repos[repo_topics]", projectInfo.topics);
            // formData.set("repos[repo_language]", projectInfo.languages);
            if (entry.Pic != null) formData.set("Pic", entry.Pic);
            this.pushProjectEdits(
              process.env.REACT_APP_SAVE_PROJECT_EDITS,
              formData
            );
          }
        }
      });
    });
  };

  handlePreview = (event) => {
    this.setState({ showPreview: true });
  };

  handleConfirmPreview = (confirm) => {
    if (confirm) {
      this.setState({ preview: true, showPreview: false });
    } else {
      this.setState({ preview: false, showPreview: false });
    }
  };

  handlePublish = (published) => {
    console.log("handlePublish -> published", published);

    const qs = require("querystring");
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const request = {
      id: this.state.user.userId,
      published: published,
    };

    axios
      .post(
        process.env.REACT_APP_SAVE_USER_EDITS,
        qs.stringify(request),
        config
      )
      .then((res) => {
        console.log("TCL: pushUserEdits -> res", res);

        if (res.status === 200) {
          this.setState({ editSaved: true }, () => {
            this.getUserService();
          });
        }
      })
      .catch((err) => {
        console.log("TCL: pushUserEdits -> pushUserEdits -> err", err.response);
      });
  };

  handleConfirmPublish = (confirm) => {
    if (!confirm) {
      this.setState({ published: false }, () => {
        console.log("portfolio published: ", this.state.published);
      });
    }
  };

  downloadResume = () => {
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(this.user.resume.data);
    var fileName = "Resume Download";
    link.download = fileName;
    link.click();
  };

  getUserService = () => {
    const words = this.props.location.pathname.split("/");
    const path_username = words[2];
    let url = "";
    if (path_username != null)
      url =
        process.env.REACT_APP_GET_USER_ENDPOINT + "userName=" + path_username;
    else
      url =
        process.env.REACT_APP_GET_USER_ENDPOINT +
        "userName=" +
        this.props.location.user.username;
    axios
      .get(url)
      .then((res) => {
        console.log("TCL: Editor -> componentDidMount -> res", res);
        this.setState({ user: res.data }, () => {
          this.setState(
            {
              loading: true,
              [this.state.focusField]: null,
              focusField: null,
              themeColor: themeChoice[this.state.user.themeChoice - 1],
            },
            () => {
              buffer = [];
              this.setState(
                (prevState) => ({
                  ...prevState,
                  theme: {
                    ...prevState.theme,
                    typography: {
                      ...prevState.theme.typography,
                      fontFamily:
                        res.data.fontfamily == null
                          ? "Arial"
                          : res.data.fontfamily.family,
                    },
                  },
                }),
                () => {
                  // console.log(this.state.theme.typography);
                }
              );
            }
          );
        });
      })
      .catch((err) => {
        console.log("TCL: Editor -> componentDidMount -> err", err);
      });
  };

  pushUserEdits = (url, request) => {
    axios
      .post(url, request)
      .then((res) => {
        console.log("TCL: pushUserEdits -> res", res);

        if (res.status === 200) {
          this.setState({ editSaved: true }, () => {
            this.getUserService();
          });
        }
      })
      .catch((err) => {
        console.log("TCL: pushUserEdits -> pushUserEdits -> err", err.response);
      });
  };

  pushProjectEdits = (url, formData) => {
    axios({
      method: "post",
      url: url,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then((res) => {
        console.log("TCL: pushProjectEdits -> res", res);

        if (res.status === 200) {
          this.setState({ editSaved: true }, () => {
            this.getUserService();
          });
        }
      })
      .catch((err) => {
        console.log(
          "TCL: pushUserEditsService -> handleSavingEdits -> err",
          err.response
        );
      });
  };

  componentDidMount() {
    this.resetFocus();
    this.getUserService();
    window.scrollTo(0, 0);
  }

  render() {
    const { classes } = this.props;

    if (this.state.preview) {
      return (
        <Redirect
          to={{
            pathname:
              this.state.user == null
                ? "https://www.linkedin.com/"
                : "/viewer" + "/" + this.state.user.userName,
          }}
        />
      );
    }

    if (this.state.newProject)
      return (
        <Redirect
          to={{
            pathname: "/selectionPage",
            user: this.state.user,
            repos: this.state.ghRepos,
          }}
        />
      );

    const user = this.state.user;
    var repos = [];
    var appBarColor = "";
    var middleColor = "";
    var bottomColor = "";
    if (this.state.themeColor != null) {
      appBarColor = this.state.themeColor.appBarColor;
      middleColor = this.state.themeColor.middleColor;
      bottomColor = this.state.themeColor.bottomColor;
    }
    if (user != null) {
      repos = user.repos;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <Header
          classes={classes}
          backgroundColor={appBarColor}
          link="/welcome"
          linkTitle="Sign Out"
          buttonStyle={{ float: "right" }}
          buttonClass={classes.signOutButton}
          pageTitle={
            user == null
              ? "Editing"
              : user.published == true
              ? "Published"
              : "Editing"
          }
        />
        <main>
          <div
            className={classes.heroContent}
            style={{
              padding: 5,
              display: "flex",
              justifyContent: "flex-end",
              backgroundColor: middleColor,
            }}
          >
            {this.state.showPreview == true ? (
              <SlideDialog
                title="You are about to leave the page"
                content="You will lose unsaved progress once you leave the page. Are you sure?"
                showWarning="true"
                onConfirm={this.handleConfirmPreview}
              />
            ) : (
              ""
            )}
            {this.state.showDeleteWarning == true ? (
              <SlideDialog
                title="You are about to delete this project card"
                content="You will lose the project once you delete it. Are you sure?"
                showWarning="true"
                onConfirm={this.handleConfirmDelete}
              />
            ) : (
              ""
            )}
            {this.state.showAddWarning == true ? (
              <SlideDialog
                title="You are about to be redirected to project selection page"
                content="You will lose unsaved progress once you leave the page. Are you sure?"
                showWarning="true"
                onConfirm={this.handleConfirmAdd}
              />
            ) : (
              ""
            )}
          </div>
          {this.state.editSaved == true ? (
            <Alert
              alertOpen={true}
              severity="success"
              title="Success"
              content="Your progress has been saved!"
            />
          ) : (
            ""
          )}
          <div
            className={classes.heroContent}
            style={{ backgroundColor: middleColor }}
          >
            <Container maxWidth="sm">
              <div style={{ padding: 5 }}>
                <Grid container justify="center" alignItems="center">
                  {user == null ? (
                    ""
                  ) : (
                    <Avatar
                      alt=""
                      src={
                        process.env.REACT_APP_FILE_ENDPOINT +
                        user.profilePic.data.filename
                      }
                      className={classes.large}
                    />
                  )}
                </Grid>
                <Grid container justify="center" alignItems="center">
                  {user == null ? (
                    ""
                  ) : (
                    <ThemeProvider theme={this.state.theme}>
                      <InputBase
                        className={classes.margin}
                        disabled
                        defaultValue={user.firstName + " " + user.lastName}
                        inputProps={{
                          style: {
                            textAlign: "center",
                            fontSize: 36,
                            color: "black",
                          },
                        }}
                      />
                    </ThemeProvider>
                  )}
                </Grid>
              </div>
              <div className={classes.heroContent}>
                <Grid item xs={12}>
                  {this.state.editSaved == true ? (
                    <ThemeProvider theme={this.state.theme}>
                      <InputBase
                        className={classes.margin}
                        defaultValue={
                          buffer[0] == null
                            ? user == null
                              ? ""
                              : user.bio.bio
                            : buffer[0].bio
                        }
                        // variant="filled"
                        disabled
                        fullWidth
                        multiline
                        inputProps={{
                          style: {
                            textAlign:
                              this.state.focusField == null
                                ? user == null
                                  ? "left"
                                  : user.bio.alignment
                                : buffer[0].alignment,
                            fontSize: 16,
                            color: "black",
                          },
                        }}
                        onMouseDown={this.handleTextFocus}
                      />
                    </ThemeProvider>
                  ) : (
                    <ThemeProvider theme={this.state.theme}>
                      <TextField
                        className={classes.margin}
                        defaultValue={
                          buffer[0] == null
                            ? user == null
                              ? ""
                              : user.bio.bio
                            : buffer[0].bio
                        }
                        variant="filled"
                        fullWidth
                        multiline
                        inputProps={{
                          style: {
                            textAlign:
                              this.state.focusField == null
                                ? user == null
                                  ? "left"
                                  : user.bio.alignment
                                : buffer[0].alignment,
                            fontSize: 16,
                            // color: "red",
                          },
                        }}
                        onMouseDown={this.handleTextFocus}
                        onBlur={this.onLostTextFocus}
                        onKeyDown={this.textEditSave}
                        id="editable-bio"
                      />
                    </ThemeProvider>
                  )}
                </Grid>
              </div>
              <br />
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center" xl={12}>
                  <Button
                    size="large"
                    variant="text"
                    target="_blank"
                    startIcon={<DescriptionIcon />}
                  >
                    <LinkMaterialUI
                      target="_blank"
                      underline="none"
                      color="inherit"
                      href={
                        user == null
                          ? "https://www.linkedin.com/"
                          : process.env.REACT_APP_FILE_ENDPOINT +
                            user.resume.data.filename
                      }
                    >
                      View My Resume
                    </LinkMaterialUI>
                  </Button>
                  {user != null && user.linkedInLink != "none" ? (
                    <Button
                      size="large"
                      variant="text"
                      startIcon={<LinkedInIcon />}
                    >
                      <LinkMaterialUI
                        target="_blank"
                        underline="none"
                        color="inherit"
                        href={
                          user == null
                            ? "https://www.linkedin.com/"
                            : user.linkedInLink
                        }
                      >
                        View My LinkedIn
                      </LinkMaterialUI>
                    </Button>
                  ) : (
                    <br />
                  )}
                  <Button
                    size="large"
                    variant="text"
                    startIcon={<GitHubIcon />}
                  >
                    <LinkMaterialUI
                      target="_blank"
                      color="inherit"
                      underline="none"
                      href={
                        user == null
                          ? "https://www.github.com/"
                          : "https://www.github.com/" + user.githubURL
                      }
                    >
                      View My Github
                    </LinkMaterialUI>
                  </Button>
                </Grid>
              </div>
              <br />
            </Container>
          </div>
          <div
            className={classes.buttonContent}
            style={{
              padding: 5,
              display: "flex",
              justifyContent: "center",
              backgroundColor: middleColor,
            }}
          >
            <EditWidget
              onAlignmentChange={this.updateAlignment}
              focused={this.state.focusField != null}
              defaultFontType={this.state.theme.typography.fontFamily}
              defaultThemeColor={user == null ? 1 : user.themeChoice}
              onThemeChange={this.handleThemeChange}
              onFontFamilyChange={this.handleFontFamilyChange}
              alignment={buffer[0] == null ? "left" : buffer[0].alignment}
              onSave={this.handleSavedChanges}
              onProject={this.handleNewProject}
              onPreview={this.handlePreview}
              onPublish={this.handlePublish}
              published={user == null ? false : user.published}
            />
          </div>

          <Divider variant="middle" />
          {/* <FormControlLabel
						control={
							<Switch
								checked={!this.state.mouseMoving}
								onChange={this.toggleTool}
							/>
						}
						label="Show"
					/> */}
          {/* End hero unit */}
          <div
            className={classes.heroContentMain}
            style={{ backgroundColor: bottomColor }}
          >
            <Container className={classes.cardGrid} maxWidth="lg">
              <Grow
                in={this.state.loading}
                {...(this.state.loading ? { timeout: 1500 } : {})}
              >
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  // justify="center"
                >
                  {repos.map((repo, id) => (
                    <ScoreCard
                      classes={classes}
                      theme={this.state.theme}
                      repo={repo}
                      userId={this.state.user.userId}
                      userName={this.state.user.userName}
                      index={id}
                      imgObject={
                        this.state[`editable-repo-img-${id}`] == null
                          ? repo.projectPic.data
                          : this.state[`editable-repo-img-${id}`]
                      }
                      onAnalysisDialogOpen={this.handleAnalysisDialogOpen}
                      onAnalysisDialogClose={this.handleDialogClose}
                      onImpactDialogOpen={this.handleImpactDialogOpen}
                      onImpactDialogClose={this.handleDialogClose}
                      // onFocus={this.handleTextFocus}
                      // onChange={this.handleTextFocus}
                      onBlur={this.onLostTextFocus}
                      onLoadImg={this.handleImageLoad}
                      onDeleteProject={this.handleDeleteProject}
                      analysisDialogOpen={this.state[`analysis-dialog-${id}`]}
                      impactDialogOpen={this.state[`impact-dialog-${id}`]}
                    />
                  ))}
                </Grid>
              </Grow>
            </Container>
          </div>
        </main>
        <Footer
          classes={classes}
          style={{ backgroundColor: appBarColor, color: "#ffffff" }}
        />
      </React.Fragment>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Editor);
