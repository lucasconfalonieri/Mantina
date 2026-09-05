import React from 'react';
import Viewer, { Worker, defaultLayout, SelectionMode } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import imgWaterMarker from "../../assets/img/waterMarker.png"

const VisorPdf = ({ name, name_pdf }) => {

    const renderToolbar = (toolbarSlot) => {
        return (
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    width: '100%',
                }}
            >
                <div style={{ padding: '0 2px' }}>
                    {toolbarSlot.previousPageButton}
                </div>
                <div style={{ padding: '0 2px' }}>
                    {toolbarSlot.currentPageInput} / {toolbarSlot.numPages}
                </div>
                <div style={{ padding: '0 2px' }}>
                    {toolbarSlot.nextPageButton}
                </div>

                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        flexGrow: 1,
                        flexShrink: 1,
                        justifyContent: 'flex-end',
                    }}
                >
                    <div style={{ padding: '0 2px' }}>
                        {toolbarSlot.zoomOutButton}
                    </div>
                    <div style={{ padding: '0 2px' }}>
                        {toolbarSlot.zoomPopover}
                    </div>
                    <div style={{ padding: '0 2px' }}>
                        {toolbarSlot.zoomInButton}
                    </div>
                    <div style={{ padding: '0 2px' }}>
                        {toolbarSlot.fullScreenButton}
                    </div>
                </div>
            </div>
        );
    };

    const layout = (
        isSidebarOpened,
        container,
        main,
        toolbar,
        sidebar,
    ) => {
        return defaultLayout(
            isSidebarOpened,
            container,
            main,
            toolbar(renderToolbar),
            sidebar,
        );
    };

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
            <div style={{ height: '750px' }}>
                <Viewer fileUrl= {import.meta.env.VITE_API_URL + "/public/pdfs/" + name_pdf}
                    layout={layout}
                    selectionMode={SelectionMode.Hand}
                />
            </div>
        </Worker>
    )
};

export default VisorPdf;