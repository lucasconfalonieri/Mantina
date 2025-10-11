import React from 'react';
import Temas from 'views/Temas/Temas.js';
import Button from '@material-ui/core/Button';

export default function TemasPagina({ match, location, rest }) {
    const id_subject = match.params.id_subject;

    return (
        <div>
            <Temas
                id_subject_selected = {id_subject}
            />
        </div>
    );
}