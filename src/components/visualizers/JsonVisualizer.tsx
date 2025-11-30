import ReactJson, { type ThemeKeys } from 'react-json-view';

interface JsonVisualizerProps {
    data: object;
    collapsed?: boolean | number;
    theme?: ThemeKeys;
    forceUpdate?: number;
}

export function JsonVisualizer({ data, collapsed = 2, theme = 'monokai', forceUpdate = 0 }: JsonVisualizerProps) {
    const isLightTheme = ['rjv-default'].includes(theme);
    const bgColor = isLightTheme ? 'bg-white' : 'bg-[#1e1e1e]';

    return (
        <div className={`h-full w-full overflow-auto p-4 ${bgColor}`}>
            <ReactJson
                key={forceUpdate}
                src={data}
                theme={theme}
                displayDataTypes={false}
                enableClipboard={true}
                collapsed={collapsed}
            />
        </div>
    );
}
