import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { ICONS } from '../constants';
import { ComposeWindowState } from '../pages/MailboxPage';

export interface ComposeMailData {
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string;
    body: string;
}

interface ComposeMailProps {
    windowState: ComposeWindowState;
    onWindowStateChange: (state: ComposeWindowState) => void;
    onClose: () => void;
    onSend: (data: ComposeMailData) => void;
}

const FormatButton: React.FC<{ onClick: () => void, children: React.ReactNode, title: string, className?: string }> = ({ onClick, children, title, className = '' }) => (
    <button
        type="button"
        onClick={onClick}
        onMouseDown={e => e.preventDefault()} // Prevent editor from losing focus
        className={`p-2 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 ${className}`}
        title={title}
    >
        {children}
    </button>
);

const RecipientInput: React.FC<{
    label: string;
    recipients: string[];
    setRecipients: (recipients: string[]) => void;
}> = ({ label, recipients, setRecipients }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (['Enter', ',', ' '].includes(e.key) && inputValue) {
            e.preventDefault();
            const newRecipient = inputValue.trim();
            if (newRecipient && !recipients.includes(newRecipient)) {
                setRecipients([...recipients, newRecipient]);
            }
            setInputValue('');
        } else if (e.key === 'Backspace' && !inputValue && recipients.length > 0) {
            setRecipients(recipients.slice(0, -1));
        }
    };
    
    const removeRecipient = (index: number) => {
        setRecipients(recipients.filter((_, i) => i !== index));
    };

    return (
        <div className="flex items-start border-b border-slate-200 dark:border-slate-700 py-2">
            <label className="text-sm text-slate-500 dark:text-slate-400 pt-1.5">{label}</label>
            <div className="flex-1 flex flex-wrap items-center gap-1 pl-2">
                {recipients.map((email, index) => (
                    <div key={index} className="flex items-center bg-slate-200 dark:bg-slate-600 rounded-full text-sm px-2 py-0.5">
                        <span>{email}</span>
                        <button onClick={() => removeRecipient(index)} className="ml-1.5 text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100">
                          &times;
                        </button>
                    </div>
                ))}
                <input
                    type="email"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent focus:outline-none min-w-[100px] text-sm py-1"
                />
            </div>
        </div>
    );
};

