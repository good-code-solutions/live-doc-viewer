import { useState, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Editor } from './components/Editor';
import { Viewer } from './components/Viewer';
import { Toolbar } from './components/Toolbar';
import type { FileType } from './types';
import { JSON_SAMPLE, YAML_SAMPLE, XML_SAMPLE, CSV_SAMPLE, MARKDOWN_SAMPLE } from './data/samples';
import { useNavigate, useLocation, Navigate, Routes, Route } from 'react-router-dom';

const STORAGE_KEY = 'live-doc-viewer-content';

type ContentMap = Record<FileType, string>;

const DEFAULT_CONTENT: ContentMap = {
  json: JSON_SAMPLE,
  yaml: YAML_SAMPLE,
  xml: XML_SAMPLE,
  csv: CSV_SAMPLE,
  markdown: MARKDOWN_SAMPLE,
};

function DocViewer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Derive fileType from URL path (remove leading slash)
  const pathType = location.pathname.substring(1) as FileType;
  const isValidType = ['json', 'yaml', 'xml', 'csv', 'markdown'].includes(pathType);

  const fileType = isValidType ? pathType : 'json';

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

  // Redirect if invalid type or root
  useEffect(() => {
    if (!isValidType) {
      navigate('/json', { replace: true });
    }
  }, [isValidType, navigate]);

  const code = contentMap[fileType];

  const setCode = (newCode: string) => {
    setContentMap((prev) => {
      const newMap = { ...prev, [fileType]: newCode };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMap));
      return newMap;
    });
  };

  const handleFileTypeChange = (newType: FileType) => {
    navigate(`/${newType}`);
  };

  if (!isValidType) return null;

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      <Toolbar
        fileType={fileType}
        setFileType={handleFileTypeChange}
        setCode={setCode}
        code={code}
      />

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50} minSize={20}>
            <Editor code={code} setCode={setCode} fileType={fileType} />
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-700 hover:bg-blue-500 transition-colors" />

          <Panel defaultSize={50} minSize={20}>
            <Viewer code={code} fileType={fileType} />
          </Panel>
        </PanelGroup>
      </div>
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
