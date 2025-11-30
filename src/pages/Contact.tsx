import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export function Contact() {
    useEffect(() => {
        document.title = 'Contact JsonFormatStudio - JSON Editor Support & Feedback';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Contact JsonFormatStudio for support with our JSON editor, YAML viewer, XML parser tools. Get help, report bugs, or suggest features for our developer tools.');
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
                    <h1 className="text-4xl font-bold mb-6">Contact JsonFormatStudio</h1>
                </header>

                <main>
                    <p className="text-lg text-gray-300 mb-8">
                        Have questions about our JSON editor, need help with data formatting, or found a bug? We'd love to hear from you!
                    </p>

                    <form
                        name="contact"
                        method="POST"
                        data-netlify="true"
                        className="space-y-6"
                    >
                        <input type="hidden" name="form-name" value="contact" />
                        <input type="hidden" name="bot-field" />

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                required
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}
