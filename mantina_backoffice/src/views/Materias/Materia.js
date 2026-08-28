import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Icon from "@material-ui/core/Icon";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import AgregarMateria from 'views/Materias/AgregarMateria.js';
import { deleteMateria } from '../../utils/api';
import * as ServerErrorCode from '../../utils/ServerErrorCode.js';

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Materia = ({ name, id_subject }) => {
  const classes = useStyles();

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
        deleteMateria(id_subject)
        .then(success => {
            setSeverityAlert("success");
            setMsgAlert("Materia borrada con éxito.");
            setOpenAlert(true);

            setTimeout(function() {
                window.location.reload();
            }.bind(this), 1800);
        })
        .catch(error => {
            const errorCode = error.response.status;

            setSeverityAlert("error");
            if(errorCode == ServerErrorCode.ERROR_HAS_CONTENT) {
                setMsgAlert("Esta materia contiene temas. Para poder borrarla, deberás borrar primero todo su contenido.");
            } else {
                setMsgAlert("Se produjo un error: " + error.response.status);
            }
            setOpenAlert(true);
        });
    };

  return (
    <GridItem xs={12} sm={12} md={4}>
        <Link to={'/temas/' + id_subject }>
            <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Icon>content_copy</Icon>
                  </CardIcon>

                    <Link to={{
                        pathname: "/editarMateria",
                        state: { name: name,
                        id_subject: id_subject },
                    }}>
                        <Icon color="disabled">edit</Icon>
                    </Link>

                    <Link to={{
                        pathname: "/materias"
                    }}>
                        <Icon onClick={handleOnClickRemove} color="disabled">cancel</Icon>
                    </Link>

                    <p className={classes.cardTitle}> {name} </p>
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

export default Materia;