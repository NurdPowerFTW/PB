import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Header(props) {
  const {
    classes,
    backgroundColor,
    link,
    linkTitle,
    linkStyle,
    buttonClass,
    buttonStyle,
    pageTitle,
  } = props;
  return (
    <AppBar
      className={classes.myAppBar}
      position="static"
      style={{ backgroundColor: backgroundColor }}
    >
      <Toolbar className={classes.toolbar}>
        {pageTitle == null ? (
          <Typography variant="h6" color="inherit" noWrap>
            Portfolio Builder
          </Typography>
        ) : (
          <Typography variant="h6" color="inherit" noWrap>
            Portfolio Builder {"- " + pageTitle}
          </Typography>
        )}
      </Toolbar>

      <Link className={linkStyle} to={link}>
        <IconButton
          className={buttonClass}
          style={buttonStyle}
          color="secondary"
          size="medium"
        >
          <ExitToAppIcon />
        </IconButton>
      </Link>
    </AppBar>
  );
}

export default Header;
