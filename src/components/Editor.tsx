import MonacoEditor from '@monaco-editor/react';
import type { FileType } from '../types';
import { Code, Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { registerToonLanguage } from '../monaco/toonLanguage';

interface EditorProps {
    code: string;
    setCode: (code: string) => void;
    fileType: FileType;
}

export function Editor({ code, setCode, fileType }: EditorProps) {
    const [copySuccess, setCopySuccess] = useState(false);
    
    const handleEditorDidMount = (_editor: any, monaco: any) => {
        // Always register TOON language when Monaco editor mounts (safe to call multiple times)
        registerToonLanguage(monaco);
        
        // If TOON editor, force apply the theme
        if (fileType === 'toon') {
            monaco.editor.setTheme('toon-dark');
        }
    };

    const editorLabels: Record<FileType, string> = {
        json: 'JSON Editor',
        toon: 'TOON Editor',
        yaml: 'YAML Editor',
        xml: 'XML Editor',
        csv: 'CSV Editor',
        markdown: 'Markdown Editor'
    };

    const handleEditorChange = (value: string | undefined) => {
        setCode(value || '');
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleClear = () => {
        setCode('');
    };

    return (
        <div className="h-full w-full flex flex-col bg-gray-900">
            {/* Editor Header */}
            <div className="px-3 py-2 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                        <Code size={14} className="text-gray-400" />
                        <span>{editorLabels[fileType]}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleCopy}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                            title={copySuccess ? 'Copied!' : 'Copy to clipboard'}
                        >
                            <Copy size={14} className={copySuccess ? 'text-green-400' : ''} />
                        </button>
                        <button
                            onClick={handleClear}
                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                            title="Clear editor"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1">
                <MonacoEditor
                    height="100%"
                    language={fileType === 'markdown' ? 'markdown' : fileType}
                    theme={fileType === 'toon' ? 'toon-dark' : 'vs-dark'}
                    value={code}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                    }}
                />
            </div>
        </div>
    );
}
