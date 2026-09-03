import React, { useState, useEffect } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import Skeleton from '@material-ui/lab/Skeleton';
import Icon from "@material-ui/core/Icon";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Subtema from 'views/Subtemas/Subtema.js';
import { getSubtemasByTema } from '../../utils/api';

export default function Subtemas(props) {
  const { id_topic_selected } = props;
  const [subtemasArray, setSubtemasArray] = useState([]);
  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getSubtemasByTema(id_topic_selected)
    .then((response) => {
        if (isMounted) {
            setSubtemasArray(response.data.subtopics);
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

  const renderSubtemas = () => {
    if (subtemasArray.length == 0) {
        return (
            <div>
                <h2 className="emptyLoad">Lo sentimos, no hay subtemas cargados.</h2>
            </div>
          );
    } else {
        return subtemasArray.map(subtema => {
          const { name, id_subtopic } = subtema;

          return (
           <Subtema
              name={name}
              id_subtopic={id_subtopic}
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

              <Typography color="textPrimary">SubTemas</Typography>
          </Breadcrumbs>

          <h2 className="titleFormat">SUB-TEMAS relacionados a {temaUpper}</h2>

          <GridContainer>
              {loading ? showSkeleton() : renderSubtemas()}
          </GridContainer>
      </div>
  );
}
