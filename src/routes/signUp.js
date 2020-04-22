import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Divider } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Theme1 from "../theme1.png";
import Theme2 from "../theme2.png";
import Theme3 from "../theme3.png";
import Theme4 from "../theme4.png";
import User from "../models/user";
import axios from "axios";
import { Redirect } from "react-router";

const useStyles = (theme) => ({
  body: {
    backgroundColor: theme.palette.common.white,
  },
  paper: {
    margin: theme.spacing(3, 0, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    margin: theme.spacing(3, 0, 3),
  },
  submit: {
    backgroundColor: "#3C3C55",
    color: "#ffffff",
    margin: theme.spacing(3, 0, 0),
  },
  myAppBar: {
    backgroundColor: "#3C3C55",
  },
  footer: {
    backgroundColor: "#3C3C55",
    color: "#ffffff",
    padding: theme.spacing(6),
  },
  upload: {
    backgroundColor: "#3C3C55",
    color: "#ffffff",
    margin: theme.spacing(1, 0, 0),
  },
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedUp: false,
      themeChoice: "1",
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      password: null,
      bio: null,
      resume: null,
      picture: null,
      githubUsername: null,
      linkedInLink: "none",
      githubURL: null,
      repos: [],
      errors: [],
      buttonValue: false,
      authenticationMessage: null,
      user: null,
    };
    this.themeChoice = this.themeChoice.bind(this);
    this.firstNameInput = this.firstNameInput.bind(this);
    this.lastNameInput = this.lastNameInput.bind(this);
    this.emailInput = this.emailInput.bind(this);
    this.usernameInput = this.usernameInput.bind(this);
    this.passwordInput = this.passwordInput.bind(this);
    this.bioInput = this.bioInput.bind(this);
    this.gitUsernameInput = this.gitUsernameInput.bind(this);
    this.linkedinURLInput = this.linkedinURLInput.bind(this);
    this.githubURLInput = this.githubURLInput.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.uploadResume = this.uploadResume.bind(this);
    this.uploadProfilePic = this.uploadProfilePic.bind(this);
  }

  async getUser(username) {
    return fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        authorization: "token b74ddc51c3369ae1b18d1824e0358c1173b3daea",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let user = await this.getUser(this.state.githubUsername);

    if (user["message"] === "Not Found") {
      this.setState({
        authenticationMessage: "User not found.",
      });
    } else if (this.state.githubUsername == null) {
      this.setState({
        authenticationMessage: "Username must be non-empty.",
      });
    } else {
      this.setState({
        authenticationMessage: "Authentication Successful!",
      });
    }
  }

  themeChoice = (event) => {
    this.setState({
      themeChoice: event.target.value,
    });
  };

  firstNameInput = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  lastNameInput = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  emailInput = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  usernameInput = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  passwordInput = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  bioInput = (event) => {
    this.setState({
      bio: event.target.value,
    });
  };

  gitUsernameInput = (event) => {
    this.setState({
      githubUsername: event.target.value,
      githubURL: event.target.value,
    });
  };

  linkedinURLInput = (event) => {
    this.setState({
      linkedInLink: event.target.value,
    });
  };

  githubURLInput = (event) => {
    this.setState({
      githubURL: event.target.value,
    });
  };

  checkButtonChange = (event) => {
    this.setState({
      buttonValue: event.target.checked,
    });
  };

  uploadResume(e) {
    this.setState({
      resume: e.target.files[0],
    });
  }

  uploadProfilePic(e) {
    this.setState({
      picture: e.target.files[0],
    });
  }

  validateUponSubmit() {
    const errors = [];

    for (let [key, value] of Object.entries(this.state)) {
      if (value == null && key !== "user") {
        errors.push(key + " needs to be filled out");
      }
    }

    if (!this.state.buttonValue) {
      errors.push("Pease accept the terms and agreements.");
    }

    if (this.state.password != null && this.state.password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    if (this.state.email != null) {
      const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!expression.test(String(this.state.email).toLowerCase())) {
        errors.push("Please enter a valid email address.");
      }
    }

    return errors;
  }

  async handleNextButton(e) {
    const errors = this.validateUponSubmit();

    if (errors.length > 0) {
      e.preventDefault();
      this.setState({ errors });
      window.scrollTo(0, 0);
      return;
    }

    // Call sign up api from here
    let user = new User(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.username,
      this.state.password,
      this.state.bio,
      this.state.resume,
      this.state.picture,
      this.state.linkedInLink,
      this.state.githubURL,
      this.state.themeChoice
    );
    console.log("SignUp -> handleNextButton -> user", user);

    let url = process.env.REACT_APP_SIGNUP_ENDPOINT;
    let formData = new FormData();
    formData.set("profilePic", user.picture);
    formData.set("resume", user.resume);
    formData.set("email", user.email);
    formData.set("themeChoice", user.themeChoice);
    formData.set("bio[bio]", user.bio);
    formData.set("firstName", user.firstName);
    formData.set("lastName", user.lastName);
    formData.set("password", user.password);
    formData.set("githubURL", user.githubURL);
    formData.set("linkedInLink", user.linkedInLink);
    formData.set("githubUsername", this.state.githubUsername);
    formData.set("userName", user.userName);
    console.log("SignUp -> handleNextButton -> formData", formData.email);
    // Display the key/value pairs
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    return axios({
      method: "post",
      url: url,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then((res) => {
        console.log("TCL: SignUp -> handleNextButton -> res", res);
        if (res.status === 200) {
          user.setUserID(res.data.userId);
          this.setState(
            {
              repos: res.data.repos,
              user: user,
              isSignedUp: true,
            },
            () => {
              console.log(this.state.user);
            }
          );
        }
      })
      .catch((err) => {
        console.log("We got an error!", err);
        const errors = [];
        errors.push(err.response.statusText);
        window.scrollTo(0, 0);
        this.setState({ errors });
      });
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    if (this.state.isSignedUp)
      return (
        <Redirect
          to={{
            pathname: "/selectionPage",
            user: this.state.user,
            repos: this.state.repos,
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
                <div className={classes.paper} style={{ paddingInline: 10 }}>
                  <Typography
                    component="h6"
                    style={{
                      backgroundColor: "#f0f0f0",
                      color: "red",
                    }}
                  >
                    {errors.map((error) => (
                      <p key={error}>Error: {error}</p>
                    ))}
                  </Typography>
                </div>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign Up
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange={this.firstNameInput}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange={this.lastNameInput}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={this.emailInput}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        onChange={this.usernameInput}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={this.passwordInput}
                      />
                      <Typography>
                        <br />
                        <Divider />
                        <br />
                        Provide some basic info for your portfolio. This will
                        help employers get to know you!
                        <br />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="Brief Personal Bio"
                        required
                        variant="outlined"
                        fullWidth
                        multiline
                        rows="5"
                        onChange={this.bioInput}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="linkedInLink"
                        label="LinkedIn Page URL"
                        id="linkedInURL"
                        onChange={this.linkedinURLInput}
                      />
                    </Grid>
                    <Typography>
                      <br />
                      <Divider />
                    </Typography>
                    <Grid item sm={12}>
                      <Typography>Upload your Resume:</Typography>
                      <input
                        type="file"
                        accept="application/pdf"
                        className={classes.input}
                        onChange={(e) => this.uploadResume(e)}
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <Typography>Upload a Profile Picture:</Typography>
                      <input
                        type="file"
                        accept="image/*"
                        className={classes.input}
                        onChange={(e) => this.uploadProfilePic(e)}
                      />
                      <Typography>
                        <br />
                        <Divider />
                        <br />
                        Pick a Color Scheme for your Portfolio
                      </Typography>
                    </Grid>
                    <Grid item sm={12}>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                      >
                        <RadioGroup
                          value={this.state.themeChoice}
                          onChange={this.themeChoice}
                        >
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Theme 1"
                          />
                          <img
                            src={Theme1}
                            alt="title"
                            height="60"
                            width="120"
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="Theme 2"
                          />
                          <img
                            src={Theme2}
                            alt="title"
                            height="60"
                            width="120"
                          />
                          <FormControlLabel
                            value="3"
                            control={<Radio />}
                            label="Theme 3"
                          />
                          <img
                            src={Theme3}
                            alt="title"
                            height="60"
                            width="120"
                          />
                          <FormControlLabel
                            value="4"
                            control={<Radio />}
                            label="Theme 4"
                          />
                          <img
                            src={Theme4}
                            alt="title"
                            height="60"
                            width="120"
                          />
                        </RadioGroup>
                      </FormControl>
                      <Typography>
                        <br />
                        <Divider />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography style={{ marginBottom: 20, color: "blue" }}>
                        {this.state.authenticationMessage}
                      </Typography>
                      <TextField
                        variant="outlined"
                        fullWidth
                        required
                        name="githubUsername"
                        label="GitHub Username"
                        id="gitHubUsername"
                        onChange={this.gitUsernameInput}
                      />
                      <Button
                        className={classes.upload}
                        variant="contained"
                        component="span"
                        onClick={(e) => this.handleSubmit(e)}
                      >
                        Verify
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            required="true"
                            value="allowAccess"
                            color="primary"
                            onChange={this.checkButtonChange}
                          />
                        }
                        label="I give Portfolio Builder permission to access my GitHub for 
                        the purpose of creating my portfolio."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    className={classes.submit}
                    style={{ float: "right" }}
                    variant="contained"
                    fullWidth
                    onClick={this.handleNextButton}
                  >
                    Next
                  </Button>
                </form>
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

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(SignUp);
