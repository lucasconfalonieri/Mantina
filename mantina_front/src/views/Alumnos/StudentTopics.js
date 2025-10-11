import React, {Component} from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import Skeleton from '@material-ui/lab/Skeleton';
import Icon from "@material-ui/core/Icon";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import GridItem from "components/Grid/GridItem.js";

import StudentTopic from 'views/Alumnos/StudentTopic.js';
import { getStudentTopics } from '../../utils/api';

class StudentTopics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentTopicsArray: [],
      loading: true,
    };
  }

  componentDidMount() {
    getStudentTopics(localStorage.getItem('user'))
    .then(json => {
        const studentTopics = [];
        json.data.studenttopics.forEach(result => {
            studentTopics.push(result);
        });
        return studentTopics;
    })
    .then(allStudentTopics => {
        this.setState({
            studentTopicsArray: allStudentTopics,
            loading: false,
        });
    })
    .catch(error => {
        // do something with the error (report it, etc.)
    });
  }

  renderStudentTopic = () => {
    const { studentTopicsArray } = this.state;

    if (studentTopicsArray.length == 0) {
        return (
            <div>
                <h2 className="emptyLoad">Lo sentimos, no hay temas cargados.</h2>
            </div>
          );
    } else {
        return studentTopicsArray.map(studentTopic => {
          const { name, id_studenttopics } = studentTopic;

          return (
            <StudentTopic
              name={name}
              id_studentTopics={id_studenttopics}
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
        {loading ? this.showSkeleton() : this.renderStudentTopic() }
      </GridContainer>
    );
  }
}
export default StudentTopics;