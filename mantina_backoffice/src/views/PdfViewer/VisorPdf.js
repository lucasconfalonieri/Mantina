import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const VisorPdf = ({ name, name_pdf }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
            <div style={{ height: '750px' }}>
                <Viewer
                    fileUrl={import.meta.env.VITE_API_URL + "/public/pdfs/" + name_pdf}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </div>
        </Worker>
    )
};

export default VisorPdf;
