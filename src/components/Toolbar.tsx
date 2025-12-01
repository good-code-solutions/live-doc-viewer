import { useState, useEffect, useRef } from 'react';
import { Upload, Download, FileText, Image as ImageIcon, Wand2, ChevronDown, ChevronRight, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { exportToPdf, exportToImage } from '../utils/export';
import { jsonToToon, toonToJson } from '../utils/toon';
import yaml from 'js-yaml';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import type { FileType } from '../types';
import { calculateTokenSavings } from '../utils/tokenCounter';

interface ToolbarProps {
    setCode: (code: string) => void;
    code: string;
    fileType: FileType;
    treeCollapsed: boolean | number;
    setTreeCollapsed: (collapsed: boolean | number) => void;
    setTreeForceUpdate: (updater: (prev: number) => number) => void;
    updateContent: (type: FileType, content: string) => void;
    showToast: (message: string) => void;
}

export function Toolbar({ setCode, code, fileType, setTreeCollapsed, setTreeForceUpdate, updateContent, showToast }: ToolbarProps) {
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [showToonTooltip, setShowToonTooltip] = useState(false);
    const exportMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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
            } else if (fileType === 'toon') {
                // Toon is already formatted by nature of generation, but we can re-generate it
                // by parsing to JSON and back to Toon if needed, or just leave it as is.
                // For now, let's try to re-format it via round trip to ensure validity
                const formatted = jsonToToon(toonToJson(code));
                if (!formatted.startsWith('Error')) {
                    setCode(formatted);
                }
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
                <Link
                    to="/json"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold text-lg transition-colors cursor-pointer"
                    title="Go to JSON Editor"
                >
                    <FileText size={24} />
                    <span>JsonFormatStudio</span>
                </Link>

                {/* Privacy Badge */}
                <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-xs font-medium">
                    <Shield size={12} />
                    <span>100% Client-Side</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {fileType === 'json' && (
                    <div className="relative">
                        <button
                            onMouseEnter={() => setShowToonTooltip(true)}
                            onMouseLeave={() => setShowToonTooltip(false)}
                            onClick={() => {
                                setShowToonTooltip(false); // Hide tooltip on click
                                const converted = jsonToToon(code);
                                if (!converted.startsWith('Error')) {
                                    updateContent('toon', converted);

                                    // Calculate and show token savings
                                    const savings = calculateTokenSavings(code, converted);
                                    showToast(
                                        `✨ Converted to TOON! Saved ${savings.saved} tokens (${savings.percentage}% reduction) • ${savings.jsonTokens} → ${savings.toonTokens} tokens`
                                    );

                                    navigate('/toon');
                                }
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded transition-colors"
                        >
                            <Wand2 size={16} />
                            <span>To TOON</span>
                        </button>

                        {showToonTooltip && (() => {
                            try {
                                const converted = jsonToToon(code);
                                if (!converted.startsWith('Error')) {
                                    const savings = calculateTokenSavings(code, converted);
                                    return (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 border border-purple-500/50 rounded-lg shadow-xl whitespace-nowrap pointer-events-none" style={{ zIndex: 9999 }}>
                                            <div className="text-xs font-semibold text-purple-300 mb-1">Convert to TOON</div>
                                            <div className="text-xs text-gray-300">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-green-400 font-semibold">↓ {savings.saved} tokens</span>
                                                    <span className="text-gray-500">•</span>
                                                    <span className="text-purple-400">{savings.percentage}% smaller</span>
                                                </div>
                                                <div className="text-gray-400 mt-1">
                                                    {savings.jsonTokens} → {savings.toonTokens} tokens
                                                </div>
                                            </div>
                                            {/* Arrow */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px">
                                                <div className="border-4 border-transparent border-b-gray-800"></div>
                                            </div>
                                        </div>
                                    );
                                }
                            } catch {
                                return null;
                            }
                            return null;
                        })()}
                    </div>
                )}

                {(fileType === 'yaml' || fileType === 'xml') && (
                    <div className="relative">
                        <button
                            onMouseEnter={() => setShowToonTooltip(true)}
                            onMouseLeave={() => setShowToonTooltip(false)}
                            onClick={() => {
                                setShowToonTooltip(false);
                                try {
                                    let jsonObj;
                                    if (fileType === 'yaml') {
                                        jsonObj = yaml.load(code);
                                    } else { // xml
                                        const parser = new XMLParser({
                                            ignoreAttributes: false,
                                            parseAttributeValue: true
                                        });
                                        jsonObj = parser.parse(code);

                                        // Remove XML declaration if present
                                        if (jsonObj && jsonObj['?xml']) {
                                            delete jsonObj['?xml'];
                                        }
                                    }

                                    const jsonStr = JSON.stringify(jsonObj, null, 2);
                                    const converted = jsonToToon(jsonStr);

                                    if (!converted.startsWith('Error')) {
                                        updateContent('toon', converted);

                                        const savings = calculateTokenSavings(jsonStr, converted);
                                        showToast(
                                            `✨ Converted to TOON! Saved ${savings.saved} tokens (${savings.percentage}% reduction) • ${savings.jsonTokens} → ${savings.toonTokens} tokens`
                                        );

                                        navigate('/toon');
                                    }
                                } catch (e) {
                                    console.error('Conversion error:', e);
                                }
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded transition-colors"
                        >
                            <Wand2 size={16} />
                            <span>To TOON</span>
                        </button>

                        {showToonTooltip && (() => {
                            try {
                                let jsonObj;
                                if (fileType === 'yaml') {
                                    jsonObj = yaml.load(code);
                                } else {
                                    const parser = new XMLParser({
                                        ignoreAttributes: false,
                                        parseAttributeValue: true
                                    });
                                    jsonObj = parser.parse(code);

                                    // Remove XML declaration if present
                                    if (jsonObj && jsonObj['?xml']) {
                                        delete jsonObj['?xml'];
                                    }
                                }
                                const jsonStr = JSON.stringify(jsonObj, null, 2);
                                const converted = jsonToToon(jsonStr);

                                if (!converted.startsWith('Error')) {
                                    const savings = calculateTokenSavings(jsonStr, converted);
                                    return (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 border border-purple-500/50 rounded-lg shadow-xl whitespace-nowrap pointer-events-none" style={{ zIndex: 9999 }}>
                                            <div className="text-xs font-semibold text-purple-300 mb-1">Convert to TOON</div>
                                            <div className="text-xs text-gray-300">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-green-400 font-semibold">↓ {savings.saved} tokens</span>
                                                    <span className="text-gray-500">•</span>
                                                    <span className="text-purple-400">{savings.percentage}% smaller</span>
                                                </div>
                                                <div className="text-gray-400 mt-1">
                                                    {savings.jsonTokens} → {savings.toonTokens} tokens
                                                </div>
                                            </div>
                                            {/* Arrow */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px">
                                                <div className="border-4 border-transparent border-b-gray-800"></div>
                                            </div>
                                        </div>
                                    );
                                }
                            } catch {
                                return null;
                            }
                            return null;
                        })()}
                    </div>
                )}

                {['json', 'yaml', 'xml', 'toon'].includes(fileType) && (
                    <button
                        onClick={handleFormat}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded border border-gray-700 transition-colors"
                        title="Format Document"
                    >
                        <Wand2 size={16} />
                        <span>Prettify</span>
                    </button>
                )}

                {['json', 'yaml', 'xml', 'toon'].includes(fileType) && (
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
