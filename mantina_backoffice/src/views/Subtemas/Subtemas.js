import React, { useState, useEffect } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import AgregarSubtema from 'views/Subtemas/AgregarSubtema.js';
import Subtema from 'views/Subtemas/Subtema.js';
import { getSubtemasByTema } from '../../utils/api';

function Subtemas(props) {
  const { id_topic_selected } = props;
  const [subtemasArray, setSubtemasArray] = useState([]);
  const [tema, setTema] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getSubtemasByTema(id_topic_selected)
      .then((response) => {
        const subtemasAux = response.data.subtopics;
        subtemasAux.push("agregar");

        if (active) {
          setSubtemasArray(subtemasAux);
          setTema(response.data.topicName);
          setLoading(false);
        }
      })
      .catch(error => {

      });

    return () => { active = false; };
  }, [id_topic_selected]);

  const renderSubtemas = () => {
    return subtemasArray.map(subtema => {
      const { name, id_subtopic } = subtema;

      if (subtema != "agregar") {
        return (
          <Subtema
            name={name}
            id_topic={id_topic_selected}
            id_subtopic={id_subtopic}
          />
        );
      } else {
        return (
          <AgregarSubtema
            name={props.name}
            id_topic={id_topic_selected}
            id_subtopic={props.id_subtopic}
          />
        );
      }
    });
  }

  return (
    <div>
      <h2>Subtemas relacionados a {tema} </h2>

      <GridContainer>
        {loading ? 'Cargando los subtemas...' : renderSubtemas()}
      </GridContainer>
    </div>
  );
}
export default Subtemas;