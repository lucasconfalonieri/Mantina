import React from 'react';
import { useParams } from 'react-router-dom';
import AlumnosContenidos from 'views/Alumnos/AlumnosContenidos.js';
import Button from '@mui/material/Button';

export default function AlumnosContenidosPagina() {
    const { id_studentTopics } = useParams();

    return (
        <div>
            <AlumnosContenidos
                id_studentTopic_selected = {id_studentTopics} />
        </div>
    );
}