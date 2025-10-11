import React from 'react';
import Contenidos from 'views/Contenidos/Contenidos.js';
import Button from '@material-ui/core/Button';

export default function ContenidosPagina({ match, location, rest }) {
    const id_topic = match.params.id_topic;

    return (
        <div>
            <Contenidos
                id_topic_selected = {id_topic} />
        </div>
    );
}
