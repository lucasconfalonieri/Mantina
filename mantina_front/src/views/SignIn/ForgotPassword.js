import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getForgotPassword } from '../../utils/api';
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

export default function ForgotPassword() {
  const classes = useStyles();

  const [user, setUser] = React.useState("");

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [textError, setTextError] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);

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

  const handleChangeUser = (event) => {
       setUser(event.target.value);
  }

  const handleSubmit = (event) => {
    if(validateEmail()){
      setEmailError(false);
    getForgotPassword(user).then(success => {
      setOpenSuccess(true);
      setUser("");
    })
    .catch(error => {
      setTextError("Se produjo un error al intentar enviar el email.");
      setOpenError(true);
    });

      
  }
  else{
    setEmailError(true);
  }

  event.preventDefault();
    }

  const validateEmail = () => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(user).toLowerCase());
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
            id="user"
            label="Ingrese su email"
            name="user"
            value={user}
            onChange={handleChangeUser}
            autoFocus
            error={emailError}
            helperText={emailError ? 'Debes ingresar un email válido.' : ' '}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Restablecer
          </Button>
        </form>
        <Snackbar
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {textError}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: "center",
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