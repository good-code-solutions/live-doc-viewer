import Papa from 'papaparse';
import { useMemo } from 'react';

interface CsvVisualizerProps {
    code: string;
}

export function CsvVisualizer({ code }: CsvVisualizerProps) {
    const { data, meta } = useMemo(() => {
        return Papa.parse(code, {
            header: true,
            skipEmptyLines: true,
        });
    }, [code]);

    if (!data || data.length === 0) {
        return <div className="p-4 text-gray-400">No data to display</div>;
    }

    const headers = meta.fields || Object.keys(data[0] as any);

    return (
        <div className="h-full w-full overflow-auto bg-gray-900 p-4">
            <table className="min-w-full text-left text-sm text-gray-300">
                <thead className="bg-gray-800 text-xs uppercase text-gray-400 sticky top-0">
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="px-6 py-3 font-medium">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {data.map((row: any, index) => (
                        <tr key={index} className="hover:bg-gray-800/50">
                            {headers.map((header) => (
                                <td key={`${index}-${header}`} className="px-6 py-4 whitespace-nowrap">
                                    {row[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
