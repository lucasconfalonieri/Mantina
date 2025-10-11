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

import AlumnosContenido from 'views/Alumnos/AlumnosContenido.js';
import { getStudentContents } from '../../utils/api';
import styles from "assets/css/material-dashboard-react.css";

class AlumnosContenidos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_studentTopic_selected: props.id_studentTopic_selected,
      alumnosContenidosArray: [],
      tema: "",
      loading: true,
    };
  }

  componentDidMount() {
    const id_selected = this.state.id_studentTopic_selected;
    //TODO
    getStudentContents(localStorage.getItem('user'), id_selected)

    .then((response) => {
        this.setState({
            alumnosContenidosArray: response.data.studentcontents,
            tema: response.data.topicName,
            loading: false,
        });
    })
    .catch(error => {

    });
  }


  renderContenidos = () => {
    const { alumnosContenidosArray } = this.state;

    if (alumnosContenidosArray.length == 0) {
        return (
            <div>
                <h2 className="emptyLoad">Lo sentimos, no hay contenidos cargados.</h2>
            </div>
          );
    } else {
        return alumnosContenidosArray.map(contenido => {
          const { text_pdf, name_pdf } = contenido;

          return (
           <AlumnosContenido
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
    let { id_subtopic_selected } = this.state;
    tema = tema.toUpperCase();

    return (
        <div>

            <h2 className="titleFormat">CONTENIDOS relacionados a {tema}</h2>

            <GridContainer>
                {loading ? this.showSkeleton() : this.renderContenidos()}
            </GridContainer>
        </div>
    );
  }
}
export default AlumnosContenidos;