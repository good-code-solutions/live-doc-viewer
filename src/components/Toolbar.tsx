import { useState, useEffect, useRef } from 'react';
import type { FileType } from '../types';
import { Upload, Download, FileText, Image as ImageIcon, FileType as FileIcon, Wand2 } from 'lucide-react';
import { exportToPdf, exportToImage } from '../utils/export';
import jsyaml from 'js-yaml';
import Papa from 'papaparse';

interface ToolbarProps {
    fileType: FileType;
    setFileType: (type: FileType) => void;
    setCode: (code: string) => void;
    code: string;
}

export function Toolbar({ fileType, setFileType, setCode, code }: ToolbarProps) {
    const [showExportMenu, setShowExportMenu] = useState(false);
    const exportMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
                setShowExportMenu(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleExport = (type: 'pdf' | 'image') => {
        const elementId = 'viewer-container'; // We need to add this ID to the viewer
        if (type === 'pdf') {
            exportToPdf(elementId, `export-${Date.now()}`);
        } else {
            exportToImage(elementId, `export-${Date.now()}`);
        }
        setShowExportMenu(false);
    };

    const handleFormat = () => {
        try {
            let formatted = code;
            switch (fileType) {
                case 'json':
                    formatted = JSON.stringify(JSON.parse(code), null, 2);
                    break;
                case 'yaml':
                    const obj = jsyaml.load(code);
                    formatted = jsyaml.dump(obj);
                    break;
                case 'xml':
                    // Basic XML formatting (indentation)
                    // For a robust solution, we'd use an XML builder, but fast-xml-parser is mainly for parsing.
                    // A simple regex-based indenter for now:
                    let pad = 0;
                    formatted = code.replace(/>\s*</g, '><')
                        .replace(/<(\/)?([^>]+)>/g, (match, slash, tagName) => {
                            if (slash) pad -= 2;
                            const padding = ' '.repeat(Math.max(0, pad));
                            if (!slash) pad += 2;
                            return '\n' + padding + match;
                        }).trim();
                    break;
                case 'csv':
                    const parsed = Papa.parse(code, { header: true });
                    formatted = Papa.unparse(parsed.data);
                    break;
                case 'markdown':
                    // Basic Markdown cleanup (trim lines)
                    formatted = code.split('\n').map(line => line.trimEnd()).join('\n');
                    break;
            }
            setCode(formatted);
        } catch (e) {
            console.error('Formatting failed:', e);
            alert('Failed to format document. Please check for syntax errors.');
        }
    };

    return (
        <div className="h-14 bg-gray-900 border-b border-gray-700 flex items-center px-4 justify-between relative z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-lg">
                    <FileText size={24} />
                    <span>LiveDoc</span>
                </div>

                <div className="h-6 w-px bg-gray-700 mx-2" />

                <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value as FileType)}
                    className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
                >
                    <option value="json">JSON</option>
                    <option value="yaml">YAML</option>
                    <option value="xml">XML</option>
                    <option value="csv">CSV</option>
                    <option value="markdown">Markdown</option>
                </select>
            </div>

            import {Link} from 'react-router-dom';

            // ... inside Toolbar component return ...

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-4 mr-4 text-sm text-gray-400">
                    <Link to="/about" className="hover:text-white transition-colors">About</Link>
                    <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                </div>

                <button
                    onClick={handleFormat}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded border border-gray-700 transition-colors"
                    title="Format Document"
                >
                    <Wand2 size={16} />
                    <span>Prettify</span>
                </button>

                <label className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded border border-gray-700 transition-colors cursor-pointer">
                    <Upload size={16} />
                    <span>Upload</span>
                    <input
                        type="file"
                        className="hidden"
                        accept=".json,.yaml,.yml,.xml,.csv,.md,.txt"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const content = e.target?.result as string;
                                setCode(content);

                                // Auto-detect type
                                const ext = file.name.split('.').pop()?.toLowerCase();
                                if (ext === 'json') setFileType('json');
                                else if (ext === 'yaml' || ext === 'yml') setFileType('yaml');
                                else if (ext === 'xml') setFileType('xml');
                                else if (ext === 'csv') setFileType('csv');
                                else if (ext === 'md') setFileType('markdown');
                            };
                            reader.readAsText(file);
                        }}
                    />
                </label>

                <div className="relative">
                    <button
                        onClick={() => setShowExportMenu(!showExportMenu)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded transition-colors"
                    >
                        <Download size={16} />
                        <span>Export</span>
                    </button>

                    {showExportMenu && (
                        <div ref={exportMenuRef} className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-xl overflow-hidden">
                            <button
                                onClick={() => handleExport('pdf')}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-gray-700 text-left"
                            >
                                <FileIcon size={16} />
                                <span>Export as PDF</span>
                            </button>
                            <button
                                onClick={() => handleExport('image')}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-gray-700 text-left"
                            >
                                <ImageIcon size={16} />
                                <span>Export as Image</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
