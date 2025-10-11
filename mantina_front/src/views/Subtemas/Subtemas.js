import React, { Component } from 'react';

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

class Subtemas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_topic_selected: props.id_topic_selected,
      subtemasArray: [],
      tema: "",
      loading: true,
    };
  }

  componentDidMount() {
    const id_selected = this.state.id_topic_selected;
    getSubtemasByTema(id_selected)

    .then((response) => {
        this.setState({
            subtemasArray: response.data.subtopics,
            tema: response.data.topicName,
            loading: false,
        });
    })
    .catch(error => {

    });
  }

  renderSubtemas = () => {
    const { subtemasArray } = this.state;

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

                <Typography color="textPrimary">SubTemas</Typography>
            </Breadcrumbs>

            <h2 className="titleFormat">SUB-TEMAS relacionados a {tema}</h2>

            <GridContainer>
                {loading ? this.showSkeleton() : this.renderSubtemas()}
            </GridContainer>
        </div>
    );
  }
}
export default Subtemas;