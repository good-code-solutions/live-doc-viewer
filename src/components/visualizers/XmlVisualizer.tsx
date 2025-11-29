import { XMLParser } from 'fast-xml-parser';
import { JsonVisualizer } from './JsonVisualizer';
import { useMemo } from 'react';

interface XmlVisualizerProps {
    code: string;
}

export function XmlVisualizer({ code }: XmlVisualizerProps) {
    const data = useMemo(() => {
        try {
            const parser = new XMLParser();
            return parser.parse(code);
        } catch (e) {
            return { error: 'Invalid XML', message: (e as Error).message };
        }
    }, [code]);

    return <JsonVisualizer data={data} />;
}
