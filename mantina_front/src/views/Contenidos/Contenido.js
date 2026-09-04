import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from "tss-react/mui";

import Icon from "@mui/material/Icon";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles()(styles);
const useContenidoStyle = makeStyles(() => ({
    imgSize: {width: '100px', height: '100px'}
}));

const Contenido = ({ text_pdf, name_pdf }) => {
  const { classes } = useStyles();
  const contenidoStyle = useContenidoStyle();

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Link to={'/visor/' + name_pdf + "/" + text_pdf }>

                <Card>
                    <CardHeader color="success" stats icon>
                      <CardIcon color="success">
                        <Icon>done</Icon>
                      </CardIcon>

                      <CardBody>

                      </CardBody>
                        <p className={classes.cardTitle}>{text_pdf}</p>
                        <p className={classes.cardLinkCustom}>Ver</p>
                    </CardHeader>
                </Card>
            </Link>
        </GridItem>
        );
    };

export default Contenido;