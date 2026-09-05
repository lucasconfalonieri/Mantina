import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import { makeStyles } from 'tss-react/mui';

// components
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import AgregarTemaAlumnoPagina from "views/Alumnos/AgregarTemaAlumnoPagina.js";
import AgregarContenidoAlumnoPagina from "views/Alumnos/AgregarContenidoAlumnoPagina.js";
import ContenidoAlumnosPagina from "views/Alumnos/AlumnosContenidoPagina.js";
import AlumnosPagina from "views/Alumnos/AlumnosPagina.js";
import MateriasPagina from "views/Materias/MateriasPagina.js";
import TemasPagina from "views/Temas/TemasPagina.js";
import ContenidosPagina from "views/Contenidos/ContenidosPagina.js";
import VisorPdfPagina from "views/PdfViewer/VisorPdfPagina.js";
import SignInPagina from "views/SignIn/SignIn.js";
import UsuariosPagina from "views/Usuarios/UsuariosPagina.js"
import AltaUsuariosPagina from "views/Usuarios/AltaUsuariosPagina.js"

import AuthRoute from "utils/AuthRoute.js";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';


export default function App({ ...rest }) {
    const useStyles = makeStyles()(styles);

    // styles
    const { classes } = useStyles();

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
                        <Routes>
                            <Route path='/visor/:name_pdf' element={<AuthRoute><VisorPdfPagina /></AuthRoute>} />

                            <Route path='/editarContenido/' element={<AuthRoute><ContenidosPagina /></AuthRoute>} />
                            <Route path='/contenidos/:id_topic' element={<AuthRoute><ContenidosPagina /></AuthRoute>} />

                            <Route path='/editarTema/' element={<AuthRoute><TemasPagina /></AuthRoute>} />
                            <Route path='/temas/:id_subject' element={<AuthRoute><TemasPagina /></AuthRoute>} />

                            <Route path='/eliminarMateria/' element={<AuthRoute><MateriasPagina /></AuthRoute>} />
                            <Route path='/editarMateria/' element={<AuthRoute><MateriasPagina /></AuthRoute>} />
                            <Route path='/materias' element={<AuthRoute><MateriasPagina /></AuthRoute>} />

                            <Route path='/editarContenidoAlumno/:id_studenttopic/:id_studentcontent/:text_pdf' element={<AuthRoute><AgregarContenidoAlumnoPagina /></AuthRoute>} />
                            <Route path='/agregarContenidoAlumno/:id_studenttopic' element={<AuthRoute><AgregarContenidoAlumnoPagina /></AuthRoute>} />
                            <Route path='/contenidosAlumno/:id_studenttopic' element={<AuthRoute><ContenidoAlumnosPagina /></AuthRoute>} />
                            <Route path='/editarTemaAlumno/:id_studenttopic/:name' element={<AuthRoute><AgregarTemaAlumnoPagina /></AuthRoute>} />
                            <Route path='/agregarTemaAlumno' element={<AuthRoute><AgregarTemaAlumnoPagina /></AuthRoute>} />
                            <Route path='/alumnos' element={<AuthRoute><AlumnosPagina /></AuthRoute>} />

                            <Route path='/usuarios' element={<AuthRoute><UsuariosPagina /></AuthRoute>} />
                            <Route path='/altaUsuarios' element={<AuthRoute><AltaUsuariosPagina /></AuthRoute>} />
                            <Route path='/editarUsuario/:id_user' element={<AuthRoute><AltaUsuariosPagina /></AuthRoute>} />

                            <Route path='/login' element={<SignInPagina />} />
                            <Route path='*' element={<Navigate to="/materias" replace />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}