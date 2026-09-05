import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import { postLogin } from '../../utils/api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function SignIn() {
  const { classes } = useStyles();

  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [textError, setTextError] = React.useState("");
  const [openError, setOpenError] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleChangeUser = (event) => {
       setUser(event.target.value);
  }

  const handleChangePassword = (event) => {
          setPassword(event.target.value);
    }

  const handleSubmit = (event) => {
        postLogin(JSON.stringify({'user':user, 'password' : password})).then(response => {
            localStorage.setItem("token", JSON.stringify(response.data.auth.token));
            localStorage.setItem("setupTime", new Date().getTime())
            window.location.replace("/");
      })
      .catch(error => {
        setTextError("Usuario y/o Contraseña inválidas.");
        setOpenError(true);
      });

      event.preventDefault();
    }

    const handleCloseError = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenError(false);
    };
  
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          MANTINA - PANEL DE CARGA
        </Typography>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={openError} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error">
            {textError}
          </Alert>
        </Snackbar>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="Usuario"
            name="user"
            value={user}
            onChange={handleChangeUser}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"} // <-- This is where the magic happens
            id="password"
            autoComplete="current-password"
            value={password}
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}