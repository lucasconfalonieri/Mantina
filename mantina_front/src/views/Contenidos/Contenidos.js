import React, { Component } from 'react';

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
import styles from "assets/css/material-dashboard-react.css";

class Contenidos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_topic_selected: props.id_topic_selected,
      contenidosArray: [],
      tema: "",
      loading: true,
    };
  }

  componentDidMount() {
    const id_selected = this.state.id_topic_selected;
    getContenidosByTema(id_selected)

    .then((response) => {
        this.setState({
            contenidosArray: response.data.contentstopics,
            tema: response.data.topicName,
            loading: false,
        });
    })
    .catch(error => {

    });
  }


  renderContenidos = () => {
    const { contenidosArray } = this.state;

    if (contenidosArray.length == 0) {
        return (
            <div>
                <h2 className="emptyLoad">Lo sentimos, no hay contenidos cargados.</h2>
            </div>
          );
    } else {
        return contenidosArray.map(contenido => {
          const { text_pdf, name_pdf } = contenido;

          return (
           <Contenido
              text_pdf={text_pdf}
              name_pdf={name_pdf}
            />
          );
        });
     }
  }

  showSkeleton = () => {
      return (
      <>
          <GridItem xs={12} sm={12} md={12} >
              <Card style={{ height: 75 }}>
                  <CardHeader color="warning" stats icon>
                      <CardIcon>
                          <Skeleton animation="false" variant="rect" height={90} width="10%" style={{ marginTop: -20 }}/>
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
                            <Skeleton animation="false" variant="rect" height={90} width="10%" style={{ marginTop: -20 }}/>
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
                          <Skeleton animation="false" variant="rect" height={90} width="10%" style={{ marginTop: -20 }}/>
                      </CardIcon>
                      <Skeleton animation="wave" height={20} width="30%" style={{ marginLeft: "70%", marginTop: -60}} />
                      <Skeleton animation="wave" height={20} width="30%" style={{ marginLeft: "70%"}} />
                  </CardHeader>
              </Card>
          </GridItem>
        </>
      )
    }

  render() {
    const { loading } = this.state;
    let { tema } = this.state;
    let { id_topic_selected } = this.state;
    tema = tema.toUpperCase();

    return (
        <div>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link color="inherit" href="/" className="custom-link">
                    {localStorage.getItem("historyMateriaName")}
                </Link>

                <Link color="inherit" href={"/temas/" + localStorage.getItem("historyMateriaId")} className="custom-link">
                    {localStorage.setItem("historyTemaName", tema)}
                    {localStorage.setItem("historyTemaId", id_topic_selected)}

                    {tema}
                </Link>
                <Typography color="textPrimary">Contenidos</Typography>
            </Breadcrumbs>

            <h2 className="titleFormat">CONTENIDOS relacionados a {tema}</h2>

            <GridContainer>
                {loading ? this.showSkeleton() : this.renderContenidos()}
            </GridContainer>
        </div>
    );
  }
}
export default Contenidos;