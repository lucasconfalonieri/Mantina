import React from 'react';
import { useLocation } from 'react-router-dom';
import Materias from 'views/Materias/Materias.js';
import Button from '@mui/material/Button';
import Icon from "@mui/material/Icon";

export default function MateriasPagina() {
       const { state = {} } = useLocation();
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
