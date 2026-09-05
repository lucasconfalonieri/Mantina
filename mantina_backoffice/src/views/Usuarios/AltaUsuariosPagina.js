import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import { postRegister } from '../../utils/api';
import MuiAlert from '@mui/material/Alert';
import { TextField, InputAdornment, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from '@mui/material/Snackbar';

import { editUser } from '../../utils/api';

const useStyles = makeStyles()((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UsuariosPagina() {
  const { id_user } = useParams();
  // match -> parametro que viene en la URL
  // location -> parametros que vienen cuando armarmos el link to (desde usuarios pagina).
  const { state } = useLocation();
  const { nameResponse, emailResponse, isAdminResponse } = state || {};

  const { classes } = useStyles();

  const [email, setEmail] = React.useState(emailResponse);
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState(nameResponse);
  const [isAdmin, setIsAdmin] = React.useState(!!isAdminResponse);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [textError, setTextError] = React.useState("");
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleChangeName = (event) => {
    setName(event.target.value);
  }

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);

    if(id_user != null) {
      //Solo en el caso de estar modificando, volvemos al listado
      window.location.replace("/usuarios");
    }

  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  const handleSubmit = (event) => {
    var hasNoErrors = true;
    if (name.length > 0) {
      setNameError(false);
    } else {
      setNameError(true);
      hasNoErrors = false;
    }

    if (validateEmail()) {
      setEmailError(false);
    } else {
      setEmailError(true);
      hasNoErrors = false;
    }

    if (id_user == null) {
      //esta creando un nuevo usuario
      if (validateFormatPassword()) {
        setPasswordError(false);
      } else {
        setPasswordError(true);
        hasNoErrors = false;
      }

      if (hasNoErrors) {
        postRegister(JSON.stringify({ 'user': email, 'password': password, 'name': name, 'is_admin': isAdmin })).then(response => {
          setOpenSuccess(true);
          setPassword("");
          setEmail("");
          setName("");
          setIsAdmin(false);
        }).catch(error => {
          if (error.response.status == 903) {
            setTextError("El email ya se encuentra registado.");
          } else {
            setTextError("No se pudo guardar el usuario. Contacte a soporte.");
          }

          setOpenError(true);
        });
      }
    } else {
      // esta editando
      if (hasNoErrors) {
        editUser(id_user, JSON.stringify({ 'name': name, 'email': email, 'is_admin': isAdmin })).then(response => {
          setOpenSuccess(true);
          
          setEmail("");
          setName("");
        }).catch(error => {
          if (error.response.status == 903) {
            setTextError("El email ya se encuentra registado.");
          } else {
            setTextError("No se pudo modificar el usuario. Contacte a soporte.");
          }

          setOpenError(true);
        });
      }
    }

    event.preventDefault();
  }

  const validateFormatPassword = () => {
    const re = /^(?=\w*\d)\S{8,16}$/;
    return re.test(String(password));
  }

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
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
              {id_user != null ? "Usuario modificado con éxito." : "Usuario guardado con éxito."}
            </Alert>

          </Snackbar>
          <h2>
            {id_user != null ? "Modificar Usuario" : "Crear Usuario"}
          </h2>

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre y Apellido"
              name="name"
              value={name}
              onChange={handleChangeName}
              autoFocus
              error={nameError}
              helperText={nameError ? 'Debes ingresar un nombre y apellido.' : ' '}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              error={emailError}
              helperText={emailError ? 'Debes ingresar un email válido.' : ' '}
            />

            <TextField
              name="password"
              id="password"
              autoComplete="current-password"
              value={password}
              margin="normal"
              required={id_user != null ? false : true}
              fullWidth
              disabled={id_user != null ? true : false}
              label='Contraseña'
              variant="outlined"
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              onChange={handleChangePassword}
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={passwordError}
              helperText={passwordError ? 'La contraseña debe tener: minimo 8 caracteres y al menos 1 caracter numerico.' : ' '}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  color="primary"
                />
              }
              label="Es administrador (acceso al panel de carga)"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {id_user != null ? "Actualizar" : "Registrar"}
            </Button>
          </form>
        </div>

      </Container>

    </div>
  );
}
