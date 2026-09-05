import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Contenidos from 'views/Contenidos/Contenidos.js';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";

export default function ContenidosPagina() {
  const { id_topic } = useParams();
      // match -> parametro que viene en la URL
      // location -> parametros que vienen cuando armarmos el link to (desde TEMA).
      const { state = {} } = useLocation();
      const { id_content_topic, name_pdf, text_pdf, name_img } = state;

    const handleBack = (e) => {
        window.history.back();
    };

  return (
    <div>
        <Button color="primary" onClick={handleBack}>Atrás</Button>

        <Contenidos
            id_topic_selected = {id_topic}
            id_content_topic={id_content_topic}
            name_pdf={name_pdf}
            text_pdf={text_pdf}
            name_img={name_img}
        />
    </div>
  );
}
