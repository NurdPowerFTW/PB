import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import axios from "axios";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  myAppBar: {
    backgroundColor: "#3C3C55"
  },
  footer: {
    backgroundColor: "#3C3C55",
    color: "#FFFFFF",
    padding: theme.spacing(6)
  },
  heroContentMain: {
    margin: theme.spacing(3, 0, 10)
  },
  signIn: {
    backgroundColor: "#3C3C55",
    color: "#FFFFFF"
  }
});
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      email: null,
      errorList: [],
      preventLink: false,
      isSignedIn: false,
      response: {}
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.validateUponSubmit = this.validateUponSubmit.bind(this);
    this.getResponse = this.getResponse.bind(this);
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }
  validateUponSubmit() {
    const errors = [];
    for (let [key, value] of Object.entries(this.state)) {
      if (value == null) {
        errors.push(key + " needs to be filled out");
      }
    }
    return errors;
  }
  async getResponse() {
    const errors = this.validateUponSubmit();
    if (errors.length === 0) {
      let params =
        process.env.REACT_APP_LOGIN_ENDPOINT +
        "email=" +
        this.state.email +
        "&password=" +
        this.state.password;

      await axios
        .get(params)
        .then(response => {
          console.log("TCL: SignIn -> getResponse -> response", response);
          if (response.status === 200) {
            this.setState({
              isSignedIn: true,
              username: response.data[0].userName
            });
          }
        })
        .catch(error => {
          errors.push(error.response.statusText);
          console.log(error.response);
          this.setState({ errorList: errors });
        });
    }
    {
      {
        this.setState({ errorList: errors });
        return;
      }
    }
  }
  async handleSignIn(e) {
    await this.getResponse();
  }
  render() {
    const { classes } = this.props;
    const { errorList } = this.state;
    if (this.state.isSignedIn)
      return (
        <Redirect
          to={{
            pathname: "/editor/" + this.state.username, //change to appending username
            username: this.state.username
          }}
        />
      ); //send the user id into editor
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
                <Typography
                  component="h6"
                  style={{
                    backgroundColor: "#F0F0F0",
                    color: "red"
                  }}
                >
                  {errorList.map(error => (
                    <p key={error}>Error: {error}</p>
                  ))}
                </Typography>
                <br />
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign-In
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    onChange={this.handleEmailChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    onChange={this.handlePasswordChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <br />
                  <br />
                  <Button
                    onClick={e => this.handleSignIn(e)}
                    fullWidth
                    variant="contained"
                    className={classes.signIn}
                  >
                    Sign In
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
SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(useStyles)(SignIn);
