import { JsonVisualizer } from './JsonVisualizer';
import { toonToJson } from '../../utils/toon';

interface ToonVisualizerProps {
    code: string;
    treeCollapsed: boolean | number;
    treeForceUpdate: number;
}

export function ToonVisualizer({ code, treeCollapsed, treeForceUpdate }: ToonVisualizerProps) {
    // Decode Toon to JSON for visualization
    const json = toonToJson(code);

    if (json.startsWith('Error:')) {
        return (
            <div className="p-4 text-red-400 font-mono text-sm">
                <div className="font-bold mb-2">Invalid Toon</div>
                <div>{json}</div>
            </div>
        );
    }

    try {
        const data = JSON.parse(json);
        return (
            <JsonVisualizer
                data={data}
                collapsed={treeCollapsed}
                forceUpdate={treeForceUpdate}
            />
        );
    } catch (e) {
        return (
            <div className="p-4 text-red-400 font-mono text-sm">
                <div className="font-bold mb-2">Error</div>
                <div>Failed to parse converted JSON</div>
            </div>
        );
    }
}
