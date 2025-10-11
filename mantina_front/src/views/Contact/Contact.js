import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import {FaTwitter, FaFacebook, FaInstagram} from 'react-icons/fa'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { sendEmail } from '../../utils/api';

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

  social_icon: {
      marginTop: "16px",
      marginRight: "32px"
    },
};

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ContactForm() {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [msj, setMsj] = React.useState("");
  const [textError, setTextError] = React.useState("");

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [sendedForm, setSendedForm] = React.useState(false);

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpenSuccess(false);
        setSendedForm(false);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpenError(false);
        setSendedForm(false);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleMsj = (e) => {
        setMsj(e.target.value);
    }

    const handleSendEmail = () => {
      setSendedForm(true);

      if(email == "" && name == "" && msj == "") {
            setTextError("Todos los campos son requeridos.");
            setOpenError(true);
      } else {
          sendEmail(JSON.stringify({"email": email, "name":name, "msj":msj }))
          .then(success => {
                setEmail("");
                setName("");
                setMsj("");
                setOpenSuccess(true);
          })
          .catch(error => {
            setTextError("Se produjo un error al enviar el email.");
            setOpenError(true);
          });
     }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Contactanos!</h4>
              <p className={classes.cardCategoryWhite}>Dejanos tu mensaje y a la brevedad te responderemos</p>

                <a href="http://www.twitter.com/mantinacom/">
                    <FaTwitter color="white" size={28} className={classes.social_icon} />
                </a>

                <a href="https://www.facebook.com/Mantina-1088787471147590/">
                  <FaFacebook color="white" size={28} className={classes.social_icon} />
                </a>

                <a href="http://www.instagram.com/mantinacom/">
                  <FaInstagram color="white" size={28} className={classes.social_icon} />
                </a>
            </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    label="Nombre"
                    id="name_form"
                    value={name}
                    onChange={handleName}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    autoFocus
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                 <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      label="Email"
                      id="email_form"
                      value={email}
                      onChange={handleEmail}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </GridItem>
              </GridContainer>
              <GridContainer>
                 <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      label="Consulta"
                      id="question_form"
                      value={msj}
                      onChange={handleMsj}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      required
                    />
                  </GridItem>
              </GridContainer>
            </CardBody>

            <CardFooter>
              <Button disabled={sendedForm} onClick={handleSendEmail} color="info">Enviar consulta</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <Snackbar
           anchorOrigin={{
              vertical: "center",
              horizontal: "center"
           }}
           open={openError} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error">
            { textError }
          </Alert>
      </Snackbar>

      <Snackbar
            anchorOrigin={{
                vertical: "center",
                horizontal: "center"
            }}
            open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
          <Alert onClose={handleCloseSuccess} severity="success">
            Email enviado con éxito.
          </Alert>
      </Snackbar>
    </div>
  );
}
