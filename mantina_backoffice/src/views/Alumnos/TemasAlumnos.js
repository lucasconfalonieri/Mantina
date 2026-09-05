import React, { useState, useEffect } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import AgregarTemaAlumnoView from 'views/Alumnos/AgregarTemaAlumnoView.js';
import TemaAlumno from 'views/Alumnos/TemaAlumno.js';
import { getTemasAlumnos, changeOrderStudentTopic} from '../../utils/api';
import Button from "components/CustomButtons/Button.js";

import List from 'react-smooth-draggable-list';

function TemasAlumnos(props) {
  const [temasArray, setTemasArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    let active = true;

    getTemasAlumnos()
      .then(json => {
        const temas = [];
        const orden = [];
        json.data.studenttopics.forEach(result => {
          temas.push(result);
          orden.push(result.order);
        });

        temas.push("agregar");

        if (active) {
          setOrder(orden);
          setTemasArray(temas);
          setLoading(false);
        }
      })
      .catch(error => {
        // do something with the error (report it, etc.)
      });

    return () => { active = false; };
  }, []);

  const renderTemas = () => {
    return <List
      rowHeight={100}
      rowWidth={3000}
      order={order}
      onReOrder={setOrder}
    >{
        temasArray.map(tema => {
          const { name, id_studenttopics, order } = tema;

          if (tema != "agregar") {
            return (
              <List.Item>
                <TemaAlumno
                  name={name}
                  id_studenttopic={id_studenttopics}
                  order={order}
                />
              </List.Item>
            );
          } else {
            return (
              <br/>
            )
          }
        })
      }

    </List>
  }

  const handleClickOrder = (e) => {
    const auxTemasArray = [];
    temasArray.map(tema => {
      if (tema != "agregar") {
        tema.order = order.indexOf(tema.order);
        auxTemasArray.push(tema);
      }
    });
    changeOrderStudentTopic(JSON.stringify({"studentTopics": auxTemasArray }))
            .then(success => {
              window.location.reload();
            })
            .catch(error => {
              alert("ERROR")
            });
  };

  const renderAgregar = () => {
    return(
    <div >
      <AgregarTemaAlumnoView
      name={props.name}
      id_studenttopic={props.id_studenttopic}
    />
      <Button color="danger" onClick={handleClickOrder}> Actualizar Orden </Button>

    </div>

    )
  }

  return (
    <GridContainer>
      {loading ? 'Cargando los temas...' : renderAgregar()}
      {loading ? '' : renderTemas()}
    </GridContainer>
  );
}

export default TemasAlumnos;

