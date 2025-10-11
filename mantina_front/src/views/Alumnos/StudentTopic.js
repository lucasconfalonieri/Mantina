import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Icon from "@material-ui/core/Icon";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const StudentTopic = ({ name, id_studentTopics}) => {
  const classes = useStyles();

  return (
    <GridItem xs={12} sm={12} md={4}>
        <Link to={'/alumnos/contenidos/' + id_studentTopics }>
            <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Icon>content_copy</Icon>
                  </CardIcon>
                    <p className={classes.cardTitle}> {name} </p>
                </CardHeader>
            </Card>
        </Link>
    </GridItem>
  );
};

export default StudentTopic;