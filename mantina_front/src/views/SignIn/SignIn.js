import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import { postLogin } from '../../utils/api';
import CardHeader from "components/Card/CardHeader.js";
import Icon from "@mui/material/Icon";
import loginImage from "../../assets/img/loginimg.png";

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

export default function SignIn() {
  const { classes } = useStyles();

  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeUser = (event) => {
    setUser(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    postLogin(JSON.stringify({ 'user': user, 'password': password })).then(response => {
      localStorage.setItem("token", JSON.stringify(response.data.auth.token));
      localStorage.setItem("setupTime", new Date().getTime());
      localStorage.setItem("showTreeView", false);
      localStorage.setItem("iconLayout", "account_tree");
      localStorage.setItem("user", user);

      window.location.replace("/");
    })
      .catch(error => {
        // do something with the error (report it, etc.)
      });

    event.preventDefault();
  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <CardHeader color="warning" className="center-content">
          <h4 className={classes.cardTitleWhite}>CICLO LECTIVO 2024</h4>
          <img src={loginImage}alt=""/>
        </CardHeader>

        <br />
        <br />

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
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChangePassword}
          />
          <a href ='/recuperarcontrasena' 
          >
            Olvide Contraseña
          </a>
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
    </Container>
  );
}