import React , { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';

import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import AddIcon from "@mui/icons-material/Add";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { saveTema, updateTema } from '../../utils/api';
import PropTypes from "prop-types";

const useTemaStyle = makeStyles()(() => ({
    addButton: {marginTop: '1.6em'}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AgregarTema = (props) => {
    const { classes: temaStyle } = useTemaStyle();
    const [nombreTema, setNombreTema] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const { name, id_subject, id_topic } = props;

  const editDialog = (e) => {
      if(name != null) {
        handleClickOpen();
      }
  };

  useEffect(() => {
    initTitle();
    editDialog();
  });

    const redirectToTemas = (e) => {
        window.location.replace("/temas/" + id_subject);
    };

    const handleTextFieldChange = (e) => {
        setNombreTema(e.target.value);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      redirectToTemas();
    };

    const initTitle = () => {
        if(name != null) {
            setTitle("Editar tema");
        } else {
            setTitle("Agregar tema");
        }
    }

    const sendPostAndHandleClose = () => {
        if (name != null) {
            updateTema(id_topic, (JSON.stringify({"idSubject":id_subject, "name": nombreTema})))
                .then(success => {
                    handleClose();
                })
                .catch(error => {
                    alert("Hubo un error al editar tu tema.")
                });
        } else {
            saveTema(JSON.stringify({"idSubject":id_subject, "name": nombreTema}))
            .then(success => {
                handleClose();
            })
            .catch(error => {
                alert("Hubo un error al guardar tu tema.")
            });
        }
    }

    return (
        <div >
            <GridItem xs={12} sm={12} md={1}>
                <Button onClick={handleClickOpen} className={temaStyle.addButton} justIcon="true" size="lg" color="info" round><AddIcon /> </Button>
            </GridItem>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>

                <DialogContent>
                  <TextField
                      autoFocus
                      margin="dense"
                      id="topic_name"
                      label="Nombre de tema"
                      type="text"
                      fullWidth
                      placeholder={name}
                      onChange={handleTextFieldChange}
                    />
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancelar
                  </Button>
                  <Button onClick={sendPostAndHandleClose} color="primary">
                    Confirmar
                  </Button>
                </DialogActions>
              </Dialog>
        </div>
    );
};

AgregarTema.propTypes = {
  name: PropTypes.string,
  id_subject: PropTypes.string,
  id_topic: PropTypes.string
};

export default AgregarTema;