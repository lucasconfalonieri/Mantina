import React , { useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import AddIcon from "@material-ui/icons/Add";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { saveSubtema, updateSubtema } from '../../utils/api';
import PropTypes from "prop-types";

const useSubtemaStyle = makeStyles(() => ({
    addButton: {marginTop: '1.6em'}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AgregarSubtema = (props) => {
  const subtemaStyle = useSubtemaStyle();
  const [nombreSubtema, setNombreSubtema] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const { name, id_topic, id_subtopic } = props;

  const editDialog = (e) => {
      if(name != null) {
        handleClickOpen();
      }
  };

  useEffect(() => {
    initTitle();
    editDialog();
  });

    const redirectToSubtemas = (e) => {
        window.location.replace("/subtemas/" + id_topic);
    };

    const handleTextFieldChange = (e) => {
        setNombreSubtema(e.target.value);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      redirectToSubtemas();
    };

    const initTitle = () => {
        if(name != null) {
            setTitle("Editar subtema");
        } else {
            setTitle("Agregar subtema");
        }
    }

    const sendPostAndHandleClose = () => {
        if (name != null) {
            updateSubtema(id_subtopic, (JSON.stringify({"idTopic":id_topic, "name": nombreSubtema})))
                .then(success => {
                    handleClose();
                })
                .catch(error => {
                    alert("Hubo un error al editar tu subtema.")
                });
        } else {
            saveSubtema(JSON.stringify({"idTopic":id_topic, "name": nombreSubtema}))
            .then(success => {
                handleClose();
            })
            .catch(error => {
                alert("Hubo un error al guardar tu subtema.")
            });
        }
    }

    return (
        <div >
            <GridItem xs={12} sm={12} md={1}>
                <Button onClick={handleClickOpen} className={subtemaStyle.addButton} justIcon="true" size="lg" color="rose" round><AddIcon /> </Button>
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
                      label="Nombre de subtema"
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

AgregarSubtema.propTypes = {
  name: PropTypes.string,
  id_topic: PropTypes.string,
  id_subtopic: PropTypes.string
};

export default AgregarSubtema;