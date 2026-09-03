import React, { useState, useEffect } from 'react';

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

export default function StudentTopics() {
  const [studentTopicsArray, setStudentTopicsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getStudentTopics(localStorage.getItem('user'))
    .then(json => {
        const studentTopics = [];
        json.data.studenttopics.forEach(result => {
            studentTopics.push(result);
        });
        return studentTopics;
    })
    .then(allStudentTopics => {
        if (isMounted) {
            setStudentTopicsArray(allStudentTopics);
            setLoading(false);
        }
    })
    .catch(error => {
        // do something with the error (report it, etc.)
    });

    return () => {
        isMounted = false;
    };
  }, []);

  const renderStudentTopic = () => {
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

  return (
    <GridContainer>
      {loading ? showSkeleton() : renderStudentTopic() }
    </GridContainer>
  );
}
