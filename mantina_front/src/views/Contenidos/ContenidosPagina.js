import React from 'react';
import { useParams } from 'react-router-dom';
import Contenidos from 'views/Contenidos/Contenidos.js';
import Button from '@mui/material/Button';

export default function ContenidosPagina() {
    const { id_topic } = useParams();

    return (
        <div>
            <Contenidos
                id_topic_selected = {id_topic} />
        </div>
    );
}
