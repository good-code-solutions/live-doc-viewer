import ReactJson from 'react-json-view';

interface JsonVisualizerProps {
    data: object;
}

export function JsonVisualizer({ data }: JsonVisualizerProps) {
    return (
        <div className="h-full w-full overflow-auto p-4 bg-[#1e1e1e]">
            <ReactJson
                src={data}
                theme="monokai"
                style={{ backgroundColor: 'transparent' }}
                displayDataTypes={false}
                enableClipboard={true}
                collapsed={2}
            />
        </div>
    );
}
