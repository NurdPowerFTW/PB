import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "@material-ui/core";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  myAppBar: {
    backgroundColor: "#3C3C55",
  },
  footer: {
    backgroundColor: "#3C3C55",
    color: "#FFFFFF",
    padding: theme.spacing(6),
  },
  heroContentMain: {
    margin: theme.spacing(3, 0, 10),
  },
  signIn: {
    backgroundColor: "#3C3C55",
    color: "#FFFFFF",
  },
});

class Guide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar className={classes.myAppBar} position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Grade Feedback Guideline
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <h1>Code Quality Analysis</h1>
                  <p align="justify">
                    Code quality is very difficult to quantify. We don’t believe
                    there is an exact way to do so. What we are trying to do
                    instead is help both employers and users to get a rough,
                    quick idea of where the user struggles in their code. We
                    believe this will help our users become better programmers
                    and provide a convenient way to get recognized by employers.
                    <br />
                    <br />
                    Specifically, what we are grading is maintainability,
                    performance, and adherence to language specific style
                    guides, which we try to keep unopinionated. To analyze code
                    we rely on a series of static analysis tools. We use the
                    output of these tools to grade projects by providing a
                    weighting scheme for each of the code issues and metrics
                    given to us by the tool.
                    <br />
                    <br />
                    Each programming language is different and thus requires
                    different analysis. Below we have detailed how we analyze
                    code quality for specific languages. If a project is written
                    in multiple languages, we scale the overall score by the
                    number of lines written in each language as well as give
                    language specific scores.
                  </p>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <h2>Java</h2>
                  <p align="justify">
                    Java code is graded by implementation and design code
                    smells. Implementation smells are things such as empty catch
                    clauses or complex methods, smells that are found in your
                    actual code. Design smells are issues in the structure of
                    your code such as broken hierarchies or unutilized
                    abstractions.
                  </p>
                  <h2>Analysis Tool</h2>

                  <Typography className={classes.root}>
                    Designite -{" "}
                    <Link
                      href="https://github.com/tushartushar/DesigniteJava"
                      target="_blank"
                    >
                      github.com/tushartushar/DesigniteJava
                    </Link>
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <h2>Python</h2>
                  <p align="justify">
                    Code written in Python is graded on both style, bugs and
                    errors. For style, we look at good practice and coding
                    standard violations. We also separate minor bugs vs
                    important programming issues. Lastly, we look at fatal
                    errors. We rely on the scoring of our analysis tool for the
                    grading of projects as we feel it is very reliable.
                  </p>
                  <h2>Analysis Tool</h2>
                  <Typography className={classes.root}>
                    Pylint -{" "}
                    <Link href="https://www.pylint.org" target="_blank">
                      www.pylint.org
                    </Link>
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <h2>C/C++</h2>
                  <p align="justify">
                    In C/C++ code we are looking at style, performance, and
                    errors. Stylistically we are mainly looking at readability
                    issues and code that needs cleanup such as redundant code.
                    For performance, we are finding if there are common ways to
                    make the code faster as well as any possible portability
                    issues. Lastly, we look for both build and runtime errors as
                    well as possible ways bugs might easily creep in.
                  </p>
                  <h2>Analysis Tool</h2>
                  <Typography className={classes.root}>
                    Cpplint -{" "}
                    <Link
                      href="https://github.com/cpplint/cpplint"
                      target="_blank"
                    >
                      github.com/cpplint/cpplint
                    </Link>
                  </Typography>
                  <Typography className={classes.root}>
                    Cppcheck -{" "}
                    <Link
                      href="https://cppcheck.sourceforge.net"
                      target="_blank"
                    >
                      cppcheck.sourceforge.net
                    </Link>
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <h2>Swift</h2>
                  <p align="justify">
                    Swift code is graded for style, maintainability, and
                    performance. Style is graded for alignment with swift source
                    convention and community common practices, and more generic
                    programming style issues. For maintainability we look at
                    metrics such as function length and depth of nesting.
                    Performance is judged based on whether quicker Swift methods
                    are used in the code..
                  </p>
                  <h2>Analysis Tool</h2>
                  <Typography className={classes.root}>
                    SwiftLint -{" "}
                    <Link
                      href="https://realm.github.io/SwiftLint"
                      target="_blank"
                    >
                      realm.github.io/SwiftLint
                    </Link>
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <h2>JavaScript</h2>
                  <p align="justify">
                    JavaScript code is scored for maintainability. This factors
                    into account the Halstead volume metric, cyclomatic
                    complexity, and the number of lines of code. We also report
                    style errors and other Halstead metrics per file such as
                    effort and difficulty.
                  </p>
                  <h2>Analysis Tool</h2>
                  <Typography className={classes.root}>
                    Plato -{" "}
                    <Link
                      href="https://github.com/es-analysis/plato/"
                      target="_blank"
                    >
                      github.com/es-analysis/plato/
                    </Link>
                  </Typography>
                  <Typography className={classes.root}>
                    StandardJS -{" "}
                    <Link
                      href="https://github.com/standard/standard/"
                      target="_blank"
                    >
                      github.com/standard/standard/
                    </Link>
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <h2>Future Languages</h2>
                  <p align="justify">
                    The above languages are what we can currently analyze. You
                    can still add projects to your Portfolio if you used a
                    different language, they just won’t get a code quality
                    grade. Currently on our agenda of languages to add are
                    Javascript and Swift. If you have any suggestions on
                    languages to add, please email us at codifycs4000@gmail.com.
                  </p>
                </Paper>
              </Grid>
            </Grid>
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

Guide.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Guide);
