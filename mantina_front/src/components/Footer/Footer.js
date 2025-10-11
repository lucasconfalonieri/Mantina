/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import {FaTwitter, FaFacebook, FaInstagram} from 'react-icons/fa'

import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (

    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.center}>
            <a href="http://www.twitter.com/mantinacom/">
                <FaTwitter color="white" size={28} className={classes.social_icon} />
            </a>

            <a href="https://www.facebook.com/Mantina-1088787471147590/">
              <FaFacebook color="white" size={28} className={classes.social_icon} />
            </a>

            <a href="http://www.instagram.com/mantinacom/">
              <FaInstagram color="white" size={28} className={classes.social_icon} />
            </a>

            <p className={classes.info}>
              <span>
                &copy; {1900 + new Date().getYear()}{" "}
                Todos los derechos reservados
              </span>
            </p>
        </div>
      </div>
    </footer>
  );
}
