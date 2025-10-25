import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { ICONS } from '../constants';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    onPost: (content: string) => void;
}

const IconButton: React.FC<{ title: string; children: React.ReactNode; onClick?: () => void }> = ({ title, children, onClick }) => (
    <button
        type="button"
        title={title}
        onClick={onClick}
        className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
    >
        {children}
    </button>
);

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, user, onPost }) => {
    const [content, setContent] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Reset content and focus textarea when modal opens
            setContent('');
            setTimeout(() => textareaRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [content]);

    const handlePost = () => {
        if (content.trim()) {
            onPost(content);
        }
    };

    const applyFormat = (format: 'bold' | 'italic' | 'underline') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);

        if (!selectedText) {
            textarea.focus();
            return;
        }

        const formatChars: Record<typeof format, string> = {
            bold: '**',
            italic: '*',
            underline: '__',
        };
        const chars = formatChars[format];
        const formattedText = `${chars}${selectedText}${chars}`;
        
        const newContent = content.substring(0, start) + formattedText + content.substring(end);
        
        setContent(newContent);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + chars.length, end + chars.length);
        }, 0);
    };

    if (!isOpen) return null;

    return (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 animate-fade-in"
          onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700">
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <Button onClick={handlePost} disabled={!content.trim()} className="!py-1.5 !px-5 !font-bold">
                        Post
                    </Button>
                </header>

                <main className="flex-1 p-4 overflow-y-auto">
                    <div className="flex items-start space-x-4">
                        <Avatar src={user.avatar} alt={user.name} />
                        <textarea
                            ref={textareaRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full bg-transparent dark:text-slate-200 focus:outline-none resize-none text-lg placeholder:text-slate-500"
                            rows={3}
                            placeholder="What's happening?"
                        />
                    </div>
                </main>
                
                <footer className="p-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center -ml-2">
                             <IconButton title="Add Image/Video">{ICONS.media}</IconButton>
                             <IconButton title="Add GIF">{ICONS.gif}</IconButton>
                             <IconButton title="Add Document">{ICONS.document}</IconButton>
                         </div>
                         <div className="flex items-center -mr-2">
                            <IconButton title="Bold" onClick={() => applyFormat('bold')}>{ICONS.bold}</IconButton>
                            <IconButton title="Italic" onClick={() => applyFormat('italic')}>{ICONS.italic}</IconButton>
                            <IconButton title="Underline" onClick={() => applyFormat('underline')}>{ICONS.underline}</IconButton>
                         </div>
                    </div>
                </footer>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }

                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};
