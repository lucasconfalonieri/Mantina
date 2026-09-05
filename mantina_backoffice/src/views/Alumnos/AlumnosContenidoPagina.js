import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import AlumnosContenido from 'views/Alumnos/AlumnosContenido.js';
import Button from '@mui/material/Button';
import Icon from "@mui/material/Icon";

export default function AlumnosContenidoPagina() {
      const { id_studenttopic } = useParams();

      // match -> parametro que viene en la URL
      // location -> parametros que vienen cuando armarmos el link to (desde TEMA).
      const { state = {} } = useLocation();
      const { id_content, name_pdf, text_pdf, name_img } = state;

    const handleBack = (e) => {
        window.history.back();
    };

  return (
    <div>
        <Button color="primary" onClick={handleBack}>Atrás</Button>

        <AlumnosContenido
            id_studenttopic_selected = {id_studenttopic}
            id_content={id_content}
            name_pdf={name_pdf}
            text_pdf={text_pdf}
            name_img={name_img}
        />
    </div>
  );
}
