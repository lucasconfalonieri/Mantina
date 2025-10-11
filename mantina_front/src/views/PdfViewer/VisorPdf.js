import React from 'react';
import Viewer, { Worker, defaultLayout, SelectionMode } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

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
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
           <div style={{ height: '750px' }}>
                <Viewer
                    fileUrl= {process.env.REACT_APP_API_URL + "/public/pdfs/" + name_pdf}
                    layout={layout}
                    selectionMode={SelectionMode.Hand}
                />
            </div>
        </Worker>
    </div>
    )
};

export default VisorPdf;