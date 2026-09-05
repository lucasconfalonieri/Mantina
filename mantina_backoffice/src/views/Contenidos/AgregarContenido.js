import React, { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';

import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import AddIcon from "@mui/icons-material/Add";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Input from "@mui/material/Input";
import PropTypes from "prop-types";
import LinearProgress from '@mui/material/LinearProgress';


import { saveAllContent, editContentPdf, editContentText } from '../../utils/api';

const useContenidoStyle = makeStyles()(() => ({
  addButton: { marginTop: '1.6em' },
  removeText: { color: 'transparent' },
  addText: { color: 'black' }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AgregarContenido = (props) => {
  const { classes: contenidoStyle } = useContenidoStyle();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const { id_content_topic, name_pdf, text_pdf, id_topic } = props;

  const [textoPdf, setTextoPdf] = React.useState(text_pdf);
  const [nombrePdf, setNombrePdf] = React.useState(null);

  const [navClicked, setNavClicked] = React.useState(false);

  const editDialog = (e) => {
    if (text_pdf != null) {
      handleClickOpen();
    }
  };

  useEffect(() => {
    initTitle();
    editDialog();
  });

  const redirectToContenidos = (e) => {
    window.location.replace("/contenidos/" + id_topic);
  };

  const handleTextFieldChange = (e) => {
    setTextoPdf(e.target.value);
  };

  const handlePdfFieldChange = (e) => {
    e.preventDefault();
    e.target.files[0] == null ? setNombrePdf(null) : setNombrePdf(e.target.files[0]);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    redirectToContenidos();
  };

  const initTitle = () => {
    if (text_pdf != null) {
      setTitle("Editar contenido");
    } else {
      setTitle("Agregar contenido");
    }
  }

  const sendPostAndHandleClose = () => {
    setNavClicked(true);
    //Estamos editando
    if (text_pdf != null) {
      let editOk = true;
      let msgError = "";

      if (nombrePdf != null) {
        editContentPdf(id_content_topic, nombrePdf)
          .then(success => {
          })
          .catch(error => {
            editOk = false;
            msgError += "Error al editar el PDF. "
          });
      }

      if (textoPdf != text_pdf && textoPdf != null) {
        editContentText(id_content_topic, (JSON.stringify({ "textPdf": textoPdf })))
          .then(success => {
          })
          .catch(error => {
            editOk = false;
            msgError += "Error al editar el texto. "
          });
      }

      setTimeout(function () {
        if (editOk) {
          handleClose();
        } else {
          alert(msgError);
        }
      }.bind(this), 5000)
    } else {
      saveAllContent(id_topic, nombrePdf, textoPdf)
        .then(success => {
          handleClose();
        })
        .catch(error => {
          alert("Hubo un error al guardar tu contenido.")
        });
    }
  }

  return (
    <div >
      <GridItem xs={12} sm={12} md={1}>
        <Button onClick={handleClickOpen} className={contenidoStyle.addButton} justIcon="true" size="lg" color="rose" round><AddIcon /> </Button>
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
            id="textPdf"
            label="Contenido"
            title="hola"
            type="text"
            fullWidth
            placeholder={text_pdf}
            onChange={handleTextFieldChange}
          />

          <p>Seleccionar pdf</p>
          <Input
            className={(nombrePdf == null ? contenidoStyle.removeText : contenidoStyle.addText)}
            inputProps={{ accept: "application/pdf" }}
            id="namePdf"
            label="Archivo PDF"
            type="file"
            fullWidth
            onChange={handlePdfFieldChange}
          />

        </DialogContent>

        <DialogActions>
          <Button disabled={navClicked} onClick={handleClose} color="primary">
            Cancelar
                  </Button>
          <Button disabled={navClicked} onClick={sendPostAndHandleClose} color="primary">
            Confirmar
                  </Button>
        </DialogActions>

        {navClicked && <LinearProgress id="progress" color="secondary" />}

      </Dialog>
    </div>
  );
};

AgregarContenido.propTypes = {
  id_content_topic: PropTypes.string,
  id_topic: PropTypes.string,
  name_pdf: PropTypes.string,
  text_pdf: PropTypes.string
};

export default AgregarContenido;