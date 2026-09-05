import React, { useState, useEffect } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import Tema from 'views/Temas/Tema.js';
import AgregarTema from 'views/Temas/AgregarTema.js';
import { getTemasByMateria } from '../../utils/api';

function Temas(props) {
  const { id_subject_selected } = props;
  const [temasArray, setTemasArray] = useState([]);
  const [materia, setMateria] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getTemasByMateria(id_subject_selected)
      .then((response) => {
        const temasAux = response.data.topics;
        temasAux.push("agregar");

        if (active) {
          setTemasArray(temasAux);
          setMateria(response.data.subjectName);
          setLoading(false);
        }
      })
      .catch(error => {

      });

    return () => { active = false; };
  }, [id_subject_selected]);

  const renderTemas = () => {
    return temasArray.map(tema => {
      const { name, id_topic } = tema;

      if (tema != "agregar") {
        return (
          <Tema
            key={id_topic}
            name={name}
            id_subject={id_subject_selected}
            id_topic={id_topic}
          />
        );
      } else {
        return (
          <AgregarTema
            key="agregar"
            name={props.name}
            id_subject={id_subject_selected}
            id_topic={props.id_topic}
          />
        );
      }
    });
  }

  return (
    <div>
      <h2>Temas relacionados a {materia} </h2>

      <GridContainer>
        {loading ? 'Cargando los temas...' : renderTemas()}
      </GridContainer>
    </div>
  );
}
export default Temas;