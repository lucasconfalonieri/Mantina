import React, { useState, useEffect } from 'react';
import GridContainer from "components/Grid/GridContainer.js";
import Tema from 'views/Temas/Tema.js';
import Skeleton from '@material-ui/lab/Skeleton';
import Icon from "@material-ui/core/Icon";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";
import Typography from '@material-ui/core/Typography';

import { getTemasByMateria } from '../../utils/api';

import { Breadcrumbs, Link } from "@material-ui/core";

export default function Temas(props) {
  const { id_subject_selected } = props;
  const [temasArray, setTemasArray] = useState([]);
  const [materia, setMateria] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getTemasByMateria(id_subject_selected)
    .then((response) => {
        if (isMounted) {
            setTemasArray(response.data.topics);
            setMateria(response.data.subjectName);
            setLoading(false);
        }
    })
    .catch(error => {

    });

    return () => {
        isMounted = false;
    };
  }, [id_subject_selected]);

  const renderTemas = () => {
    if (temasArray.length == 0) {
        return (
            <div>
                <h2 className="emptyLoad">Lo sentimos, no hay temas cargados.</h2>
             </div>
        );
    } else {
        return temasArray.map(tema => {
          const { name, id_topic } = tema;

          return (
           <Tema
              name={name}
              id_topic={id_topic}
            />
          );
        });
    }
  }

  const showSkeleton = () => {
    return (
    <>
        <GridItem xs={12} sm={12} md={4} >
            <Card style={{ height: 75 }}>
                <CardHeader color="warning" stats icon>
                    <CardIcon>
                        <Skeleton animation="false" variant="rect" height={90} width="20%" style={{ marginTop: -20 }}/>
                    </CardIcon>
                    <Skeleton animation="wave" height={20} width="40%" style={{ marginLeft: "60%", marginTop: -60}} />
                    <Skeleton animation="wave" height={20} width="40%" style={{ marginLeft: "60%" }} />
                </CardHeader>
            </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4} >
            <Card style={{ height: 75 }}>
                <CardHeader color="warning" stats icon>
                    <CardIcon>
                        <Skeleton animation="false" variant="rect" height={90} width="20%" style={{ marginTop: -20 }}/>
                    </CardIcon>
                    <Skeleton animation="wave" height={20} width="40%" style={{ marginLeft: "60%", marginTop: -60}} />
                    <Skeleton animation="wave" height={20} width="40%" style={{ marginLeft: "60%" }} />
                </CardHeader>
            </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4} >
            <Card style={{ height: 75 }}>
                <CardHeader color="warning" stats icon>
                    <CardIcon>
                        <Skeleton animation="false" variant="rect" height={90} width="20%" style={{ marginTop: -20 }}/>
                    </CardIcon>
                    <Skeleton animation="wave" height={20} width="40%" style={{ marginLeft: "60%", marginTop: -60}} />
                    <Skeleton animation="wave" height={20} width="40%" style={{ marginLeft: "60%" }} />
                </CardHeader>
            </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4} >
            <Card style={{ height: 75 }}>
                <CardHeader color="warning" stats icon>
                    <CardIcon>
                        <Skeleton animation="false" variant="rect" height={90} width="20%" style={{ marginTop: -20 }}/>
                    </CardIcon>
                    <Skeleton animation="wave" height={20} width="40%" style={{ marginLeft: "60%", marginTop: -60}} />
                    <Skeleton animation="wave" height={20} width="40%" style={{ marginLeft: "60%" }} />
                </CardHeader>
            </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4} >
            <Card style={{ height: 75 }}>
                <CardHeader color="warning" stats icon>
                    <CardIcon>
                        <Skeleton animation="false" variant="rect" height={90} width="20%" style={{ marginTop: -20 }}/>
                    </CardIcon>
                    <Skeleton animation="wave" height={20} width="40%" style={{ marginLeft: "60%", marginTop: -60}} />
                    <Skeleton animation="wave" height={20} width="40%" style={{ marginLeft: "60%" }} />
                </CardHeader>
            </Card>
        </GridItem>
      </>
    )
  }

  const materiaUpper = materia.toUpperCase();

  return (
      <div>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link color="inherit" href="/" className="custom-link">
                  {localStorage.setItem("historyMateriaName", materiaUpper)}
                  {localStorage.setItem("historyMateriaId", id_subject_selected)}

                  {materiaUpper}
              </Link>

              <Typography color="textPrimary">Temas</Typography>
          </Breadcrumbs>

          <h2 className="titleFormat">TEMAS relacionados a {materiaUpper} </h2>

          <GridContainer>
              { loading ? showSkeleton() : renderTemas() }
          </GridContainer>
      </div>
  );
}
