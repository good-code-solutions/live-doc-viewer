import { XMLParser } from 'fast-xml-parser';
import { JsonVisualizer } from './JsonVisualizer';
import { useMemo } from 'react';
import type { ThemeKeys } from 'react-json-view';

interface XmlVisualizerProps {
    code: string;
    collapsed?: boolean | number;
    theme?: ThemeKeys;
    forceUpdate?: number;
}

export function XmlVisualizer({ code, collapsed, theme, forceUpdate }: XmlVisualizerProps) {
    const data = useMemo(() => {
        try {
            const parser = new XMLParser();
            return parser.parse(code);
        } catch (e) {
            return { error: 'Invalid XML', message: (e as Error).message };
        }
    }, [code]);

    return <JsonVisualizer data={data} collapsed={collapsed} theme={theme} forceUpdate={forceUpdate} />;
}
