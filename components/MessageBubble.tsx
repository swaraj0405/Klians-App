import React from 'react';
import { Message, User } from '../types';
import { Avatar } from './ui/Avatar';
import { ICONS } from '../constants';

interface MessageBubbleProps {
  message: Message | { text: string; sender: User; timestamp: string };
  isOwnMessage: boolean;
  showSenderInfo?: boolean; // For group chats
  onDelete?: () => void;
}

const parseMarkdownToHTML = (text: string): string => {
  let escapedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  escapedText = escapedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  escapedText = escapedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  escapedText = escapedText.replace(/__(.*?)__/g, '<u>$1</u>');

  return escapedText;
};


export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage, showSenderInfo = false, onDelete }) => {
  const bubbleClasses = isOwnMessage
    ? 'bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to text-white'
    : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100';

  const containerClasses = isOwnMessage ? 'flex-row-reverse' : 'flex-row';

  return (
    <div className={`group flex items-end gap-2 ${containerClasses}`}>
      {isOwnMessage && onDelete && (
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 mb-2 flex-shrink-0"
          aria-label="Delete message"
          title="Delete message"
        >
          {ICONS.trash}
        </button>
      )}
       {!isOwnMessage && message.sender && (
            <Avatar src={message.sender.avatar} alt={message.sender.name} size="sm" className={!showSenderInfo ? 'opacity-0' : ''} />
        )}
      <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${bubbleClasses} ${isOwnMessage ? 'rounded-br-none' : 'rounded-bl-none'}`}>
        {showSenderInfo && !isOwnMessage && message.sender && (
            <p className="font-semibold text-sm mb-1 text-red-500 dark:text-red-400">{message.sender.name}</p>
        )}
        <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(message.text) }} />
        <p className={`text-xs mt-1 opacity-70 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};