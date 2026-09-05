import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Temas from 'views/Temas/Temas.js';
import Button from '@mui/material/Button';
import Icon from "@mui/material/Icon";

export default function TemasPagina() {
    const { id_subject } = useParams();
    // match -> parametro que viene en la URL
    // location -> parametros que vienen cuando armarmos el link to (desde TEMA).
    const { state = {} } = useLocation();
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