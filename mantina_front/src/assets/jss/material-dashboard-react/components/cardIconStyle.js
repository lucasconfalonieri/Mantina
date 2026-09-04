import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  grayColor
} from "assets/jss/material-dashboard-react.js";

const cardIconStyle = (theme, params, classes) => ({
  cardIcon: {
    [`&.${classes.warningCardHeader}, &.${classes.successCardHeader}, &.${classes.dangerCardHeader}, &.${classes.infoCardHeader}, &.${classes.primaryCardHeader}, &.${classes.roseCardHeader}`]: {
      borderRadius: "3px",
      backgroundColor: grayColor[0],
      padding: "15px",
      marginTop: "-20px",
      marginRight: "15px",
      float: "left"
    }
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader
});

export default cardIconStyle;
