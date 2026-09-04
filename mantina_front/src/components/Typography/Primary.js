import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "tss-react/mui";
// core components
import styles from "assets/jss/material-dashboard-react/components/typographyStyle.js";

const useStyles = makeStyles()(styles);

export default function Primary(props) {
  const { classes } = useStyles();
  const { children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.primaryText}>
      {children}
    </div>
  );
}

Primary.propTypes = {
  children: PropTypes.node
};
