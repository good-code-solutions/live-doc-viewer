import { useState, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Editor } from './components/Editor';
import { Viewer } from './components/Viewer';
import { Toolbar } from './components/Toolbar';
import type { FileType } from './types';
import { JSON_SAMPLE, YAML_SAMPLE, XML_SAMPLE, CSV_SAMPLE, MARKDOWN_SAMPLE } from './data/samples';
import { jsonToToon } from './utils/toon';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { Toast } from './components/Toast';

const STORAGE_KEY = 'jsonformatstudio-content';

type ContentMap = Record<FileType, string>;

const DEFAULT_CONTENT: ContentMap = {
  json: JSON_SAMPLE,
  toon: jsonToToon(JSON_SAMPLE),
  yaml: YAML_SAMPLE,
  xml: XML_SAMPLE,
  csv: CSV_SAMPLE,
  markdown: MARKDOWN_SAMPLE,
};

import { Sidebar } from './components/Sidebar';

function DocViewer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Derive fileType from URL path (remove leading slash)
  const pathType = location.pathname.substring(1) as FileType;
  const isValidType = ['json', 'toon', 'yaml', 'xml', 'csv', 'markdown'].includes(pathType);

  const fileType = isValidType ? pathType : 'json';

  // Update page title based on current format
  useEffect(() => {
    const formatTitles: Record<FileType, string> = {
      json: 'JSON Editor - JsonFormatStudio | Format, Validate & Visualize JSON Data',
      toon: 'TOON Editor - JsonFormatStudio | Token-Oriented Object Notation',
      yaml: 'YAML Viewer - JsonFormatStudio | Parse & Format YAML Documents',
      xml: 'XML Parser - JsonFormatStudio | Format & Validate XML Data',
      csv: 'CSV Formatter - JsonFormatStudio | View & Format CSV Data Tables',
      markdown: 'Markdown Renderer - JsonFormatStudio | Preview & Format Markdown'
    };

    const formatDescriptions: Record<FileType, string> = {
      json: 'Professional online JSON editor with validation, formatting, and tree view. Format, validate and visualize JSON data instantly with syntax highlighting.',
      toon: 'Online TOON editor and viewer. Compact, human-readable, schema-aware JSON for LLM prompts.',
      yaml: 'Online YAML viewer and parser. Format, validate and visualize YAML documents with syntax highlighting and error detection.',
      xml: 'Professional XML parser and formatter. Validate, format and visualize XML data with syntax highlighting and structure validation.',
      csv: 'CSV data viewer and formatter. View, format and analyze CSV data in organized tables with export capabilities.',
      markdown: 'Markdown renderer with GitHub-flavored markdown support. Preview and format Markdown documents with live rendering.'
    };

    document.title = formatTitles[fileType];
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', formatDescriptions[fileType]);
    }
  }, [fileType]);

  const [contentMap, setContentMap] = useState<ContentMap>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_CONTENT, ...parsed };
      } catch (e) {
        console.error('Failed to parse stored content', e);
        return DEFAULT_CONTENT;
      }
    }
    return DEFAULT_CONTENT;
  });

  // Tree Visualizer state (for JSON, YAML, XML)
  const [treeCollapsed, setTreeCollapsed] = useState<boolean | number>(2);
  const [treeForceUpdate, setTreeForceUpdate] = useState(0);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Redirect if invalid type or root
  useEffect(() => {
    if (!isValidType) {
      navigate('/json', { replace: true });
    }
  }, [isValidType, navigate]);

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contentMap));
  }, [contentMap]);

  const code = contentMap[fileType];

  const setCode = (newCode: string) => {
    setContentMap(prev => ({
      ...prev,
      [fileType]: newCode,
    }));
  };

  const updateContent = (type: FileType, content: string) => {
    setContentMap(prev => ({
      ...prev,
      [type]: content,
    }));
  };

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const setFileType = (newType: FileType) => {
    navigate(`/${newType}`);
  };

  if (!isValidType) return null;

  return (
    <div className="h-screen w-screen flex bg-gray-900 text-white overflow-hidden">
      <Sidebar fileType={fileType} setFileType={setFileType} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Toolbar
          code={code}
          setCode={setCode}
          updateContent={updateContent}
          showToast={showToast}
          fileType={fileType}
          treeCollapsed={treeCollapsed}
          setTreeCollapsed={setTreeCollapsed}
          setTreeForceUpdate={setTreeForceUpdate}
        />

        <div className="flex-1 overflow-hidden">
          <PanelGroup direction="horizontal">
            <Panel defaultSize={50} minSize={20}>
              <Editor code={code} setCode={setCode} fileType={fileType} />
            </Panel>

            <PanelResizeHandle className="w-1 bg-gray-700 hover:bg-blue-500 transition-colors" />

            <Panel defaultSize={50} minSize={20}>
              <Viewer
                code={code}
                fileType={fileType}
                treeCollapsed={treeCollapsed}
                treeForceUpdate={treeForceUpdate}
              />
            </Panel>
          </PanelGroup>
        </div>
      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onDismiss={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}

import { About } from './pages/About';
import { Contact } from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/*" element={<DocViewer />} />
    </Routes>
  );
}

export default App;
