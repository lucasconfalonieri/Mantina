import React from 'react';
import Materias from 'views/Materias/Materias.js';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";

export default function MateriasPagina({location}) {
       const { state = {} } = location;
       const { name, id_subject } = state;

  return (
    <div>
        <h2>
            Materias
        </h2>
        <Materias
            name= {name}
            id_subject= {id_subject}
         />
    </div>
  );
}
