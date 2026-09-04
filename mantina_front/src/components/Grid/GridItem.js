import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "tss-react/mui";
import Grid from "@mui/material/Grid";

const styles = {
  grid: {
    padding: "0 15px !important"
  }
};

const useStyles = makeStyles()(styles);

export default function GridItem(props) {
  const { classes } = useStyles();
  const { children, xs, sm, md, lg, xl, ...rest } = props;
  const size = {};
  if (xs !== undefined) size.xs = xs;
  if (sm !== undefined) size.sm = sm;
  if (md !== undefined) size.md = md;
  if (lg !== undefined) size.lg = lg;
  if (xl !== undefined) size.xl = xl;
  return (
    <Grid size={size} {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node
};
