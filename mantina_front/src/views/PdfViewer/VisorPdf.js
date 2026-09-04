import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const VisorPdf = ({ name, name_pdf }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    function showBreadcrumb() {
        return(
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link color="inherit" href="/" className="custom-link">
                        {localStorage.getItem("historyMateriaName")}
                    </Link>

                    <Link color="inherit" href={"/temas/" + localStorage.getItem("historyMateriaId")} className="custom-link">
                        {localStorage.getItem("historyTemaName")}
                    </Link>

                    <Link color="inherit" href={"/contenidos/" + localStorage.getItem("historySubTemaId")} className="custom-link">
                        {name.toUpperCase()}
                    </Link>

                    <Typography color="textPrimary">Material</Typography>
            </Breadcrumbs>
        )
    }

    return (
    <div>
        {JSON.parse(localStorage.getItem("showTreeView")) ? null : showBreadcrumb()}
        <br/>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
           <div style={{ height: '750px' }}>
                <Viewer
                    fileUrl= {import.meta.env.VITE_API_URL + "/public/pdfs/" + name_pdf}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </div>
        </Worker>
    </div>
    )
};

export default VisorPdf;
