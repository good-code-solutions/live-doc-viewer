import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownVisualizerProps {
    code: string;
}

export function MarkdownVisualizer({ code }: MarkdownVisualizerProps) {
    return (
        <div className="h-full w-full overflow-auto p-8 bg-white text-black prose prose-slate max-w-none dark:bg-gray-900 dark:text-gray-100 dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{code}</ReactMarkdown>
        </div>
    );
}
