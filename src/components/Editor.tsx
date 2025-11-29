import MonacoEditor from '@monaco-editor/react';
import type { FileType } from '../types';

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
        <div className="h-full w-full">
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
    );
}
