import React, { useState, useEffect } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import Skeleton from '@material-ui/lab/Skeleton';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Contenido from 'views/Contenidos/Contenido.js';
import { getContenidosByTema } from '../../utils/api';

export default function Contenidos(props) {
  const { id_topic_selected } = props;
  const [contenidosArray, setContenidosArray] = useState([]);
  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getContenidosByTema(id_topic_selected)
    .then((response) => {
        if (isMounted) {
            setContenidosArray(response.data.contentstopics);
            setTema(response.data.topicName);
            setLoading(false);
        }
    })
    .catch(error => {

    });

    return () => {
        isMounted = false;
    };
  }, [id_topic_selected]);

  const renderContenidos = () => {
    if (contenidosArray.length == 0) {
        return (
            <div>
                <h2 className="emptyLoad">Lo sentimos, no hay contenidos cargados.</h2>
            </div>
          );
    } else {
        return contenidosArray.map(contenido => {
          const { id_content_topic, text_pdf, name_pdf } = contenido;

          return (
           <Contenido
              key={id_content_topic}
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
          <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link color="inherit" href="/" className="custom-link">
                  {localStorage.getItem("historyMateriaName")}
              </Link>

              <Link color="inherit" href={"/temas/" + localStorage.getItem("historyMateriaId")} className="custom-link">
                  {localStorage.setItem("historyTemaName", temaUpper)}
                  {localStorage.setItem("historyTemaId", id_topic_selected)}

                  {temaUpper}
              </Link>
              <Typography color="textPrimary">Contenidos</Typography>
          </Breadcrumbs>

          <h2 className="titleFormat">CONTENIDOS relacionados a {temaUpper}</h2>

          <GridContainer>
              {loading ? showSkeleton() : renderContenidos()}
          </GridContainer>
      </div>
  );
}
