import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export function About() {
    useEffect(() => {
        document.title = 'About JsonFormatStudio - Professional JSON Editor & Data Format Viewer';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Learn about JsonFormatStudio - a professional online JSON editor, YAML viewer, XML parser and CSV formatter. Free developer tool with advanced features for data visualization and validation.');
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-2xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
                    <ArrowLeft size={20} />
                    Back to JsonFormatStudio
                </Link>

                <header>
                    <h1 className="text-4xl font-bold mb-6">About JsonFormatStudio</h1>
                </header>

                <main className="prose prose-invert">
                    <p className="text-lg text-gray-300 mb-6">
                        JsonFormatStudio is a professional, real-time JSON editor and multi-format data viewer designed for developers who work with structured data formats.
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Professional Data Format Tools</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
                            <li><strong>JSON Editor & Validator:</strong> Advanced JSON editing with syntax highlighting, validation, and tree view visualization.</li>
                            <li className="mt-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                                <strong className="text-purple-300">🚀 TOON Conversion:</strong> <span className="text-gray-300">Convert JSON, YAML, or XML to Token-Oriented Object Notation (TOON) format - a compact, LLM-optimized format that can save up to 40% tokens. Perfect for AI applications and reducing API costs!</span>
                            </li>
                            <li><strong>TOON Editor & Viewer:</strong> Compact, human-readable, schema-aware JSON for LLM prompts.</li>
                            <li><strong>YAML Parser & Viewer:</strong> Format and validate YAML documents with real-time error detection.</li>
                            <li><strong>XML Parser & Formatter:</strong> Parse, format and validate XML documents with structured visualization.</li>
                            <li><strong>CSV Data Viewer:</strong> View and format CSV data in organized tables with export options.</li>
                            <li><strong>Markdown Renderer:</strong> Live preview of Markdown documents with GitHub-flavored markdown support.</li>
                            <li><strong>Export Capabilities:</strong> Export your formatted data to PDF, images, and other formats.</li>
                            <li><strong>Privacy-First Design:</strong> All processing happens locally in your browser - no data transmitted to servers.</li>
                            <li><strong>Developer-Friendly:</strong> Syntax highlighting, error reporting, and professional tooling for efficient development workflow.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Why Choose JsonFormatStudio?</h2>
                        <p className="text-gray-300 mb-4">
                            Built specifically for developers, JsonFormatStudio combines the functionality of multiple data format tools into one professional platform. Whether you're debugging JSON APIs, configuring YAML files, parsing XML responses, or analyzing CSV data, our tool provides the advanced features you need.
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
}
