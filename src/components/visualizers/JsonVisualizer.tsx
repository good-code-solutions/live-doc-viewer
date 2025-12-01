import ReactJson, { type ThemeKeys } from 'react-json-view';
import { useState, useMemo } from 'react';
import { JSONPath } from 'jsonpath-plus';
import { Search, X, ChevronDown, ChevronUp, TreePine } from 'lucide-react';

interface JsonVisualizerProps {
    data: object;
    collapsed?: boolean | number;
    theme?: ThemeKeys;
    forceUpdate?: number;
}

// Generate JSONPath suggestions from data structure
function generatePathSuggestions(data: any, maxDepth = 3): string[] {
    const paths = new Set<string>();
    paths.add('$'); // Root

    function traverse(obj: any, currentPath: string, depth: number) {
        if (depth > maxDepth) return;

        if (Array.isArray(obj)) {
            paths.add(`${currentPath}[*]`);
            if (obj.length > 0) {
                paths.add(`${currentPath}[0]`);
                traverse(obj[0], `${currentPath}[0]`, depth + 1);

                // Add wildcard patterns for nested properties
                if (obj[0] && typeof obj[0] === 'object') {
                    Object.keys(obj[0]).forEach(key => {
                        paths.add(`${currentPath}[*].${key}`);
                    });
                }
            }
        } else if (obj && typeof obj === 'object') {
            Object.keys(obj).forEach(key => {
                const newPath = currentPath === '$' ? `$.${key}` : `${currentPath}.${key}`;
                paths.add(newPath);
                traverse(obj[key], newPath, depth + 1);
            });
        }
    }

    traverse(data, '$', 0);
    return Array.from(paths).sort();
}

export function JsonVisualizer({ data, collapsed = 2, theme = 'monokai', forceUpdate = 0 }: JsonVisualizerProps) {
    const [jsonPath, setJsonPath] = useState('$');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [showTester, setShowTester] = useState(false);

    const isLightTheme = ['rjv-default'].includes(theme);
    const bgColor = isLightTheme ? 'bg-white' : 'bg-[#1e1e1e]';

    const suggestions = useMemo(() => generatePathSuggestions(data), [data]);

    const result = useMemo(() => {
        try {
            const matches = JSONPath({ path: jsonPath, json: data });
            return { success: true, data: matches, count: matches.length };
        } catch (error) {
            return { success: false, error: (error as Error).message, count: 0 };
        }
    }, [jsonPath, data]);

    const handleInputChange = (value: string) => {
        setJsonPath(value);
        setIsTyping(true);
        setShowSuggestions(false);
    };

    const handleClear = () => {
        setJsonPath('$');
        setIsTyping(false);
        setShowSuggestions(false);
    };

    return (
        <div className={`h-full w-full flex flex-col ${bgColor}`}>
            {/* Tree Visualizer Header */}
            <div className="px-3 py-2 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                    <TreePine size={14} className="text-gray-400" />
                    <span>Tree Visualizer</span>
                </div>
            </div>

            {/* Tree View */}
            <div className="flex-1 overflow-auto p-4">
                <ReactJson
                    key={forceUpdate}
                    src={result.success && result.count > 0 && jsonPath !== '$' ? result.data : data}
                    theme={theme}
                    displayDataTypes={false}
                    enableClipboard={true}
                    collapsed={collapsed}
                    name={result.success && result.count > 0 && jsonPath !== '$' ? 'results' : 'root'}
                />
            </div>

            {/* JSONPath Tester Toggle */}
            <div className="px-3 py-2 border-t border-gray-700 bg-gray-800">
                <button
                    onClick={() => setShowTester(!showTester)}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                >
                    {showTester ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    <Search size={14} className="text-gray-400" />
                    <span>JSONPath Tester</span>
                    {result.success && jsonPath !== '$' && (
                        <span className="text-blue-400">
                            {result.count} {result.count === 1 ? 'match' : 'matches'}
                        </span>
                    )}
                </button>
            </div>

            {/* JSONPath Tester Panel */}
            {showTester && (
                <div className="p-3 border-t border-gray-700 bg-gray-800 space-y-2">
                    <div className="relative">
                        <input
                            type="text"
                            value={jsonPath}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onFocus={() => {
                                if (!isTyping) {
                                    setShowSuggestions(true);
                                }
                            }}
                            onBlur={() => {
                                setTimeout(() => {
                                    setShowSuggestions(false);
                                    setIsTyping(false);
                                }, 200);
                            }}
                            placeholder="Enter JSONPath expression..."
                            className="w-full px-3 py-1.5 pr-8 text-sm bg-gray-900 text-white border border-gray-600 rounded focus:ring-1 focus:ring-blue-500 outline-none font-mono"
                        />

                        {jsonPath !== '$' && (
                            <button
                                onClick={handleClear}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                title="Clear path"
                            >
                                <X size={16} />
                            </button>
                        )}

                        {showSuggestions && !isTyping && (
                            <div className="absolute bottom-full left-0 right-0 mb-1 max-h-48 overflow-y-auto bg-gray-900 border border-gray-600 rounded shadow-lg z-10">
                                {suggestions.map((path) => (
                                    <button
                                        key={path}
                                        onClick={() => {
                                            setJsonPath(path);
                                            setShowSuggestions(false);
                                            setIsTyping(false);
                                        }}
                                        className="w-full px-3 py-1.5 text-left text-xs font-mono text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                        {path}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {!result.success && (
                        <div className="text-xs text-red-400 font-mono">{result.error}</div>
                    )}
                </div>
            )}
        </div>
    );
}
