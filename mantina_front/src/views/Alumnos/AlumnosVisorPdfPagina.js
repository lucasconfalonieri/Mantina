import React from 'react';

import AlumnosVisorPdf from 'views/Alumnos/AlumnosVisorPdf.js';
import Button from '@material-ui/core/Button';

export default function AlumnosVisorPdfPagina({ match, location, rest }) {
    const name_pdf = match.params.name_pdf;
    const name = match.params.name;

    return (
        <div>
            <AlumnosVisorPdf
                name = {name}
                name_pdf = {name_pdf} />
        </div>
    );
}