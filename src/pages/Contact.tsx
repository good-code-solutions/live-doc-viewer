import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, Twitter } from 'lucide-react';

export function Contact() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-2xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
                    <ArrowLeft size={20} />
                    Back to Editor
                </Link>

                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

                <p className="text-lg text-gray-300 mb-8">
                    Have questions, suggestions, or found a bug? We'd love to hear from you!
                </p>

                <div className="grid gap-6">
                    <a href="mailto:support@livedoc.com" className="flex items-center gap-4 p-6 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors border border-gray-700">
                        <div className="p-3 bg-blue-500/10 rounded-full text-blue-400">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Email Support</h3>
                            <p className="text-gray-400">support@livedoc.com</p>
                        </div>
                    </a>

                    <a href="https://github.com/good-code-solutions/live-doc-viewer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors border border-gray-700">
                        <div className="p-3 bg-gray-700 rounded-full text-white">
                            <Github size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">GitHub</h3>
                            <p className="text-gray-400">Report issues and contribute</p>
                        </div>
                    </a>

                    <a href="https://twitter.com/livedoc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors border border-gray-700">
                        <div className="p-3 bg-blue-400/10 rounded-full text-blue-400">
                            <Twitter size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Twitter</h3>
                            <p className="text-gray-400">Follow us for updates</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
