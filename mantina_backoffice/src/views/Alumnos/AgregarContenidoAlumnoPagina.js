import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// @mui/material components
import { makeStyles } from 'tss-react/mui';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Input from "@mui/material/Input";


import { getUsersStudentContent, saveAllStudentContent, editStudentContentPdf, editStudentContentTextUsers, getUsersPrivilegesStudentContent } from '../../utils/api';

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

  removeText: {
    color: 'transparent'
  },

  addText: { color: 'black' }
};

const useStyles = makeStyles()(styles);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AgregarContenidoAlumnoPagina() {

  const { id_studenttopic, id_studentcontent, text_pdf } = useParams();

  const { classes } = useStyles();

  const [usersDB, setUsers] = React.useState([]);
  const [usersSelectedPost, setUserSelected] = React.useState([]);

  const [textoPdf, setTextoPdf] = React.useState(text_pdf);
  const [nombrePdf, setNombrePdf] = React.useState(null);

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
    setTextoPdf(e.target.value);
  }

  const handleConfirm = () => {
    setSendedForm(true);

    if (nombrePdf == "" || textoPdf == "") {
      setTextError("Todos los campos son requeridos.");
      setOpenError(true);
    } else {
      if (usersSelectedPost.length == 0) {
        setTextError("Debes seleccionar las personas que tienen permisos para el contenido.");
        setOpenError(true);
      }
      else {
        if (id_studentcontent == null) {
          saveAllStudentContent(id_studenttopic, nombrePdf, textoPdf, usersSelectedPost)
            .then(success => {
              setNombrePdf(null);
              setTextoPdf("");
              setUserSelected([]);
              setOpenSuccess(true);
            })
            .catch(error => {
              setTextError("Se produjo un error al intentar guardar los datos.");
              setOpenError(true);
            });
        } else {

          let editOk = true;
          let msgError = "";

          if (nombrePdf != null) {
            editStudentContentPdf(id_studentcontent, nombrePdf)
              .then(success => {
              })
              .catch(error => {
                editOk = false;
                msgError += "Error al editar el PDF. "
              });
          }
          console.log(usersSelectedPost);
          if (textoPdf != null && usersSelectedPost.length > 0) {
            console.log(usersSelectedPost);
            editStudentContentTextUsers(id_studentcontent, (JSON.stringify({ "textPdf": textoPdf, "users": usersSelectedPost, "idstudenttopics": id_studenttopic })))
              .then(success => {
              })
              .catch(error => {
                editOk = false;
                msgError += "Error al editar el texto. "
              });
          }

          setTimeout(function () {
            if (editOk) {
              setOpenSuccess(true);
            } else {
              setTextError(msgError);
              setOpenError(true);
            }
          }.bind(this), 5000)
        }
      }
    }
  }

  const handleDeselectAll = () => {
    setUserSelected([]);
    const aux = usersDB.map( users =>(
      {
        id_user : users.id_user,
        name : users.name,
        has_privileges : false
      }
        ));
     setUsers(aux);
  }

  const handleSelectAll = () => {
    setUserSelected([]);
    const aux = usersDB.map( users =>(
      {
        id_user : users.id_user,
        name : users.name,
        has_privileges : true
      }
        ));
        setUserSelected( usersDB.map(x => {return x.id_user.toString()}));
        setUsers(aux);
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

  const handlePdfFieldChange = (e) => {
    e.preventDefault();
    e.target.files[0] == null ? setNombrePdf(null) : setNombrePdf(e.target.files[0]);
  }

  function removeElement(array, elem) {
    debugger;
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  useEffect(() => {
    debugger;
    if (id_studentcontent == null) {
      if (usersDB.length == 0) {
        getUsersStudentContent(id_studenttopic)
          .then(json => {
            setUsers(json.data.users);
          })
          .catch(error => {
            // do something with the error (report it, etc.)
          });
      }
    } else {
      if (usersDB.length == 0) {
        setTextoPdf(textoPdf);
        getUsersPrivilegesStudentContent(id_studentcontent, id_studenttopic)
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
              <h4 className={classes.cardTitleWhite}>Agregar Contenido</h4>
            </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Nombre"
                    id="name_form"
                    value={textoPdf}
                    onChange={handleName}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    autoFocus
                  />
                </GridItem>
                <GridItem>
                  <p>Seleccionar pdf</p>
                  <Input
                    className={(nombrePdf == null ? styles.removeText : styles.addText)}
                    inputProps={{ accept: "application/pdf" }}
                    id="namePdf"
                    label="Archivo PDF"
                    type="file"
                    fullWidth
                    onChange={handlePdfFieldChange}
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