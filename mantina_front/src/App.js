import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import "assets/css/material-dashboard-react.css";
import { makeStyles } from "@material-ui/core/styles";

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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export default function App({ ...rest }) {
    let ps;

    const useStyles = makeStyles(styles);

    const classes = useStyles();

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
                                <Switch>
                                    <Route path='/visor/:name_pdf/:name' component={VisorPdfPagina} />
                                    <Route path='/contenidos/:id_topic' component={ContenidosPagina} />
                                    <Route path='/temas/:id_subject' component={TemasPagina} />
                                    <Route path='/materias' component={MateriasPagina} />
                                    <Route path='/contacto' component={ContactoPagina} />
                                    <Route path='/quienessomos' component={QuienesSomosPagina} />
                                    <AuthRoute path='/alumnos/contenidos/:id_studentTopics' component={AlumnosContenidosPagina} />
                                    <AuthRoute path='/alumnos/visor/:name_pdf/:name' component={AlumnosVisorPdfPagina} />
                                    <AuthRoute path='/alumnos' component={AlumnosPagina} />
                                    <Route path='/login' component={SignInPagina} />
                                    <Route path='/recuperarcontrasena' component={ForgotPassword} />
                                    <Route path='/ingresarcontrasena/:user/:hash' component={NewPassword} />

                                    <Redirect from="/" to="/materias" />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
            <Footer />
        </div>
    );
}