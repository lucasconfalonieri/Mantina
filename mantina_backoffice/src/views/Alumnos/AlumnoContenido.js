import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Icon from "@material-ui/core/Icon";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { deleteStudentContent } from '../../utils/api';

const useStyles = makeStyles(styles);

const useContenidoStyle = makeStyles(() => ({
    imgSize: {width: '80px'}
}));

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlumnoContenido = ({ text_pdf, name_pdf, id_studentcontent, id_studenttopic , order}) => {
    const classes = useStyles();
    const contenidoStyle = useContenidoStyle();

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
    deleteStudentContent(id_studentcontent,order, id_studenttopic)
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
                <Card style={{ backgroundColor:'black'}}>
                    <CardHeader color="danger" stats icon>
                        <CardIcon color="danger">
                            <Icon>done</Icon>
                        </CardIcon>

                    <Link to={{
                        pathname: '/visor/' + name_pdf 
                    }}>
                        <Icon style={{ color:'white'}}>article</Icon>
                    </Link>

                    <Link to={{
                        pathname: "/editarContenidoAlumno/" + id_studenttopic + "/" +
                        id_studentcontent + "/" + text_pdf
                       
                    }}>
                        <Icon style={{ color:'white'}}>edit</Icon>
                    </Link>

                    <Link to={{
                        pathname: "/contenidosAlumno/" + id_studenttopic
                        }}>
                        <Icon onClick={handleOnClickRemove} style={{ color:'white'}}>cancel</Icon>
                    </Link>

                    <p className={classes.cardTitle} style={{ color:'white'}}>{text_pdf}</p>
                    </CardHeader>
                </Card>

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

export default AlumnoContenido;