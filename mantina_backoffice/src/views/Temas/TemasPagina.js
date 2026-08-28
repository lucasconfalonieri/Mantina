import React from 'react';
import Temas from 'views/Temas/Temas.js';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";

export default function TemasPagina({ match, location }) {
    const id_subject = match.params.id_subject;
    // match -> parametro que viene en la URL
    // location -> parametros que vienen cuando armarmos el link to (desde TEMA).
    const { state = {} } = location;
    const { name, id_topic } = state;

    const handleBack = (e) => {
        window.history.back();
    };

    return (
        <div>
            <Button color="primary" onClick={handleBack}>Atrás</Button>
            <Temas
                id_subject_selected = {id_subject}
                id_topic = {id_topic}
                name = {name} />
        </div>
    );
}