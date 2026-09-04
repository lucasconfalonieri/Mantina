import React from 'react';
import { useParams } from 'react-router-dom';

import VisorPdf from 'views/PdfViewer/VisorPdf.js';
import Button from '@mui/material/Button';

export default function VisorPdfPagina() {
    const { name_pdf, name } = useParams();

    return (
        <div>
            <VisorPdf
                name = {name}
                name_pdf = {name_pdf} />
        </div>
    );
}