import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Background from "../background.jpg";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Rachel from "../landingPagePictures/rachel_pic.jpg";
import Soren from "../landingPagePictures/soren.jpeg";
import Will from "../landingPagePictures/will.jpg";
import Amber from "../landingPagePictures/Amber.JPG";
import Avatar from "@material-ui/core/Avatar";
import Overview from "../landingPagePictures/overview.png";
import Github from "../landingPagePictures/github.png";
import Analysis from "../landingPagePictures/analysis.png";
import Edit from "../landingPagePictures/edit.png";
import Contact from "../landingPagePictures/contact.png";
import Temp from "../landingPagePictures/temp.png";
import Portfolio from "../landingPagePictures/portfolio.png";

const useStyles = (theme) => ({
  myAppBar: {
    backgroundColor: "#3C3C55",
  },
  footer: {
    backgroundColor: "#3C3C55",
    color: "#ffffff",
    padding: theme.spacing(6),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  portfoliopic: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    padding: theme.spacing(6),
  },
});

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar
          className={classes.myAppBar}
          position="static"
          style={{ backgroundColor: "#3C3C55" }}
        >
          <Toolbar className={classes.toobar}>
            <Typography variant="h6" color="inherit" noWrap></Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div
            style={{
              backgroundImage: `url(${Background})`,
              border: "2px solid #A9A9A9",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <br />
            <br />
            <br />
            <Typography align="center">
              <text
                style={{
                  fontSize: "90px",
                  fontWeight: "550",
                  textAlign: "center",
                  alignSelf: "stretch",
                  color: "#3C3C55",
                  fontFamily: "lucida grande",
                  lineHeight: "1.35",
                }}
              >
                PORTFOLIO <br /> BUILDER
              </text>
            </Typography>
            <Typography align="center">
              <text
                style={{
                  fontSize: "50px",
                  fontWeight: "450",
                  textAlign: "center",
                  alignSelf: "stretch",
                  color: "#636377",
                  fontFamily: "lucida grande",
                  lineHeight: "1.35",
                }}
              >
                TEAM CODIFY
                <br />
              </text>
            </Typography>
            <br />
            <br />
            <br />
            <br />
          </div>
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              style={{
                backgroundImage: `url(${Overview})`,
                border: "2px solid #A9A9A9",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Typography align="center">
                  <text
                    style={{
                      fontSize: "30px",
                      textAlign: "justify",
                      alignSelf: "stretch",
                      color: "#3C3C55",
                      fontFamily: "TitilliumWeb",
                      lineHeight: "1.35",
                    }}
                  >
                    <br /> <br />
                    <br />
                    We create personalized portfolio webpages for computer
                    science students to help get them hired
                    <br /> <br />
                    <br />
                    <br />
                    <br />
                  </text>
                </Typography>
              </div>
            </Grid>
          </Grid>
          <br />
          <br />
          <br />
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Typography align="center">
                  <text
                    style={{
                      fontSize: "30px",
                      fontWeight: "200",
                      textAlign: "justify",
                      alignSelf: "stretch",
                      color: "#3C3C55",
                      fontFamily: "lucida grande",
                      lineHeight: "1.35",
                    }}
                  >
                    <br /> Projects are pulled from the student's Github account{" "}
                    <br />
                  </text>
                </Typography>
                <br />
                <Typography align="center">
                  <text
                    style={{
                      fontSize: "20px",
                      fontWeight: "150",
                      textAlign: "justify",
                      alignSelf: "stretch",
                      color: "#3C3C55",
                      fontFamily: "lucida grande",
                      lineHeight: "1.35",
                    }}
                  >
                    Students can also upload local projects <br />
                  </text>
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs
              style={{
                backgroundImage: `url(${Github})`,
                border: "2px solid #A9A9A9",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            />
          </Grid>
          <br />
          <br />
          <br />
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              style={{
                backgroundImage: `url(${Analysis})`,
                border: "2px solid #A9A9A9",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Typography align="center">
                  <text
                    style={{
                      fontSize: "30px",
                      fontWeight: "200",
                      textAlign: "justify",
                      alignSelf: "stretch",
                      color: "#3C3C55",
                      fontFamily: "lucida grande",
                      lineHeight: "1.35",
                    }}
                  >
                    <br />
                    <br />
                    <br />
                    <br />
                    We provide code quality analysis and stats per project to
                    give an overview of the student's skills
                    <br />
                    <br /> <br />
                    <br />
                    <br />
                    <br />
                  </text>
                </Typography>
              </div>
            </Grid>
          </Grid>
          <br />
          <br />
          <br />
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Typography align="center">
                  <text
                    style={{
                      fontSize: "30px",
                      fontWeight: "200",
                      textAlign: "justify",
                      alignSelf: "stretch",
                      color: "#3C3C55",
                      fontFamily: "lucida grande",
                      lineHeight: "1.35",
                    }}
                  >
                    <br /> <br />
                    <br />
                    <br />
                    Students have full control over their portfolio through
                    customizations and edits
                    <br />
                    <br /> <br /> <br />
                    <br />
                  </text>
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              style={{
                backgroundImage: `url(${Edit})`,
                border: "2px solid #A9A9A9",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            />
          </Grid>
          <br />
          <br />
          <br />
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              style={{
                backgroundImage: `url(${Contact})`,
                border: "2px solid #A9A9A9",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Typography align="center">
                  <text
                    style={{
                      fontSize: "30px",
                      fontWeight: "200",
                      textAlign: "justify",
                      alignSelf: "stretch",
                      color: "#3C3C55",
                      fontFamily: "lucida grande",
                      lineHeight: "1.35",
                    }}
                  >
                    <br />
                    <br />
                    Prospective employers can easily contact the student
                    directly after viewing their portfolio
                    <br />
                    <br />
                  </text>
                </Typography>
              </div>
            </Grid>
          </Grid>
          <br />
          <img
            src={Portfolio}
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className={classes.portfoliopic}
          ></img>
          <Typography align="center">
            <text
              style={{
                fontSize: "50px",
                fontWeight: "450",
                textAlign: "center",
                alignSelf: "stretch",
                color: "#3C3C55",
                fontFamily: "lucida grande",
                lineHeight: "1.35",
              }}
            >
              CHECK IT OUT!
            </text>
          </Typography>
          <br />
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Link to="/welcome" target="blank">
                <Button variant="outlined" size="large">
                  Our Homepage
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/viewer/janedoe" target="blank">
                <Button variant="outlined" size="large">
                  View an example portfolio
                </Button>
              </Link>
            </Grid>
          </Grid>
          <br />
          <br />
          <br />
          <br />
        </main>
        <div className={classes.footer}>
          <Typography align="center" variant="h6">
            OUR TEAM
          </Typography>
          <br />
          <br />
          <Container maxWidth="lg">
            <Grid container justify="center" spacing={10}>
              <Grid item>
                <Avatar src={Rachel} className={classes.large} />
                <text
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Rachel Burnett
                </text>
              </Grid>
              <Grid item>
                <Avatar src={Soren} className={classes.large} />
                <text
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Soren Nelson
                </text>
              </Grid>
              <Grid item>
                <Avatar src={Amber} className={classes.large} />
                <text
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Amber Zheng
                </text>
              </Grid>
              <Grid item>
                <Avatar src={Will} className={classes.large} />
                <text
                  style={{
                    fontSize: "20px",
                  }}
                >
                  William Tang
                </text>
              </Grid>
            </Grid>
          </Container>
          <Typography variant="subtitle1" align="center" component="p">
            <br /> @ University of Utah 2020
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Landing);
