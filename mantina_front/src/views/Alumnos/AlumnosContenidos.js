import React, { useState, useEffect } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import Skeleton from '@mui/material/Skeleton';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import AlumnosContenido from 'views/Alumnos/AlumnosContenido.js';
import { getStudentContents } from '../../utils/api';

export default function AlumnosContenidos(props) {
  const { id_studentTopic_selected } = props;
  const [alumnosContenidosArray, setAlumnosContenidosArray] = useState([]);
  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    //TODO
    getStudentContents(localStorage.getItem('user'), id_studentTopic_selected)
    .then((response) => {
        if (isMounted) {
            setAlumnosContenidosArray(response.data.studentcontents);
            setTema(response.data.topicName);
            setLoading(false);
        }
    })
    .catch(error => {

    });

    return () => {
        isMounted = false;
    };
  }, [id_studentTopic_selected]);

  const renderContenidos = () => {
    if (alumnosContenidosArray.length == 0) {
        return (
            <div>
                <h2 className="emptyLoad">Lo sentimos, no hay contenidos cargados.</h2>
            </div>
          );
    } else {
        return alumnosContenidosArray.map(contenido => {
          const { id_studentcontent, text_pdf, name_pdf } = contenido;

          return (
           <AlumnosContenido
              key={id_studentcontent}
              text_pdf={text_pdf}
              name_pdf={name_pdf}
            />
          );
        });
     }
  }

  const showSkeleton = () => {
      return (
      <>
          <GridItem xs={12} sm={12} md={12} >
              <Card style={{ height: 75 }}>
                  <CardHeader color="warning" stats icon>
                      <CardIcon>
                          <Skeleton animation={false} variant="rect" height={90} width="10%" style={{ marginTop: -20 }}/>
                      </CardIcon>
                      <Skeleton animation="wave" height={20} width="30%" style={{ marginLeft: "70%", marginTop: -60}} />
                      <Skeleton animation="wave" height={20} width="30%" style={{ marginLeft: "70%"}} />
                  </CardHeader>
              </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={12} >
                <Card style={{ height: 75 }}>
                    <CardHeader color="warning" stats icon>
                        <CardIcon>
                            <Skeleton animation={false} variant="rect" height={90} width="10%" style={{ marginTop: -20 }}/>
                        </CardIcon>
                        <Skeleton animation="wave" height={20} width="30%" style={{ marginLeft: "70%", marginTop: -60}} />
                        <Skeleton animation="wave" height={20} width="30%" style={{ marginLeft: "70%"}} />
                    </CardHeader>
                </Card>
            </GridItem>

          <GridItem xs={12} sm={12} md={12} >
              <Card style={{ height: 75 }}>
                  <CardHeader color="warning" stats icon>
                      <CardIcon>
                          <Skeleton animation={false} variant="rect" height={90} width="10%" style={{ marginTop: -20 }}/>
                      </CardIcon>
                      <Skeleton animation="wave" height={20} width="30%" style={{ marginLeft: "70%", marginTop: -60}} />
                      <Skeleton animation="wave" height={20} width="30%" style={{ marginLeft: "70%"}} />
                  </CardHeader>
              </Card>
          </GridItem>
        </>
      )
    }

  const temaUpper = tema.toUpperCase();

  return (
      <div>

          <h2 className="titleFormat">CONTENIDOS relacionados a {temaUpper}</h2>

          <GridContainer>
              {loading ? showSkeleton() : renderContenidos()}
          </GridContainer>
      </div>
  );
}
