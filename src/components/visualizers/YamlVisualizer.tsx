import yaml from 'js-yaml';
import { JsonVisualizer } from './JsonVisualizer';
import { useMemo } from 'react';

interface YamlVisualizerProps {
    code: string;
}

export function YamlVisualizer({ code }: YamlVisualizerProps) {
    const data = useMemo(() => {
        try {
            return yaml.load(code);
        } catch (e) {
            return { error: 'Invalid YAML', message: (e as Error).message };
        }
    }, [code]);

    return <JsonVisualizer data={data} />;
}
