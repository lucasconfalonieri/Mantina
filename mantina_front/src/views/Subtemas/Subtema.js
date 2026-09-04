import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from "tss-react/mui";

import Icon from "@mui/material/Icon";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles()(styles);

//Esto es un componente que recibe el tema
const Subtema = ({ name, id_subtopic }) => {
  const { classes } = useStyles();

  return (
    <GridItem xs={12} sm={12} md={4}>
        <Link to={'/contenidos/' + id_subtopic }>
            <Card>
                <CardHeader color="rose" stats icon>
                  <CardIcon color="rose">
                    <Icon>content_copy</Icon>
                  </CardIcon>
                    <p className={classes.cardTitle}> {name} </p>
                </CardHeader>
            </Card>
        </Link>
    </GridItem>
  );
};

export default Subtema;