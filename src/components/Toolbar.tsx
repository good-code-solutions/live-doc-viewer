import { useState, useEffect, useRef } from 'react';
import { Upload, Download, FileText, Image as ImageIcon, Wand2, ChevronDown, ChevronRight } from 'lucide-react';
import { exportToPdf, exportToImage } from '../utils/export';
import yaml from 'js-yaml';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import type { FileType } from '../types';

interface ToolbarProps {
    setCode: (code: string) => void;
    code: string;
    fileType: FileType;
    treeCollapsed: boolean | number;
    setTreeCollapsed: (collapsed: boolean | number) => void;
    setTreeForceUpdate: (updater: (prev: number) => number) => void;
}

export function Toolbar({ setCode, code, fileType, setTreeCollapsed, setTreeForceUpdate }: ToolbarProps) {
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
        if (type === 'pdf') {
            exportToPdf();
        } else {
            exportToImage('viewer-container', `export-${Date.now()}`);
        }
        setShowExportMenu(false);
    };

    const handleFormat = () => {
        try {
            if (fileType === 'json') {
                const formatted = JSON.stringify(JSON.parse(code), null, 2);
                setCode(formatted);
            } else if (fileType === 'yaml') {
                const parsed = yaml.load(code);
                const formatted = yaml.dump(parsed);
                setCode(formatted);
            } else if (fileType === 'xml') {
                const parser = new XMLParser({
                    ignoreAttributes: false,
                    parseAttributeValue: true
                });
                const parsed = parser.parse(code);

                const builder = new XMLBuilder({
                    ignoreAttributes: false,
                    format: true,
                    indentBy: '  '
                });
                const formatted = builder.build(parsed);
                setCode(formatted);
            }
        } catch (e) {
            console.error('Format error:', e);
        }
    };

    const handleExpandCollapse = (isCollapsed: boolean) => {
        setTreeCollapsed(isCollapsed);
        setTreeForceUpdate(prev => prev + 1);
    };

    return (
        <div className="h-14 bg-gray-900 border-b border-gray-700 flex items-center px-4 justify-between relative z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-lg">
                    <FileText size={24} />
                    <span>LiveDoc</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {['json', 'yaml', 'xml'].includes(fileType) && (
                    <button
                        onClick={handleFormat}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded border border-gray-700 transition-colors"
                        title="Format Document"
                    >
                        <Wand2 size={16} />
                        <span>Prettify</span>
                    </button>
                )}

                {['json', 'yaml', 'xml'].includes(fileType) && (
                    <>
                        <div className="h-6 w-px bg-gray-600"></div>
                        <button
                            onClick={() => handleExpandCollapse(false)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded border border-gray-700 transition-colors"
                        >
                            <ChevronDown size={16} />
                            <span>Expand All</span>
                        </button>
                        <button
                            onClick={() => handleExpandCollapse(true)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded border border-gray-700 transition-colors"
                        >
                            <ChevronRight size={16} />
                            <span>Collapse All</span>
                        </button>
                    </>
                )}

                <div className="h-6 w-px bg-gray-600"></div>

                <label className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded border border-gray-700 transition-colors cursor-pointer">
                    <Upload size={16} />
                    <span>Upload</span>
                    <input
                        type="file"
                        className="hidden"
                        accept=".json,.yaml,.yml,.xml,.csv,.md"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const content = e.target?.result as string;
                                setCode(content);
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
                                <FileText size={16} />
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
