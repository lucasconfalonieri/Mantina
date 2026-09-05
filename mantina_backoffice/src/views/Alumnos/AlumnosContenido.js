import React, { useState, useEffect } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import AgregarContenidoAlumnoView from 'views/Alumnos/AgregarContenidoAlumnoView.js';
import AlumnoContenido from 'views/Alumnos/AlumnoContenido.js';
import { getContenidosByStudentTopic, changeOrderStudentContent } from '../../utils/api';
import Button from "components/CustomButtons/Button.js";
import List from 'react-smooth-draggable-list';

function AlumnosContenido(props) {
  const { id_studenttopic_selected } = props;
  const [contenidosArray, setContenidosArray] = useState([]);
  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    let active = true;

    getContenidosByStudentTopic(id_studenttopic_selected)
      .then(json => {
        const contenidos = [];
        const orden = [];
        json.data.studentcontents.forEach(result => {
          contenidos.push(result);
          orden.push(result.order);
        });

        contenidos.push("agregar");

        if (active) {
          setOrder(orden);
          setContenidosArray(contenidos);
          setLoading(false);
        }
      })
      .catch(error => {
        // do something with the error (report it, etc.)
      });

    return () => { active = false; };
  }, [id_studenttopic_selected]);

  const handleClickOrder = (e) => {
    const auxContenidosArray = [];
    contenidosArray.map(contenido => {
      if (contenido != "agregar") {
        contenido.order = order.indexOf(contenido.order);
        auxContenidosArray.push(contenido);
      }
    });
    changeOrderStudentContent(JSON.stringify({"studentContents": auxContenidosArray }))
            .then(success => {
              window.location.reload();
            })
            .catch(error => {
              alert("ERROR")
            });
  };

  const renderContenidos = () => {
    return <List
      rowHeight={100}
      rowWidth={3000}
      order={order}
      onReOrder={setOrder}
    >{
      contenidosArray.map(contenido => {
          const { text_pdf,name_pdf, id_studentcontent, order } = contenido;

          if (contenido != "agregar") {
            return (
              <List.Item>
                <AlumnoContenido
                  text_pdf={text_pdf}
                  name_pdf={name_pdf}
                  id_studentcontent={id_studentcontent}
                  id_studenttopic={id_studenttopic_selected}
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

  const renderAgregar = () => {
    return (
    <div>
    <AgregarContenidoAlumnoView
      id_studentcontent={props.id_studentcontent}
      id_studenttopic={id_studenttopic_selected}
      name_pdf={props.name_pdf}
      text_pdf={props.text_pdf}
    />
      <Button color="danger" onClick={handleClickOrder}> Actualizar Orden </Button>

    </div>

    )
  }

  return (
    <div>
      <h2>Contenidos relacionados a {tema} </h2>
      <GridContainer>
        {loading ? 'Cargando los contenidos...' : renderAgregar()}
        {loading ? '' : renderContenidos()}
      </GridContainer>
    </div>
  );
}
export default AlumnosContenido;