import React from 'react';
import Subtemas from 'views/Subtemas/Subtemas.js';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";

export default function SubtemasPagina({ match, location }) {
    const id_topic = match.params.id_topic;
    // match -> parametro que viene en la URL
    // location -> parametros que vienen cuando armarmos el link to (desde TEMA).
    const { state = {} } = location;
    const { name, id_subtopic } = state;

    const handleBack = (e) => {
        window.history.back();
    };

    return (
        <div>
            <Button color="primary" onClick={handleBack}>Atrás</Button>

            <Subtemas
                id_topic_selected = {id_topic}
                id_subtopic = {id_subtopic}
                name = {name} />
        </div>
    );
}