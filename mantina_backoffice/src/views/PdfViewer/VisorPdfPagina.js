import React from 'react';
import VisorPdf from 'views/PdfViewer/VisorPdf.js';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";

export default function VisorPdfPagina({ match, location, rest }) {
  const name_pdf = match.params.name_pdf;

    const handleBack = (e) => {
        window.history.back();
    };

  return (
    <div>
        <Button color="primary" onClick={handleBack}>Atrás</Button>

        <VisorPdf
            name_pdf = {name_pdf}
        />
    </div>
  );
}