export const ComposeMail: React.FC<ComposeMailProps> = ({ windowState, onWindowStateChange, onClose, onSend }) => {
    const [to, setTo] = useState<string[]>([]);
    const [cc, setCc] = useState<string[]>([]);
    const [bcc, setBcc] = useState<string[]>([]);
    const [subject, setSubject] = useState('');
    const [showCcBcc, setShowCcBcc] = useState(false);
    
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (windowState === 'normal' || windowState === 'maximized') {
            document.body.style.setProperty('--compose-mail-height', '500px');
        }
    }, [windowState]);

    const handleSend = () => {
        if (to.length === 0 && cc.length === 0 && bcc.length === 0) {
            alert('Please add at least one recipient.');
            return;
        }
        onSend({
            to,
            cc,
            bcc,
            subject,
            body: editorRef.current?.innerHTML || '',
        });
    };
    
    const handleFormat = (command: string) => {
        document.execCommand(command, false);
        editorRef.current?.focus();
    };

    const windowClasses = {
        normal: 'fixed inset-0 w-full h-full md:bottom-0 md:right-4 md:w-[580px] md:h-[500px] md:inset-auto md:shadow-2xl md:rounded-t-lg z-40',
        minimized: 'fixed bottom-0 right-4 w-[280px] h-12 shadow-2xl rounded-t-lg z-40',
        maximized: 'fixed inset-0 w-full h-full z-50',
    };
    
    const toggleMaximize = () => {
        onWindowStateChange(windowState === 'maximized' ? 'normal' : 'maximized');
    }

    return (
        <div className={`flex flex-col bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 transition-all duration-300 ${windowClasses[windowState]}`}>
            {/* Header */}
             <div
                className="flex justify-between items-center bg-slate-700 dark:bg-slate-900 text-white px-2 md:px-4 py-2 md:rounded-t-lg"
            >
                {/* Mobile Header */}
                <div className="flex md:hidden items-center justify-between w-full">
                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2">
                        {React.cloneElement(ICONS.chevronLeft, {className: "h-6 w-6"})}
                    </button>
                    <h3 className="text-lg font-semibold">New Message</h3>
                    <div className="flex items-center">
                        <button onClick={() => {}} className="p-2">{React.cloneElement(ICONS.attachment, {className: "h-5 w-5"})}</button>
                        <Button onClick={handleSend} className="!py-1 !px-3 !text-sm">Send</Button>
                    </div>
                </div>
                
                {/* Desktop Header */}
                <div
                    className="hidden md:flex justify-between items-center w-full"
                    onClick={() => windowState === 'minimized' && onWindowStateChange('normal')}
                >
                    <h3 className="text-sm font-semibold">New Message</h3>
                    <div className="flex items-center space-x-3">
                        <button onClick={(e) => { e.stopPropagation(); onWindowStateChange('minimized'); }} className="hover:text-slate-300">{ICONS.minimize}</button>
                        <button onClick={(e) => { e.stopPropagation(); toggleMaximize(); }} className="hover:text-slate-300">{ICONS.maximize}</button>
                        <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="hover:text-slate-300">{ICONS.close}</button>
                    </div>
                </div>
            </div>

            {windowState !== 'minimized' && (
                <>
                    {/* Content */}
                    <div className="flex-1 flex flex-col p-4 overflow-hidden">
                        <div className="flex items-center">
                            <RecipientInput label="To" recipients={to} setRecipients={setTo} />
                             <div className="ml-auto pl-2 flex-shrink-0">
                                <button onClick={() => setShowCcBcc(!showCcBcc)} className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
                                    Cc/Bcc
                                </button>
                            </div>
                        </div>

                        {showCcBcc && (
                            <>
                                <RecipientInput label="Cc" recipients={cc} setRecipients={setCc} />
                                <RecipientInput label="Bcc" recipients={bcc} setRecipients={setBcc} />
                            </>
                        )}

                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full bg-transparent focus:outline-none py-2 border-b border-slate-200 dark:border-slate-700 text-sm"
                        />

                        <div
                            ref={editorRef}
                            contentEditable
                            className="flex-1 w-full bg-transparent focus:outline-none py-4 text-sm resize-none overflow-y-auto"
                            aria-label="Email body"
                        />
                    </div>
                    {/* Footer */}
                    <div className="flex justify-between items-center p-3 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
                            <Button onClick={handleSend} className="!py-2 !px-6 hidden md:flex">Send</Button>
                             <FormatButton onClick={() => handleFormat('bold')} title="Bold">{ICONS.bold}</FormatButton>
                             <FormatButton onClick={() => handleFormat('italic')} title="Italic">{ICONS.italic}</FormatButton>
                             <FormatButton onClick={() => handleFormat('underline')} title="Underline">{ICONS.underline}</FormatButton>
                             <div className="h-5 w-px bg-slate-200 dark:bg-slate-600 mx-1"></div>
                             <FormatButton onClick={() => handleFormat('justifyLeft')} title="Align Left">{ICONS.alignLeft}</FormatButton>
                             <FormatButton onClick={() => handleFormat('justifyCenter')} title="Align Center">{ICONS.alignCenter}</FormatButton>
                             <FormatButton onClick={() => handleFormat('justifyRight')} title="Align Right">{ICONS.alignRight}</FormatButton>
                             <div className="h-5 w-px bg-slate-200 dark:bg-slate-600 mx-1"></div>
                             <FormatButton onClick={() => handleFormat('insertUnorderedList')} title="Bulleted List">{ICONS.listUnordered}</FormatButton>
                             <FormatButton onClick={() => handleFormat('insertOrderedList')} title="Numbered List">{ICONS.listOrdered}</FormatButton>
                        </div>
                        <div className="flex items-center space-x-2">
                             <FormatButton onClick={() => {}} title="Attach file" className="hidden md:flex">{ICONS.attachment}</FormatButton>
                             <FormatButton onClick={onClose} title="Discard draft">{ICONS.trash}</FormatButton>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};