import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Subtemas from 'views/Subtemas/Subtemas.js';
import Button from '@mui/material/Button';
import Icon from "@mui/material/Icon";

export default function SubtemasPagina() {
    const { id_topic } = useParams();
    // match -> parametro que viene en la URL
    // location -> parametros que vienen cuando armarmos el link to (desde TEMA).
    const { state = {} } = useLocation();
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