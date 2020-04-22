import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Background from "../background.jpg";
import Header from "../components/header";
import Footer from "../components/footer";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    margin: 0,
  },
  signIn: {
    marginLeft: theme.spacing(124),
  },
  signInButton: {
    backgroundColor: "#ffffff",
    color: "#3C3C55",
    top: 12,
    right: 10,
    position: "fixed",
  },
  getStarted: {
    backgroundColor: "#3C3C55",
    color: "#ffffff",
  },
  toolbar: {
    paddingRight: 24,
  },
});

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // I have no idea why runner won't run
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Header
          classes={classes}
          link="/signIn"
          linkTitle="Sign In"
          buttonStyle={{ float: "right" }}
          buttonClass={classes.signInButton}
        />
        <main>
          <div className={classes.heroContentMain}>
            <Container maxWidth="sm">
              <br />
              <br />
              <Typography align="center">
                <text
                  style={{
                    fontSize: "100px",
                    fontWeight: "500",
                    textAlign: "center",
                    alignSelf: "stretch",
                    color: "#3C3C55",
                    fontFamily: "lucida grande",
                    lineHeight: "1.35",
                  }}
                >
                  PORTFOLIO BUILDER
                </text>
              </Typography>
              <br />
              <Typography variant="h5" align="center" color="textSecondary">
                Portfolio Builder automatically creates a professional portfolio
                for computer science students. Create your portfolio today!
                <br />
                <br />
                <Grid item>
                  <Link to="/signUp">
                    <Button className={classes.getStarted} variant="contained">
                      Get Started
                    </Button>
                  </Link>
                </Grid>
                <br />
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Link to="/guide" target="blank">
                      <Button variant="outlined" size="small">
                        See how we analyze projects
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/viewer/janedoe" target="blank">
                      <Button variant="outlined" size="small">
                        View an example portfolio
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/landingPage" target="blank">
                      <Button variant="outlined" size="small">
                        Our Landing Page
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
                <br />
                <br />
              </Typography>
            </Container>
          </div>
        </main>
        <Footer classes={classes} />
      </React.Fragment>
    );
  }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Welcome);
