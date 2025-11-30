import MonacoEditor from '@monaco-editor/react';
import type { FileType } from '../types';
import { Code } from 'lucide-react';

interface EditorProps {
    code: string;
    setCode: (code: string) => void;
    fileType: FileType;
}

export function Editor({ code, setCode, fileType }: EditorProps) {
    const handleEditorChange = (value: string | undefined) => {
        setCode(value || '');
    };

    return (
        <div className="h-full w-full flex flex-col">
            {/* Editor Header */}
            <div className="px-3 py-2 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                    <Code size={14} className="text-gray-400" />
                    <span>Editor</span>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1">
                <MonacoEditor
                    height="100%"
                    language={fileType === 'markdown' ? 'markdown' : fileType}
                    theme="vs-dark"
                    value={code}
                    onChange={handleEditorChange}
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
