// PdfViewer.tsx
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { useChatPanelStore } from '../../stores/chatPanelStore';

interface PdfViewerProps {
    fileUrl: string | Uint8Array;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
    const toolbarPluginInstance = toolbarPlugin();

    const { Toolbar } = toolbarPluginInstance;

    // ✅ Set scroll mode to horizontal on mount
    const { setQueryInput, open } = useChatPanelStore();
    const handleExplainClick = () => {
        const text = window.getSelection()?.toString().trim() || '';
        if (text) {
            setQueryInput(text);
            open();
        }
    };
    return (
        <div>
            <div style={{ padding: '8px', borderBottom: '1px solid #ccc',position:'sticky',top:0,zIndex:99,background:'white' }}>
                <div className="justify-content-end d-flex mb-2 ">
                    <button className="btn btn-info text-white" onClick={handleExplainClick}>📘 Explain Selected Text</button>

                </div>
                <Toolbar />
            </div>
            <div style={{ flex: 1 }}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={fileUrl} plugins={[toolbarPluginInstance]} />
                </Worker>
            </div>
        </div>
    );
};

export default PdfViewer;
