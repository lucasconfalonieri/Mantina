import React from 'react';
import { useParams } from 'react-router-dom';

import AlumnosVisorPdf from 'views/Alumnos/AlumnosVisorPdf.js';
import Button from '@material-ui/core/Button';

export default function AlumnosVisorPdfPagina() {
    const { name_pdf, name } = useParams();

    return (
        <div>
            <AlumnosVisorPdf
                name = {name}
                name_pdf = {name_pdf} />
        </div>
    );
}