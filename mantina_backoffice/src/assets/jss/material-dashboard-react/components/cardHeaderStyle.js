import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  whiteColor
} from "assets/jss/material-dashboard-react.js";

const cardHeaderStyle = (theme, params, classes) => ({
  cardHeader: {
    padding: "0.75rem 1.25rem",
    marginBottom: "0",
    borderBottom: "none",
    background: "transparent",
    zIndex: "3 !important",
    [`&.${classes.cardHeaderPlain}, &.${classes.cardHeaderIcon}, &.${classes.cardHeaderStats}, &.${classes.warningCardHeader}, &.${classes.successCardHeader}, &.${classes.dangerCardHeader}, &.${classes.infoCardHeader}, &.${classes.primaryCardHeader}, &.${classes.roseCardHeader}`]: {
      margin: "0 15px",
      padding: "0",
      position: "relative",
      color: whiteColor
    },
    "&:first-child": {
      borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
    },
    [`&.${classes.warningCardHeader}, &.${classes.successCardHeader}, &.${classes.dangerCardHeader}, &.${classes.infoCardHeader}, &.${classes.primaryCardHeader}, &.${classes.roseCardHeader}`]: {
      [`&:not(.${classes.cardHeaderIcon})`]: {
        borderRadius: "3px",
        marginTop: "-20px",
        padding: "15px"
      }
    },
    [`&.${classes.cardHeaderStats} svg`]: {
      fontSize: "36px",
      lineHeight: "56px",
      textAlign: "center",
      width: "36px",
      height: "36px",
      margin: "10px 10px 4px"
    },
    [`&.${classes.cardHeaderStats} i, &.${classes.cardHeaderStats} .material-icons`]: {
      fontSize: "36px",
      lineHeight: "56px",
      width: "56px",
      height: "56px",
      textAlign: "center",
      overflow: "unset",
      marginBottom: "1px"
    },
    [`&.${classes.cardHeaderStats}.${classes.cardHeaderIcon}`]: {
      textAlign: "right"
    }
  },
  cardHeaderPlain: {
    marginLeft: "0px !important",
    marginRight: "0px !important"
  },
  cardHeaderStats: {
    [`& .${classes.cardHeaderIcon}`]: {
      textAlign: "right"
    },
    "& h1,& h2,& h3,& h4,& h5,& h6": {
      margin: "0 !important"
    }
  },
  cardHeaderIcon: {
    [`&.${classes.warningCardHeader}, &.${classes.successCardHeader}, &.${classes.dangerCardHeader}, &.${classes.infoCardHeader}, &.${classes.primaryCardHeader}, &.${classes.roseCardHeader}`]: {
      background: "transparent",
      boxShadow: "none"
    },
    "& i,& .material-icons": {
      width: "33px",
      height: "33px",
      textAlign: "center",
      lineHeight: "33px"
    },
    "& svg": {
      width: "24px",
      height: "24px",
      textAlign: "center",
      lineHeight: "33px",
      margin: "5px 4px 0px"
    }
  },
  warningCardHeader: {
    color: whiteColor,
    [`&:not(.${classes.cardHeaderIcon})`]: {
      ...warningCardHeader
    }
  },
  successCardHeader: {
    color: whiteColor,
    [`&:not(.${classes.cardHeaderIcon})`]: {
      ...successCardHeader
    }
  },
  dangerCardHeader: {
    color: whiteColor,
    [`&:not(.${classes.cardHeaderIcon})`]: {
      ...dangerCardHeader
    }
  },
  infoCardHeader: {
    color: whiteColor,
    [`&:not(.${classes.cardHeaderIcon})`]: {
      ...infoCardHeader
    }
  },
  primaryCardHeader: {
    color: whiteColor,
    [`&:not(.${classes.cardHeaderIcon})`]: {
      ...primaryCardHeader
    }
  },
  roseCardHeader: {
    color: whiteColor,
    [`&:not(.${classes.cardHeaderIcon})`]: {
      ...roseCardHeader
    }
  }
});

export default cardHeaderStyle;
