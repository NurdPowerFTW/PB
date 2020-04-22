import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import LinkMaterialUI from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Grow from "@material-ui/core/Grow";
import ScoreCard from "../components/scoreCard";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import DescriptionIcon from "@material-ui/icons/Description";
import GitHubIcon from "@material-ui/icons/GitHub";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { red } from "@material-ui/core/colors";

import {
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { Divider } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";

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
  heroContent: {
    padding: theme.spacing(3, 0, 3),
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
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
    top: 12,
    right: 10,
    position: "fixed",
  },
  contact: {
    backgroundColor: "#ededed",
    paddingTop: 15,
  },
  sendButton: {
    backgroundColor: "#a1a1a1",
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

var themeChoice = [
  { appBarColor: "#487091", middleColor: "#f3f6f9", bottomColor: "#e2e9f1" },
  { appBarColor: "#e6a4b4", middleColor: "#f5eee6", bottomColor: "#f3d7ca" },
  { appBarColor: "#52616b", middleColor: "#f0f5f9", bottomColor: "#c9d6df" },
  { appBarColor: "#357376", middleColor: "#e5dfdf", bottomColor: "#6ba8a9" },
];

class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      cards: [],
      db: null,
      themeColor: themeChoice[0],
      theme: theme,
      popUpOpen: false,
      popUpOpen2: false,
      file: null,
      user: null,
      loading: false,
      messageSent: false,
      employerName: null,
      employerCompany: null,
      employerEmail: null,
      employerMessage: null,
      published: false,
    };
  }

  nameInput = (event) => {
    this.setState({
      employerName: event.target.value,
    });
  };

  companyInput = (event) => {
    this.setState({
      employerCompany: event.target.value,
    });
  };

  emailInput = (event) => {
    this.setState({
      employerEmail: event.target.value,
    });
  };

  messageInput = (event) => {
    this.setState({
      employerMessage: event.target.value,
    });
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

  handleClickOpen2 = () => {
    this.setState({
      popUpOpen2: true,
    });
  };

  handleClose2 = () => {
    this.setState({
      popUpOpen2: false,
    });
  };

  componentDidMount() {
    const words = this.props.location.pathname.split("/");
    const username = words[2];
    let url = process.env.REACT_APP_GET_USER_ENDPOINT + "userName=" + username;
    console.log("TCL: Editor -> componentDidMount -> url", url);

    axios
      .get(url)
      .then((res) => {
        console.log("TCL: Editor -> sign api call return value -> res", res);
        this.setState({ user: res.data, loading: true }, () => {
          this.setState(
            {
              themeColor: themeChoice[this.state.user.themeChoice - 1],
              published: this.state.user.published,
            },
            () => {
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
    window.scrollTo(0, 0);
  }

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

  handleSend = () => {
    console.log("hi");
    this.setState({ messageSent: true });

    const axios = require("axios");
    const qs = require("querystring");

    const requestBody = {
      id: this.state.user._id,
      employerName: this.state.employerName,
      employerCompany: this.state.employerCompany,
      employerEmail: this.state.employerEmail,
      message: this.state.employerMessage,
    };

    let sendURL = process.env.REACT_APP_CONTACT_ENDPOINT;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post(sendURL, qs.stringify(requestBody), config)
      .then((res) => {
        console.log("Success");
        if (res.status === 200) {
          this.setState({ messageSent: true });
        }
      })
      .catch((err) => {
        console.log("We got an error:", err);
      });
  };

  render() {
    const { classes } = this.props;
    let user = this.state.user;
    var repos = [];
    if (user != null) repos = user.repos;
    var appBarColor = "";
    var middleColor = "";
    var bottomColor = "";
    if (this.state.themeColor != null) {
      appBarColor = this.state.themeColor.appBarColor;
      middleColor = this.state.themeColor.middleColor;
      bottomColor = this.state.themeColor.bottomColor;
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar style={{ backgroundColor: appBarColor }} position="static">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap>
              Portfolio Builder
            </Typography>
          </Toolbar>
          <Link to="/welcome">
            <Button
              className={classes.signOutButton}
              style={{ float: "right", color: appBarColor }}
              variant="contained"
            >
              Portfolio Builder Home
            </Button>
          </Link>
        </AppBar>
        <main>
          {/* Hero unit */}

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
              {this.state.published == true ? (
                <div className={classes.heroContent}>
                  <Grid item xs={12}>
                    <ThemeProvider theme={this.state.theme}>
                      <InputBase
                        className={classes.margin}
                        defaultValue={user == null ? "" : user.bio.bio}
                        disabled
                        fullWidth
                        multiline
                        inputProps={{
                          style: {
                            textAlign:
                              user == null ? "left" : user.bio.alignment,
                            fontSize: 18,
                            color: "black",
                          },
                        }}
                      />
                    </ThemeProvider>
                  </Grid>
                </div>
              ) : (
                <Grid item xs={12}>
                  <ThemeProvider theme={this.state.theme}>
                    <InputBase
                      className={classes.margin}
                      defaultValue="This portfolio is not ready to be viewed yet"
                      disabled
                      fullWidth
                      multiline
                      inputProps={{
                        style: {
                          textAlign: "center",
                          fontSize: 18,
                          color: "black",
                        },
                      }}
                    />
                  </ThemeProvider>
                </Grid>
              )}

              {this.state.published == true ? (
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
              ) : (
                ""
              )}
              <br />
            </Container>
          </div>

          {this.state.published == true ? (
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
                    alignItems="flex-start"
                    // justify="center"
                  >
                    {repos.map((repo, id) => (
                      <ScoreCard
                        classes={classes}
                        mode="employer"
                        theme={this.state.theme}
                        userName={this.state.user.userName}
                        repo={repo}
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
                        analysisDialogOpen={this.state[`analysis-dialog-${id}`]}
                        impactDialogOpen={this.state[`impact-dialog-${id}`]}
                      />
                    ))}
                  </Grid>
                </Grow>
              </Container>
            </div>
          ) : (
            ""
          )}
        </main>
        <div className={classes.contact}>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            {this.state.messageSent == true ? (
              <Typography
                style={{
                  fontSize: "25px",
                  textAlign: "center",
                  alignSelf: "stretch",
                  lineHeight: "1.35",
                }}
              >
                Message to {user.firstName} Sent!
                <br />
                <br />
              </Typography>
            ) : (
              <div className={classes.paper}>
                <Typography
                  style={{
                    fontSize: "25px",
                    alignSelf: "stretch",
                    lineHeight: "1.35",
                  }}
                  component="h1"
                  variant="h5"
                >
                  Contact {user == null ? "" : user.firstName + ":"}
                </Typography>
                <br />
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="name"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Your Name"
                        onChange={this.nameInput}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="company"
                        label="Company"
                        name="company"
                        autoComplete="company"
                        onChange={this.companyInput}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Your Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={this.emailInput}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="message"
                    label="Message"
                    id="message"
                    multiline
                    rows="5"
                    autoComplete="message"
                    onChange={this.messageInput}
                  />
                  <br />
                  <br />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.sendButton}
                    onClick={(e) => this.handleSend(e)}
                  >
                    Send
                  </Button>
                </form>
                <br />
                <br />
              </div>
            )}
          </Container>
        </div>
        {/* Footer */}
        <footer
          className={classes.footer}
          style={{ backgroundColor: appBarColor, color: "#ffffff" }}
        >
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

Viewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Viewer);
