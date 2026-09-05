import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from 'tss-react/mui';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Icon from "@mui/material/Icon";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { deleteContenido } from '../../utils/api';
import * as ServerErrorCode from '../../utils/ServerErrorCode.js';

const useStyles = makeStyles()(styles);

const useContenidoStyle = makeStyles()(() => ({
    imgSize: {width: '80px'}
}));

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Contenido = ({ text_pdf, name_pdf, id_content_topic, id_topic }) => {
    const { classes } = useStyles();
    const { classes: contenidoStyle } = useContenidoStyle();

    const [severityAlert, setSeverityAlert] = React.useState("");
    const [msgAlert, setMsgAlert] = React.useState("");
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpenAlert(false);
    };

    const handleOnClickRemove = (e) => {
      deleteContenido(id_content_topic)
      .then(success => {
          setSeverityAlert("success");
          setMsgAlert("Contenido borrado con éxito.");
          setOpenAlert(true);

          setTimeout(function() {
              window.location.reload();
          }.bind(this), 1800);
      })
      .catch(error => {
          const errorCode = error.response.status;

          setSeverityAlert("error");
          setMsgAlert("Se produjo un error: " + error.response.status);
          setOpenAlert(true);
      });
    };

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Link to={'/visor/' + name_pdf }>
                <Card>
                    <CardHeader color="success" stats icon>
                        <CardIcon color="success">
                            <Icon>done</Icon>
                        </CardIcon>

                    <Link to={{
                        pathname: "/editarContenido",
                        state: {
                            id_content_topic: id_content_topic,
                            name_pdf:name_pdf,
                            text_pdf:text_pdf,
                            id_topic: id_topic
                        }
                    }}>
                        <Icon color="disabled">edit</Icon>
                    </Link>

                    <Link to={{
                        pathname: "/contenidos/" + id_topic
                        }}>
                        <Icon onClick={handleOnClickRemove} color="disabled">cancel</Icon>
                    </Link>

                    <p className={classes.cardTitle}>{text_pdf}</p>
                    </CardHeader>
                </Card>
            </Link>

            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={severityAlert}>
                     {msgAlert}
                </Alert>
            </Snackbar>
        </GridItem>
        );
    };

export default Contenido;