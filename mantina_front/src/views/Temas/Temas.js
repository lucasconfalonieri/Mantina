import React, { Component } from 'react';
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

import styles from "assets/css/material-dashboard-react.css";
import { Breadcrumbs, Link } from "@material-ui/core";

class Temas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_subject_selected: props.id_subject_selected,
      temasArray: [],
      materia: "",
      loading: true,
    };
  }

  componentDidMount() {
    const id_selected = this.state.id_subject_selected;
    getTemasByMateria(id_selected)

    .then((response) => {
        this.setState({
            temasArray: response.data.topics,
            materia: response.data.subjectName,
            loading: false,
        });
    })
    .catch(error => {

    });
  }

  renderTemas = () => {
    const { temasArray } = this.state;

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

  showSkeleton = () => {
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

  render() {
    const { loading } = this.state;
    let { materia } = this.state;
    let { id_subject_selected } = this.state;

    materia = materia.toUpperCase();

    return (
        <div>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link color="inherit" href="/" className="custom-link">
                    {localStorage.setItem("historyMateriaName", materia)}
                    {localStorage.setItem("historyMateriaId", id_subject_selected)}

                    {materia}
                </Link>

                <Typography color="textPrimary">Temas</Typography>
            </Breadcrumbs>

            <h2 className="titleFormat">TEMAS relacionados a {materia} </h2>

            <GridContainer>
                { loading ? this.showSkeleton() : this.renderTemas() }
            </GridContainer>
        </div>
    );
  }
}
export default Temas;