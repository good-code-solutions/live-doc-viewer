import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    onDismiss: () => void;
    duration?: number;
}

export function Toast({ message, onDismiss, duration = 5000 }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onDismiss, 300); // Wait for fade out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onDismiss]);

    return (
        <div
            className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl px-4 py-3 flex items-center gap-3 transition-opacity duration-300 z-50 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div className="text-sm text-white">{message}</div>
            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(onDismiss, 300);
                }}
                className="text-gray-400 hover:text-white transition-colors"
            >
                <X size={16} />
            </button>
        </div>
    );
}
