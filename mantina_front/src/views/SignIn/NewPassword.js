import React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { insertNewPassword } from '../../utils/api';
import MuiAlert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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

export default function NewPassword() {
  const { user, hash } = useParams();
  const classes = useStyles();

  const [password, setPassword] = React.useState("");
  const [secondPassword, setSecondPassword] = React.useState("");

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [textError, setTextError] = React.useState("");

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
 }

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleChangeSecondPassword = (event) => {
    setSecondPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    insertNewPassword(JSON.stringify({ 'user': user, 'password': password }), hash).then(success => {
      setOpenSuccess(true);
      window.location.replace("/login");
    })
    .catch(error => {
      setTextError("Se produjo un error al intentar cambiar la contraseña.");
      setOpenError(true);
    });

      event.preventDefault();
    }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <br/>
        <br/>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          MANTINA
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChangePassword}
          />

<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Repetir Contraseña"
            type="password"
            id="secondpassword"
            autoComplete="current-password"
            value={secondPassword}
            onChange={handleChangeSecondPassword}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Confirmar nueva contraseña
          </Button>
        </form>
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
          Te acabamos de enviar un mail a tu casilla, por favor revisalo para continuar con el reseteo de la contraseña.
          </Alert>

      </Snackbar>
      </div>
    </Container>
  );
}