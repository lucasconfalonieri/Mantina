import React from 'react';
import { useParams } from 'react-router-dom';
import VisorPdf from 'views/PdfViewer/VisorPdf.js';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";

export default function VisorPdfPagina() {
  const { name_pdf } = useParams();

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