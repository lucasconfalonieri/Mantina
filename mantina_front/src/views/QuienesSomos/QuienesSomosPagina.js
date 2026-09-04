import React from "react";
// @material-ui/core components
import { makeStyles } from "tss-react/mui";
import InputLabel from "@mui/material/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@mui/material/TextField';


const styles = {
  cardCategoryWhite: {
    padding: "15px",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "350",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "350",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },

};

const useStyles = makeStyles()(styles);



export default function QuienesSomos() {
  const { classes } = useStyles();

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="primary">
              <h2 className={classes.cardTitleWhite}>Miguel Angel Nievas</h2>
            </CardHeader>

            <CardBody>
              <GridContainer>
                 <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.cardCategoryWhite}>
                    <p> 
                    Es ex - Oficial de la Armada Argentina, Escalafón Comando Naval. Aviador Naval, Orientación Caza y Ataque. Licencia Transporte de Línea Aérea e Instructor de Vuelo. Licenciado en Sistemas Navales Aéreos expedido 
                por Instituto Universitario Naval (2001). 
                     Profesor Universitario para la Enseñanza Media y Superior expedido por la Universidad de la Defensa Nacional,
                      Facultad del Ejército (2019). Facilitador de Factores Humanos y C.R.M., expedido por la Escuela Técnica de Aviación Profesional
                      (2021).Piloto de Ultramar de Primera.
                      <br/>
                 <br/>Ha realizado diferentes cursos, entre los que se destacan:<br/>
                 "Performance Engineer Fundamentals", Flight Operations Engineering, Boeing Co., Seattle, Washington, United States (2001).
                 <br/>"E-Jets – Pilots Performance Course", Embraer, Buenos Aires, Argentina (2013).
                 <br/>"Psicología Aeronáutica y Factores Humanos", Universidad de Buenos Aires, Facultad de Psicología (2014).
                 <br/>"Sistemas de Reporte y Análisis de Eventos de Seguridad", Servicios y Estudios para la Navegación Aérea y
                  Seguridad Aeronáutica, Buenos Aires, Argentina (2014).
                  <br/>"Flight Data Monitoring", Cranfield University, Cranfield, Bedfordshire, England (2015).
                  <br/>"Initial and Advanced Training Courses in the use of the Aerobytes FDM software", Aerobytes Ltd., Cranleigh,
                   England (2015).
                   <br/>"Go Team Airline Response Training", Kenyon, International Emergency Services, Buenos Aires, Argentina (2015).
                   <br/>"Liderazgo y Airmanship", Escuela de Instrucción y Perfeccionamiento Aeronáutico, Unión de Aviadores de 
                   Líneas Aéreas, Buenos Aires, Argentina (2016).

                   <br/><br/>Desde el año 1996 a la fecha, se desempeña como Piloto de Línea Aérea, en aeronaves B732; B737, MD81; MD83; MD88, y actualmente como Capitán e Instructor
                  en Aerolíneas Argentinas de la Flota E190.
                   
                   <br/>Desde el año 1999 a la fecha, Profesor Titular de
                    Navegación Aérea, Teoría de Vuelo por Instrumentos, en Cursos Básicos y Conjuntos de las Fuerzas Armadas, 
                    y Profesor Titular de Aerodinámica de Avión, en Cursos de Piloto de Ejército e Instructores de Vuelo, en 
                    el Ejército Argentino, Escuela de Aviación, "Coronel Arenales Uriburu".
                    <br/>Tiene una experiencia de dos años y medio embarcado como Oficial de Cubierta en Buque
                     Factoría en el Atlántico Sur, de la empresa Pesantar S.A., en su momento perteneciente al 
                     Grupo Nippon Suisan (Japón). 
                  
                    </p>
                    </div>
                  </GridItem>
              </GridContainer>
              
            </CardBody>

          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
