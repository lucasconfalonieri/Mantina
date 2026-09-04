import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import "assets/css/material-dashboard-react.css";
import { makeStyles } from "tss-react/mui";

// components
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import bgImage from "assets/img/portada.jpg";
import logo from "assets/img/apple-icon.png";
import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import MateriasPagina from "views/Materias/MateriasPagina.js";
import TemasPagina from "views/Temas/TemasPagina.js";
import ContenidosPagina from "views/Contenidos/ContenidosPagina.js";
import VisorPdfPagina from "views/PdfViewer/VisorPdfPagina.js";
import ContactoPagina from "views/Contact/Contact.js";
import QuienesSomosPagina from "views/QuienesSomos/QuienesSomosPagina.js"
import AlumnosPagina from "views/Alumnos/AlumnosPagina.js";
import AlumnosContenidosPagina from "views/Alumnos/AlumnosContenidosPagina.js";
import AlumnosVisorPdfPagina from "views/Alumnos/AlumnosVisorPdfPagina.js";

import SignInPagina from "views/SignIn/SignIn.js";
import AuthRoute from "utils/AuthRoute.js";
import ForgotPassword from "views/SignIn/ForgotPassword.js";
import NewPassword from "views/SignIn/NewPassword.js";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function App({ ...rest }) {
    let ps;

    const useStyles = makeStyles()(styles);

    const { classes } = useStyles();

    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();

    // states and functions
    const [image] = React.useState(bgImage);
    const [color] = React.useState("blue");
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const isLogin = () => {
        if(window.location.href.search("/login") != -1){
            return false;
        } else {
            return true;
        }
    };

    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        } else {
            setMobileOpen(true);
        }
    };

    const logout = (e) => {
        localStorage.removeItem("token");
        window.location.replace("/login");
    };

    const changePassword = (e) => {
        window.location.replace("/recuperarcontrasena");
    };

    return (
        <div>
            <div className={classes.wrapper}>
                <BrowserRouter>
                    <Sidebar
                        routes={routes}
                        logoText={"Mantina"}
                        logo={logo}
                        image={image}
                        handleDrawerToggle={handleDrawerToggle}
                        open={mobileOpen}
                        color={color}
                        {...rest}
                    />

                    <div className={classes.mainPanel} ref={mainPanel}>
                        <AppBar className={classes.appBar} position="static">
                            <Toolbar>
                                {isLogin()
                                  ? <>
                                    <Button className={classes.toolbarRight} color="inherit" onClick={changePassword}>CAMBIAR CONTRASEÑA</Button>
                                    <Button onClick={logout} color="inherit">CERRAR SESION</Button>
                                  </>
                                  : ""
                                }
                            </Toolbar>
                        </AppBar>

                        <div>
                            <div className={classes.container}>
                                <Routes>
                                    <Route path='/visor/:name_pdf/:name' element={<VisorPdfPagina />} />
                                    <Route path='/contenidos/:id_topic' element={<ContenidosPagina />} />
                                    <Route path='/temas/:id_subject' element={<TemasPagina />} />
                                    <Route path='/materias' element={<MateriasPagina />} />
                                    <Route path='/contacto' element={<ContactoPagina />} />
                                    <Route path='/quienessomos' element={<QuienesSomosPagina />} />
                                    <Route path='/alumnos/contenidos/:id_studentTopics' element={<AuthRoute><AlumnosContenidosPagina /></AuthRoute>} />
                                    <Route path='/alumnos/visor/:name_pdf/:name' element={<AuthRoute><AlumnosVisorPdfPagina /></AuthRoute>} />
                                    <Route path='/alumnos' element={<AuthRoute><AlumnosPagina /></AuthRoute>} />
                                    <Route path='/login' element={<SignInPagina />} />
                                    <Route path='/recuperarcontrasena' element={<ForgotPassword />} />
                                    <Route path='/ingresarcontrasena/:user/:hash' element={<NewPassword />} />

                                    <Route path="*" element={<Navigate to="/materias" replace />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
            <Footer />
        </div>
    );
}