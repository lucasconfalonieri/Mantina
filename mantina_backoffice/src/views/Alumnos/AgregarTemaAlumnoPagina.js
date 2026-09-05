import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';


import { getUsers, saveStudentTopic, editStudentTopic, getUsersPrivilegesStudentTopic } from '../../utils/api';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "350",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  privilegesPosition: {
    marginBottom: "32px",
    marginLeft: "32px",
    marginRight: "32px",
  },

  social_icon: {
    marginTop: "16px",
    marginRight: "32px"
  },
};

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AgregarTemaAlumnoPagina() {

  const { id_studenttopic, name } = useParams();

  const classes = useStyles();

  const [usersDB, setUsers] = React.useState([]);
  const [usersSelectedPost, setUserSelected] = React.useState([]);

  const [name_topic, setName] = React.useState("");

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [sendedForm, setSendedForm] = React.useState(false);
  const [textError, setTextError] = React.useState("");
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
    setSendedForm(false);
    window.location.href = "/alumnos";
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
    setSendedForm(false);
  };

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleConfirm = () => {
    setSendedForm(true);

    if (name_topic == "") {
      setTextError("Todos los campos son requeridos.");
      setOpenError(true);
    } else {
      if (usersSelectedPost.length == 0) {
        setTextError("Debes seleccionar las personas que tienen permisos para el tema.");
        setOpenError(true);
      }
      else {
        if (id_studenttopic == null) {
          saveStudentTopic(JSON.stringify({ "name": name_topic, "users": usersSelectedPost }))
            .then(success => {
              setName("");
              setUserSelected([]);
              setOpenSuccess(true);
            })
            .catch(error => {
              setTextError("Se produjo un error al intentar guardar los datos.");
              setOpenError(true);
            });
        } else {
          editStudentTopic(id_studenttopic, JSON.stringify({ "name": name_topic, "users": usersSelectedPost }))
            .then(success => {
              setName("");
              setUserSelected([]);
              setOpenSuccess(true);
            })
            .catch(error => {
              setTextError("Se produjo un error al intentar guardar los datos.");
              setOpenError(true);
            });
        }
      }
    }
  }

  const handleDeselectAll = () => {
    setUserSelected([]);
    const aux = usersDB.map(users => (
      {
        id_user: users.id_user,
        name: users.name,
        has_privileges: false
      }
    ));
    setUsers(aux);
    console.log(usersSelectedPost);
  }

  const handleSelectAll = () => {
    setUserSelected([]);
    const aux = usersDB.map(users => (
      {
        id_user: users.id_user,
        name: users.name,
        has_privileges: true
      }
    ));
    setUserSelected(usersDB.map(x => { return x.id_user.toString() }));
    setUsers(aux);
    console.log(usersSelectedPost);
  }

  const handleCheckBoxChange = ({ target }) => {
    const aux = usersDB.map(users => (
      {
        id_user: users.id_user,
        name: users.name,
        has_privileges: users.has_privileges
      }
    ));

    var item = usersDB.map(users => {
      return users.id_user
    }).indexOf(parseInt(target.name));

    aux[item].has_privileges = !aux[item].has_privileges;

    setUsers(aux);

    if (target.checked) {
      usersSelectedPost.push(target.name);
    } else {
      removeElement(usersSelectedPost, target.name);
    }
  }

  function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  useEffect(() => {

    if (id_studenttopic == null) {
      if (usersDB.length == 0) {
        getUsers()
          .then(json => {
            setUsers(json.data.users);
          })
          .catch(error => {
            // do something with the error (report it, etc.)
          });
      }
    } else {
      if (usersDB.length == 0) {
        setName(name);
        getUsersPrivilegesStudentTopic(id_studenttopic)
          .then(json => {
            let usersPrivileges = json.data.usersPrivileges;
            setUsers(usersPrivileges);

            return usersPrivileges;
          }).then(allUsersPrivileges => {

            allUsersPrivileges.map(user => {

              if (user.has_privileges == true) {
                usersSelectedPost.push(user.id_user.toString());
              }
            }

            )
          })
          .catch(error => {
            // do something with the error (report it, etc.)
          });

      }
    }
  }, []);

  function renderUsers() {
    return usersDB.map(users => (
      <FormControlLabel
        control={
          <Checkbox
            id={"usercheckbox_" + users.id_user}
            name={users.id_user}
            color="secondary"
            onClick={handleCheckBoxChange}
            checked={users.has_privileges}
          />
        }
        label={users.name}
      />
    ));

  };


  const handleBack = (e) => {
    window.history.back();
};

return (
<div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Agregar Tema</h4>
            </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Nombre"
                    id="name_form"
                    value={name_topic}
                    onChange={handleName}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    autoFocus
                  />
                </GridItem>
              </GridContainer>
            </CardBody>

            <div className={classes.privilegesPosition}>
              <h4>¿Quienes pueden ver este contenido?</h4>
              <Button onClick={handleSelectAll} color="rose">Marcar todos</Button>
              <Button onClick={handleDeselectAll} color="gray">Demarcar todos</Button>
              <br />
              <br />
              <FormGroup row>
                {renderUsers()}
              </FormGroup>
            </div>

            <CardFooter>
              <Button disabled={sendedForm} onClick={handleConfirm} color="info">Aceptar</Button>
              <Button color="gray" onClick={handleBack}>Volver</Button>
            </CardFooter>

          </Card>
        </GridItem>
      </GridContainer>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {textError}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>

        <Alert onClose={handleCloseSuccess} severity="success">
          Datos guardados con éxito.
          </Alert>

      </Snackbar>
    </div>
  );
}