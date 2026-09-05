import React, { useState, useEffect } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import AgregarContenido from 'views/Contenidos/AgregarContenido.js';
import Contenido from 'views/Contenidos/Contenido.js';
import { getContenidosByTema } from '../../utils/api';

function Contenidos(props) {
  const { id_topic_selected } = props;
  const [contenidosArray, setContenidosArray] = useState([]);
  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getContenidosByTema(id_topic_selected)
      .then((response) => {
        const contenidosAux = response.data.contentstopics;
        contenidosAux.push("agregar");

        if (active) {
          setContenidosArray(contenidosAux);
          setTema(response.data.topicName);
          setLoading(false);
        }
      })
      .catch(error => {

      });

    return () => { active = false; };
  }, [id_topic_selected]);

  const renderContenidos = () => {
    return contenidosArray.map(contenido => {
      const { text_pdf, name_pdf, id_content_topic } = contenido;

      if (contenido != "agregar") {
        return (
          <Contenido
            key={id_content_topic}
            text_pdf={text_pdf}
            name_pdf={name_pdf}
            id_content_topic={id_content_topic}
            id_topic={id_topic_selected}
          />
        );
      } else {
        return (<AgregarContenido
          key="agregar"
          id_content_topic={props.id_content_topic}
          id_topic={id_topic_selected}
          name_pdf={props.name_pdf}
          text_pdf={props.text_pdf}
        />);
      }
    });
  }

  return (
    <div>
      <h2>Contenidos relacionados a {tema} </h2>

      <GridContainer>
        {loading ? 'Cargando los contenidos...' : renderContenidos()}
      </GridContainer>
    </div>
  );
}
export default Contenidos;