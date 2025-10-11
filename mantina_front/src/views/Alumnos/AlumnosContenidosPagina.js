import React from 'react';
import AlumnosContenidos from 'views/Alumnos/AlumnosContenidos.js';
import Button from '@material-ui/core/Button';

export default function AlumnosContenidosPagina({ match, location, rest }) {
    const id_studentTopics = match.params.id_studentTopics;
debugger;
    return (
        <div>
            <AlumnosContenidos
                id_studentTopic_selected = {id_studentTopics} />
        </div>
    );
}