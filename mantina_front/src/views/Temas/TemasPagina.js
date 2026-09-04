import React from 'react';
import { useParams } from 'react-router-dom';
import Temas from 'views/Temas/Temas.js';
import Button from '@mui/material/Button';

export default function TemasPagina() {
    const { id_subject } = useParams();

    return (
        <div>
            <Temas
                id_subject_selected = {id_subject}
            />
        </div>
    );
}