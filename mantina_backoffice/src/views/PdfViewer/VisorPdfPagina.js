import React from 'react';
import { useParams } from 'react-router-dom';
import VisorPdf from 'views/PdfViewer/VisorPdf.js';
import Button from '@mui/material/Button';
import Icon from "@mui/material/Icon";

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