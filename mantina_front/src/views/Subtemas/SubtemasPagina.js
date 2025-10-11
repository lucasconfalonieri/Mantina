import React from 'react';
import Subtemas from 'views/Subtemas/Subtemas.js';
import Button from '@material-ui/core/Button';

export default function SubtemasPagina({ match, location, rest }) {
    const id_topic = match.params.id_topic;

    return (
        <div>
            <Subtemas
                id_topic_selected = {id_topic} />
        </div>
    );
}