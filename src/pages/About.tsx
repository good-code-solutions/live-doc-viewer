import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function About() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-2xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
                    <ArrowLeft size={20} />
                    Back to Editor
                </Link>

                <h1 className="text-4xl font-bold mb-6">About LiveDoc</h1>

                <div className="prose prose-invert">
                    <p className="text-lg text-gray-300 mb-6">
                        LiveDoc is a powerful, real-time document viewer and editor designed for developers who work with multiple data formats.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4">Features</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
                        <li><strong>Multi-format Support:</strong> Seamlessly switch between JSON, YAML, XML, CSV, and Markdown.</li>
                        <li><strong>Live Visualization:</strong> See your data rendered instantly as you type.</li>
                        <li><strong>Error Reporting:</strong> Get detailed error messages with context to fix issues quickly.</li>
                        <li><strong>Export Options:</strong> Export your documents to PDF or Image formats.</li>
                        <li><strong>Privacy First:</strong> All processing happens in your browser. No data is sent to any server.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
                    <p className="text-gray-300">
                        Built with React, TypeScript, Vite, Tailwind CSS, and Monaco Editor.
                    </p>
                </div>
            </div>
        </div>
    );
}
