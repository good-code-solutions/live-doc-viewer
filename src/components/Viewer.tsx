import type { FileType } from '../types';
import { JsonVisualizer } from './visualizers/JsonVisualizer';
import { YamlVisualizer } from './visualizers/YamlVisualizer';
import { XmlVisualizer } from './visualizers/XmlVisualizer';
import { CsvVisualizer } from './visualizers/CsvVisualizer';
import { MarkdownVisualizer } from './visualizers/MarkdownVisualizer';

interface ViewerProps {
    code: string;
    fileType: FileType;
    treeCollapsed?: boolean | number;
    treeTheme?: 'monokai' | 'ocean' | 'rjv-default';
    treeForceUpdate?: number;
}

export function Viewer({ code, fileType, treeCollapsed, treeTheme, treeForceUpdate }: ViewerProps) {
    const renderVisualizer = () => {
        switch (fileType) {
            case 'json':
                try {
                    const data = JSON.parse(code);
                    return <JsonVisualizer
                        data={data}
                        collapsed={treeCollapsed}
                        theme={treeTheme}
                        forceUpdate={treeForceUpdate}
                    />;
                } catch (e) {
                    const error = e as Error;
                    const errorMessage = error.message;

                    // Try to extract position from error message (e.g., "at position 100" or "line 5 column 26")
                    let context = '';
                    const positionMatch = errorMessage.match(/at position (\d+)/);

                    if (positionMatch) {
                        const pos = parseInt(positionMatch[1], 10);
                        const start = Math.max(0, pos - 20);
                        const end = Math.min(code.length, pos + 20);
                        context = code.substring(start, end);

                        // Highlight the error position
                        const pointer = pos - start;
                        context = `${context.slice(0, pointer)}➤${context.slice(pointer)}`;
                    }

                    return (
                        <div className="p-4 text-red-400 font-mono text-sm overflow-auto">
                            <div className="font-bold mb-2">Invalid JSON</div>
                            <div className="mb-4">{errorMessage}</div>
                            {context && (
                                <div className="bg-gray-800 p-4 rounded border border-gray-700">
                                    <div className="text-gray-500 mb-1 text-xs">Error Context:</div>
                                    <pre className="whitespace-pre-wrap break-all">
                                        {context}
                                    </pre>
                                </div>
                            )}
                        </div>
                    );
                }
            case 'yaml':
                return <YamlVisualizer
                    code={code}
                    collapsed={treeCollapsed}
                    theme={treeTheme}
                    forceUpdate={treeForceUpdate}
                />;
            case 'xml':
                return <XmlVisualizer
                    code={code}
                    collapsed={treeCollapsed}
                    theme={treeTheme}
                    forceUpdate={treeForceUpdate}
                />;
            case 'csv':
                return <CsvVisualizer code={code} />;
            case 'markdown':
                return <MarkdownVisualizer code={code} />;
            default:
                return <div className="p-4 text-gray-400">Unsupported format</div>;
        }
    };

    return (
        <div id="viewer-container" className="h-full w-full bg-gray-900 overflow-hidden">
            {renderVisualizer()}
        </div>
    );
}
