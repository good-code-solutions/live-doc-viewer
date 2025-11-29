import { Braces, FileCode, Code2, Table, FileText, Info, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { FileType } from '../types';

interface SidebarProps {
    fileType: FileType;
    setFileType: (type: FileType) => void;
}

const formats = [
    { type: 'json' as FileType, icon: Braces, label: 'JSON' },
    { type: 'yaml' as FileType, icon: FileCode, label: 'YAML' },
    { type: 'xml' as FileType, icon: Code2, label: 'XML' },
    { type: 'csv' as FileType, icon: Table, label: 'CSV' },
    { type: 'markdown' as FileType, icon: FileText, label: 'Markdown' },
];

export function Sidebar({ fileType, setFileType }: SidebarProps) {
    const navigate = useNavigate();

    const handleFormatChange = (type: FileType) => {
        setFileType(type);
        navigate(`/${type}`);
    };

    return (
        <div className="w-20 bg-gray-950 border-r border-gray-800 flex flex-col items-center py-6 gap-2">
            {/* Logo */}
            <div className="mb-6 p-2 text-blue-400">
                <FileText size={28} strokeWidth={2} />
            </div>

            {/* Format Icons */}
            <div className="flex-1 flex flex-col gap-2">
                {formats.map(({ type, icon: Icon, label }) => (
                    <button
                        key={type}
                        onClick={() => handleFormatChange(type)}
                        className={`
              group relative p-3 rounded-lg transition-all duration-200
              ${fileType === type
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }
            `}
                        title={label}
                    >
                        <Icon size={24} strokeWidth={fileType === type ? 2.5 : 2} />

                        {/* Tooltip */}
                        <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            {label}
                        </div>
                    </button>
                ))}
            </div>

            {/* Bottom Links */}
            <div className="flex flex-col gap-2 mt-auto pt-6 border-t border-gray-800">
                <Link
                    to="/about"
                    className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all group relative"
                    title="About"
                >
                    <Info size={20} />
                    <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        About
                    </div>
                </Link>

                <Link
                    to="/contact"
                    className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all group relative"
                    title="Contact"
                >
                    <Mail size={20} />
                    <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        Contact
                    </div>
                </Link>
            </div>
        </div>
    );
}
