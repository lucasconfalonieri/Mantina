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
import { saveMateria, updateMateria } from '../../utils/api';
import PropTypes from "prop-types";

const useMateriaStyle = makeStyles()(() => ({
    addButton: {marginTop: '1.6em'}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AgregarMateria = (props) => {
  const { classes: materiaStyle } = useMateriaStyle();
  const [nombreMateria, setNombreMateria] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const { name, id_subject } = props;

  const editDialog = (e) => {
      if(name != null) {
        handleClickOpen();
      }
  };

  useEffect(() => {
    initTitle();
    editDialog();
  });

    const redirectToMaterias = (e) => {
        window.location.replace("/materias");
    };

    const handleTextFieldChange = (e) => {
        setNombreMateria(e.target.value);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      redirectToMaterias();
    };

    const initTitle = () => {
        if(name != null) {
            setTitle("Editar materia");
        } else {
            setTitle("Agregar materia");
        }
    }

    const sendPostAndHandleClose = () => {
        if (name != null) {
            updateMateria(id_subject, (JSON.stringify({"name": nombreMateria})))
                .then(success => {
                    handleClose();
                })
                .catch(error => {
                    alert("Hubo un error al editar tu materia.")
                });

        } else {
            saveMateria(JSON.stringify({"name": nombreMateria}))
            .then(success => {
                handleClose();
            })
            .catch(error => {
                alert("Hubo un error al guardar tu materia.")
            });
        }
    }

    return (
        <div >
            <GridItem xs={12} sm={12} md={1}>
                <Button onClick={handleClickOpen} className={materiaStyle.addButton} justIcon="true" size="lg" color="warning" round><AddIcon /> </Button>
            </GridItem>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">

                <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>

                <DialogContent>
                  <TextField
                      autoFocus
                      margin="dense"
                      id="subject_name"
                      label="Nombre de materia"
                      type="text"
                      fullWidth
                      placeholder={name}
                      onChange={handleTextFieldChange} />
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

AgregarMateria.propTypes = {
  name: PropTypes.string,
  id_subject: PropTypes.string
};

export default AgregarMateria;