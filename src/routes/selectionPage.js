import React, { useRef } from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import Paper from "@material-ui/core/Paper";
import RadioGroup from "@material-ui/core/RadioGroup";
import Divider from "@material-ui/core/Divider";
import Repo from "../models/repo";
import User from "../models/user";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import ProgressGuide from "../components/stepper";
import BackDrop from "../components/backdrop";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
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

class SelectionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      uid: null,
      isSignedIn: false,
      repos: [],
      uploads: [],
      loading: false,
      success: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.finishSignUp = this.finishSignUp.bind(this);
  }

  handleChange = (event) => {
    let target = event.target; //an array of public repos

    if (target.checked) {
      this.props.location.repos.map((r) => {
        if (r.id == target.value) {
          this.setState({
            uploads: [
              ...this.state.uploads,
              new Repo(r.id, r.name, r.url, r.languages, r.description),
            ],
          });
        }
      });
    } else {
      //TODO: implement a remove function for user repo removal
    }
  };

  async finishSignUp() {
    this.setState({
      loading: true,
      success: false,
    });

    this.handleUploads();
  }

  async handleUploads() {
    let uploadUrl = process.env.REACT_APP_UPLOAD_REPO_ENDPOINT;
    let size = this.state.uploads.length;

    if (size == 0) {
      this.setState({
        isSignedIn: true,
        loading: false,
        success: true,
      });
    }

    this.state.uploads.map((repo, i) => {
      let uploadParams = {
        id: this.props.location.user.userId,
        repo_url: repo.repo_url,
        repo_name: repo.repo_name,
        repo_language: repo.repo_language,
        repo_description: repo.repo_description,
      };
      console.log(
        "SelectionPage -> handleUploads -> uploadParams",
        uploadParams
      );

      axios({
        method: "post",
        url: uploadUrl,
        data: uploadParams,
      })
        .then((res) => {
          if (res.status === 200 && i === size - 1) {
            this.setState({
              isSignedIn: true,
              loading: false,
              success: true,
            });
          }
        })
        .catch((err) => {
          console.log("TCL: SelectionPage -> handleUploads -> err", err);
        });
    });
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    const buttonClassname = clsx({
      [classes.buttonSuccess]: this.state.success,
    });
    if (this.state.isSignedIn)
      return (
        <Redirect
          to={{
            pathname: "/uploadPage",
            user: this.props.location.user,
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
                <ProgressGuide stage="github" />
                <BackDrop open={this.state.loading} />
                <Typography variant="h4">Project Selection</Typography>
                {/* <Typography variant="body1">{this.props.location.user.id}</Typography> */}
                <br />
                <Typography variant="body1">
                  Select which of your GitHub projects you would like to include
                  in your portfolio.
                </Typography>
                <Paper className={classes.form} noValidate>
                  <RadioGroup value={this.state.buttonValue}>
                    {this.props.location.repos == null ||
                    this.props.location.repos.length === 0 ? (
                      <Typography>
                        There are no public projects to pull from your Github.
                      </Typography>
                    ) : (
                      this.props.location.repos.map((repo, i) => {
                        return (
                          <FormControlLabel
                            key={i}
                            label={repo.name}
                            value={repo.id}
                            control={<Checkbox onChange={this.handleChange} />}
                          />
                        );
                      })
                    )}
                  </RadioGroup>
                </Paper>
              </div>
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
                  Next
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

SelectionPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(SelectionPage);
