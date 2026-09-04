import React from 'react';
import { useParams } from 'react-router-dom';
import Subtemas from 'views/Subtemas/Subtemas.js';
import Button from '@mui/material/Button';

export default function SubtemasPagina() {
    const { id_topic } = useParams();

    return (
        <div>
            <Subtemas
                id_topic_selected = {id_topic} />
        </div>
    );
}