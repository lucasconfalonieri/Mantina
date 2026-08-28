import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import { makeStyles } from "@material-ui/core/styles";

// components
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import AgregarTemaAlumnoPagina from "views/Alumnos/AgregarTemaAlumnoPagina.js";
import AgregarContenidoAlumnoPagina from "views/Alumnos/AgregarContenidoAlumnoPagina.js";
import ContenidoAlumnosPagina from "views/Alumnos/AlumnosContenidoPagina.js";
import AlumnosPagina from "views/Alumnos/AlumnosPagina.js";
import MateriasPagina from "views/Materias/MateriasPagina.js";
import TemasPagina from "views/Temas/TemasPagina.js";
import SubtemasPagina from "views/Subtemas/SubtemasPagina.js";
import ContenidosPagina from "views/Contenidos/ContenidosPagina.js";
import VisorPdfPagina from "views/PdfViewer/VisorPdfPagina.js";
import SignInPagina from "views/SignIn/SignIn.js";
import UsuariosPagina from "views/Usuarios/UsuariosPagina.js"
import AltaUsuariosPagina from "views/Usuarios/AltaUsuariosPagina.js"

import AuthRoute from "utils/AuthRoute.js";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


export default function App({ ...rest }) {
    const useStyles = makeStyles(styles);

    // styles
    const classes = useStyles();

    const logout = (e) => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const goToAlumnos = (e) => {
        window.location.href = "/alumnos";
    };

    const goToGeneral = (e) => {
        window.location.href = "/materias";
    };

    const goToUsuarios = (e) => {
        window.location.href = "/usuarios";
    };

    return (
        <div className={classes.wrapper}>
            <BrowserRouter>

                <AppBar position="static">
                    <Toolbar>

                        <Button className={classes.toolbarButton} color="inherit" onClick={goToGeneral}>CONTENIDO<br/>GENERAL</Button>
                        <Button className={classes.toolbarButton} color="inherit" onClick={goToAlumnos}>CONTENIDO<br/>ALUMNOS</Button>
                        <Button className={classes.toolbarButton} color="inherit" onClick={goToUsuarios}>USUARIOS</Button>

                        <Button className={classes.toolbarRight} onClick={logout} color="inherit">CERRAR SESION</Button>
                    </Toolbar>
                </AppBar>

                <div className={classes.content}>
                    <div className={classes.container}>
                        <Switch>
                            <AuthRoute path='/visor/:name_pdf' component={VisorPdfPagina} />

                            <AuthRoute path='/editarContenido/' component={ContenidosPagina} />
                            <AuthRoute path='/contenidos/:id_topic' component={ContenidosPagina} />

                            <AuthRoute path='/editarTema/' component={TemasPagina} />
                            <AuthRoute path='/temas/:id_subject' component={TemasPagina} />

                            <AuthRoute path='/eliminarMateria/' component={MateriasPagina} />
                            <AuthRoute path='/editarMateria/' component={MateriasPagina} />
                            <AuthRoute path='/materias' component={MateriasPagina} />

                            <AuthRoute path='/editarContenidoAlumno/:id_studenttopic/:id_studentcontent/:text_pdf' component={AgregarContenidoAlumnoPagina} />
                            <AuthRoute path='/agregarContenidoAlumno/:id_studenttopic' component={AgregarContenidoAlumnoPagina} />
                            <AuthRoute path='/contenidosAlumno/:id_studenttopic' component={ContenidoAlumnosPagina} />
                            <AuthRoute path='/editarTemaAlumno/:id_studenttopic/:name' component={AgregarTemaAlumnoPagina} />
                            <AuthRoute path='/agregarTemaAlumno' component={AgregarTemaAlumnoPagina} />
                            <AuthRoute path='/alumnos' component={AlumnosPagina} />

                            <AuthRoute path='/usuarios' component={UsuariosPagina} />
                            <AuthRoute path='/altaUsuarios' component={AltaUsuariosPagina} />
                            <AuthRoute path='/editarUsuario/:id_user' component={AltaUsuariosPagina} />
                            
                            <Route path='/login' component={SignInPagina} />
                            <Redirect from="/" to="/materias" />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}