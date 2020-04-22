import React from 'react';
import Typography from "@material-ui/core/Typography";

function Footer(props) {
    const { classes, style } = props;
    return (
        <footer
            className={classes.footer}
            style={style}
        >
            <Typography variant="h6" align="center" gutterBottom>
                Portfolio Builder 2020
          </Typography>
            <Typography variant="subtitle1" align="center" component="p">
                Created by Codify <br /> @ University of Utah
          </Typography>
        </footer>
    )
}

export default Footer;