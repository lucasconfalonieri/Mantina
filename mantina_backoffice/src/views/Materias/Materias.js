import React, { useState, useEffect } from 'react';

// core components
import GridContainer from "components/Grid/GridContainer.js";

import Materia from 'views/Materias/Materia.js';
import AgregarMateria from 'views/Materias/AgregarMateria.js';
import { getMaterias } from '../../utils/api';

function Materias(props) {
  const [materiasArray, setMateriasArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getMaterias()
      .then(json => {
        const materias = [];
        json.data.subjects.forEach(result => {
          materias.push(result);
        });

        materias.push("agregar");

        return materias;
      })
      .then(allMaterias => {
        if (active) {
          setMateriasArray(allMaterias);
          setLoading(false);
        }
      })
      .catch(error => {
        // do something with the error (report it, etc.)
      });

    return () => { active = false; };
  }, []);

  const renderMaterias = () => {
    return materiasArray.map(materia => {
      const { name, id_subject } = materia;

      if (materia != "agregar") {
        return (
          <Materia
            name={name}
            id_subject={id_subject}
          />
        );
      } else {
        return (
          <AgregarMateria
            name={props.name}
            id_subject={props.id_subject}
          />
        )
      }
    });
  }

  return (
    <GridContainer>
      {loading ? 'Cargando las materias...' : renderMaterias()}
    </GridContainer>
  );
}

export default Materias;

