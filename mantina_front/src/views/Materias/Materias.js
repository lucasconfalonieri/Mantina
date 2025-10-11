import React, {Component} from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import Skeleton from '@material-ui/lab/Skeleton';
import Icon from "@material-ui/core/Icon";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";

import Materia from 'views/Materias/Materia.js';
import { getMaterias } from '../../utils/api';

class Materias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      materiasArray: [],
      loading: true,
    };
  }

  componentDidMount() {
    getMaterias()
    .then(json => {
        const materias = [];
        json.data.subjects.forEach(result => {
            materias.push(result);
        });
        return materias;
    })
    .then(allMaterias => {
        this.setState({
            materiasArray: allMaterias,
            loading: false,
        });
    })
    .catch(error => {
        // do something with the error (report it, etc.)
    });
  }

  renderMaterias = () => {
    const { materiasArray } = this.state;

    if (materiasArray.length == 0) {
        return (
            <div>
                <h2 className="emptyLoad">Lo sentimos, no hay materias cargadas.</h2>
            </div>
          );
    } else {
        return materiasArray.map(materia => {
          const { name, id_subject } = materia;

          return (
            <Materia
              name={name}
              id_subject={id_subject}
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
    return (
      <GridContainer>
        {loading ? this.showSkeleton() : this.renderMaterias() }
      </GridContainer>
    );
  }
}
export default Materias;