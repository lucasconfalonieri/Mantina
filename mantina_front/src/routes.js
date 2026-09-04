/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
import MenuBook from "@mui/icons-material/MenuBook";
import Email from "@mui/icons-material/Email";

// core components/views for Admin layout
import MateriasPagina from "views/Materias/MateriasPagina.js";
import AlumnosPagina from "views/Alumnos/AlumnosPagina.js";
import ContactPage from "views/Contact/Contact.js";
import QuienesSomosPagina from "views/QuienesSomos/QuienesSomosPagina";

const dashboardRoutes = [
  {
    path: "/materias",
    name: "Materias",
    icon: Dashboard,
    component: MateriasPagina,
    layout: ""
  },
  {
    path: "/alumnos",
    name: "Alumnos",
    icon: MenuBook,
    component: AlumnosPagina,
    layout: ""
  }
  ,
  {
    path: "/quienessomos",
    name: "Quienes Somos",
    icon: Person,
    component: QuienesSomosPagina,
    layout: ""
  },
  {
    path: "/contacto",
    name: "Contacto",
    icon: Email,
    component: ContactPage,
    layout: ""
  }
];

export default dashboardRoutes;
