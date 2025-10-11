import React from 'react';

import VisorPdf from 'views/PdfViewer/VisorPdf.js';
import Button from '@material-ui/core/Button';

export default function VisorPdfPagina({ match, location, rest }) {
    const name_pdf = match.params.name_pdf;
    const name = match.params.name

    return (
        <div>
            <VisorPdf
                name = {name}
                name_pdf = {name_pdf} />
        </div>
    );
}