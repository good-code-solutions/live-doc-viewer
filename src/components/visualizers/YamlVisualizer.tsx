import yaml from 'js-yaml';
import { JsonVisualizer } from './JsonVisualizer';
import { useMemo } from 'react';
import type { ThemeKeys } from 'react-json-view';

interface YamlVisualizerProps {
    code: string;
    collapsed?: boolean | number;
    theme?: ThemeKeys;
    forceUpdate?: number;
}

export function YamlVisualizer({ code, collapsed, theme, forceUpdate }: YamlVisualizerProps) {
    const data = useMemo(() => {
        try {
            return yaml.load(code);
        } catch (e) {
            return { error: 'Invalid YAML', message: (e as Error).message };
        }
    }, [code]);

    return <JsonVisualizer data={data as object} collapsed={collapsed} theme={theme} forceUpdate={forceUpdate} />;
}
