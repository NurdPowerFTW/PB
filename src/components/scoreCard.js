import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import LinkMaterialUI from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import { IconButton, DialogContent } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import InfoIcon from "@material-ui/icons/Info";
import GroupIcon from "@material-ui/icons/Group";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import ImageIcon from "@material-ui/icons/Image";
import DefaultMedia from "../defaultMedia.png";
import AnalysisTable from "./analysisTable";
import EmployerAnalysisTable from "./employerAnalysisTable";
import { VictoryPie } from "victory";
import Like from "./like";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import Avatar from "@material-ui/core/Avatar";
import BuildIcon from "@material-ui/icons/Build";
import InputBase from "@material-ui/core/InputBase";
import WidgetsIcon from "@material-ui/icons/Widgets";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Tooltip from "@material-ui/core/Tooltip";

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
function ScoreCard(props) {
  const { classes, userName, userId, repo, index, imgObject, mode } = props;
  const {
    onAnalysisDialogOpen,
    onAnalysisDialogClose,
    onImpactDialogOpen,
    onImpactDialogClose,
    onLoadImg,
    onDeleteProject,
    analysisDialogOpen,
    impactDialogOpen,
  } = props;
  const { onBlur, theme } = props;
  const [state, setState] = React.useState({
    selection: 0,
    language: null,
    score: null,
    analysis:
      mode == "employer"
        ? repo.analysis[0].employerAnalysis
        : repo.analysis[0].analysis,
  });
  const handleClose = () => {
    onImpactDialogClose(`impact-dialog-${index}`);
    onAnalysisDialogClose(`analysis-dialog-${index}`);
  };

  const handleAnalysisDialogOpen = (event) => {
    let target = event.target;
    const id = target.id;
    console.log("handleAnalysisDialogOpen -> id", id);

    onAnalysisDialogOpen(id);
  };

  const handleImpactDialogOpen = (event) => {
    let target = event.target;
    const id = target.id;
    console.log("handleAnalysisDialogOpen -> id", id);

    onImpactDialogOpen(id);
  };

  const handleTitleFocus = (event) => {
    // onFocus(event);
    onBlur(event);
  };

  const handleTitleChange = (event) => {
    // onChange(event);
  };

  const handlePictureChange = (event) => {
    onLoadImg(event);
  };

  const handleLanguage = (event) => {
    let value = event.target.value;
    if (mode == "employer") {
      setState({
        ...state,
        selection: value,
        language: repo.analysis[value].language,
        score: repo.analysis[value].score,
        analysis: repo.analysis[value].employerAnalysis,
      });
    } else {
      setState({
        ...state,
        selection: value,
        language: repo.analysis[value].language,
        score: repo.analysis[value].score,
        analysis: repo.analysis[value].analysis,
      });
    }
  };

  const handleDelete = () => {
    onDeleteProject(repo._id);
  };

  const handleSetting = () => {};
  var repo_title_id = "editable-repo-title-" + index;
  var repo_description_id = "editable-repo-description-" + index;
  var img_id = "editable-repo-img-" + index;

  return (
    <Grid item key={repo.name} xs={12} sm={6}>
      <Card className={classes.card} key={index}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {repo.name.substring(0, 1)}
            </Avatar>
          }
          action={
            mode == "employer" ? (
              <Like
                count={repo.likes == null ? 0 : repo.likes}
                user={userName}
                repoId={repo._id}
              />
            ) : (
              ""
              // <IconButton aria-label="settings" onClick={handleSetting}>
              //   <MoreVertIcon />
              // </IconButton>
            )
          }
          title={
            mode == "employer" ? (
              <InputBase
                id={repo_title_id}
                variant="standard"
                defaultValue={repo.name}
                fullWidth
                disabled
                inputProps={{
                  style: {
                    fontSize: 18,
                    color: "black",
                  },
                }}
                // onFocus={handleTitleFocus}
                // onChange={handleTitleChange}
                // onKeyUp={handleTitleChange}
                onBlur={handleTitleFocus}
              />
            ) : (
              <TextField
                id={repo_title_id}
                variant="standard"
                defaultValue={repo.name}
                fullWidth
                inputProps={{
                  style: {
                    fontSize: 18,
                  },
                }}
                // onFocus={handleTitleFocus}
                // onChange={handleTitleChange}
                // onKeyUp={handleTitleChange}
                onBlur={handleTitleFocus}
              />
            )
          }
          subheader={
            mode == "employer" ? (
              <InputBase
                id={repo_description_id}
                variant="standard"
                defaultValue={repo.description}
                fullWidth
                multiline
                disabled
                inputProps={{
                  style: {
                    fontSize: 16,
                    color: "#4E4747",
                    textAlign: "justify",
                  },
                }}
                // onFocus={handleTitleFocus}
                // onChange={handleTitleChange}
                onBlur={handleTitleFocus}
              />
            ) : (
              <TextField
                id={repo_description_id}
                variant="standard"
                defaultValue={repo.description}
                fullWidth
                multiline
                inputProps={{
                  style: {
                    fontSize: 16,
                  },
                }}
                // onFocus={handleTitleFocus}
                // onChange={handleTitleChange}
                onBlur={handleTitleFocus}
              />
            )
          }
        />

        {repo.url.includes(".zip") ? (
          <LinkMaterialUI
            className={classes.linkOptions}
            href={process.env.REACT_APP_FILE_ENDPOINT + repo.url}
          >
            <CardMedia
              className={classes.cardMedia}
              image={
                imgObject == null
                  ? DefaultMedia
                  : imgObject.projectImg == null
                  ? process.env.REACT_APP_FILE_ENDPOINT + imgObject.filename
                  : imgObject.projectImg
              }
              title={`Download ${repo.name} as .zip file`}
            />
          </LinkMaterialUI>
        ) : (
          <LinkMaterialUI
            className={classes.linkOptions}
            target="_blank"
            href={repo.url}
          >
            <CardMedia
              className={classes.cardMedia}
              image={
                imgObject == null
                  ? DefaultMedia
                  : imgObject.projectImg == null
                  ? process.env.REACT_APP_FILE_ENDPOINT + imgObject.filename
                  : imgObject.projectImg
              }
              title={`View ${repo.name} On Github`}
            />
          </LinkMaterialUI>
        )}

        {/* -------------------------------------------------------------------------- */
        /*                             Card Content Start                             */
        /* -------------------------------------------------------------------------- */}
        <CardContent className={classes.cardContent}>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.myPaper} elevation={2}>
                Language
                <Divider />
                <div className={classes.root}>
                  {repo.analysis.map((entry) => {
                    return (
                      <Chip
                        label={entry.language}
                        avatar={
                          <Avatar>{entry.language.substring(0, 1)}</Avatar>
                        }
                        variant="outlined"
                        size="small"
                        clickable
                        color="primary"
                      ></Chip>
                    );
                  })}
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.myPaper} elevation={2}>
                Details
                <Divider />
                <Typography variant="subtitle1">
                  File Count: {repo.analysis[0].fileCount}
                </Typography>
                <Typography variant="subtitle1">
                  Line Count: {repo.analysis[0].lineCount}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper className={classes.myPaper} elevation={2}>
                Contributors
                <IconButton
                  size="medium"
                  id={`impact-dialog-${index}`}
                  onClick={handleImpactDialogOpen}
                >
                  <GroupIcon
                    id={`impact-dialog-${index}`}
                    onClick={handleImpactDialogOpen}
                    style={{ fontSize: 18 }}
                  />
                </IconButton>
                <Dialog
                  onClose={handleClose}
                  open={impactDialogOpen}
                  fullWidth="true"
                  maxWidth="md"
                  aria-labelledby="impact"
                >
                  <DialogTitle id="impact">Project Impact</DialogTitle>
                  <DialogContent>
                    <Paper>
                      <VictoryPie
                        data={[
                          { x: userName, y: parseInt(repo.projectImpact) },
                          {
                            x: "Rest of the Team",
                            y: 100 - parseInt(repo.projectImpact),
                          },
                        ]}
                        innerRadius={50}
                        labelRadius={({ innerRadius }) => innerRadius + 5}
                        style={{
                          labels: {
                            fill: "white",
                            fontSize: 10,
                            fontWeight: "bold",
                          },
                        }}
                        colorScale={["orange", "navy"]}
                      />
                    </Paper>
                  </DialogContent>
                </Dialog>
                <Divider />
                <Typography variant="subtitle1">
                  {repo.numContributors}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper className={classes.myPaper} elevation={2}>
                Code Quality
                <IconButton
                  size="medium"
                  id={`analysis-dialog-${index}`}
                  onClick={handleAnalysisDialogOpen}
                >
                  <BuildIcon
                    id={`analysis-dialog-${index}`}
                    onClick={handleAnalysisDialogOpen}
                    style={{ fontSize: 16 }}
                  />
                </IconButton>
                <Dialog
                  onClose={handleClose}
                  open={analysisDialogOpen}
                  fullWidth="true"
                  maxWidth="md"
                  aria-labelledby="explanation"
                >
                  <DialogTitle id="explanation">
                    Evaluation Criteria:
                    {
                      <Link
                        to={{
                          pathname: "/guide",
                        }}
                        target="_blank"
                      >
                        <IconButton size="medium">
                          <InfoIcon style={{ fontSize: 18 }} />
                        </IconButton>
                      </Link>
                    }
                    <FormControl className={classes.formControl}>
                      {/* <InputLabel
                        shrink
                        htmlFor="languages-native-label-placeholder"
                      >
                        Project Language
                      </InputLabel> */}
                      <NativeSelect
                        value={state.selection}
                        onChange={handleLanguage}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{
                          name: "languages",
                          id: "languages-native-label-placeholder",
                        }}
                      >
                        <option value="" disabled>
                          {repo.analysis[0].language}
                        </option>
                        {repo.analysis.map((entry, index) => {
                          return (
                            <option value={index}>{entry.language}</option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </DialogTitle>
                  <DialogContent>
                    {mode == "employer" ? (
                      <EmployerAnalysisTable
                        language={
                          state.language == null
                            ? repo.analysis[0].language
                            : state.language
                        }
                        data={state.analysis}
                        score={
                          state.score == null
                            ? repo.analysis[0].score
                            : state.score
                        }
                      />
                    ) : (
                      <AnalysisTable
                        language={
                          state.language == null
                            ? repo.analysis[0].language
                            : state.language
                        }
                        data={state.analysis}
                        score={
                          state.score == null
                            ? repo.analysis[0].score
                            : state.score
                        }
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <Divider />
                <Typography variant="subtitle1">{repo.score}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.myPaper} elevation={2}>
                Project Size
                <IconButton size="medium">
                  <WidgetsIcon style={{ fontSize: 18 }} />
                </IconButton>
                <Divider />
                <Typography variant="subtitle1">{repo.projectSize}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.myPaper} elevation={2}>
                Keywords
                <Divider />
                <div className={classes.root}>
                  {repo.topics.map((topic) => {
                    return (
                      <Chip
                        icon={<VpnKeyRoundedIcon />}
                        label={topic}
                        variant="outlined"
                        size="small"
                        clickable
                        color="secondary"
                      ></Chip>
                    );
                  })}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {mode == "employer" ? (
            ""
          ) : (
            <Tooltip title="Delete Project">
              <IconButton onClick={handleDelete}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          )}

          {mode == "employer" ? (
            ""
          ) : (
            <input
              accept="image/*"
              className={classes.input}
              id={img_id}
              multiple
              type="file"
              onChange={handlePictureChange}
            />
          )}

          {mode == "employer" ? (
            ""
          ) : (
            <label htmlFor={img_id}>
              <Tooltip title="Change Project Image">
                <IconButton component="span">
                  <ImageIcon />
                </IconButton>
              </Tooltip>
            </label>
          )}
        </CardActions>
        {/* ---------------------------- Card Content End ---------------------------- */}
      </Card>
    </Grid>
  );
}

ScoreCard.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onLoadImg: PropTypes.func.isRequired,
};

export default ScoreCard;
