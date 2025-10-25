import React, { useState } from 'react';
import { Post } from '../types';
import { Avatar } from './ui/Avatar';
import { ICONS } from '../constants';
import { Card } from './ui/Card';

const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    const interval = seconds / 86400;
    if (interval > 7) return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    if (interval > 1) return `${Math.floor(interval)}d ago`;
    const hours = Math.floor(seconds / 3600);
    if (hours > 1) return `${hours}h ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes > 1) return `${minutes}m ago`;
    return 'Just now';
};

const parseMarkdownToHTML = (text: string): string => {
  let escapedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  escapedText = escapedText
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/__(.*?)__/g, '<u>$1</u>');
    
  // Match hashtags and wrap them in links
  escapedText = escapedText.replace(/(#\w+)/g, '<a href="#" class="text-red-500 hover:underline">$1</a>');

  return escapedText;
};

const ActionButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    isActive?: boolean;
}> = ({ icon, label, onClick, isActive }) => {
    const activeClasses = 'text-red-500 dark:text-red-400';
    return (
        <button
            onClick={onClick}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive ? activeClasses : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};


export const FeedPostCard: React.FC<{ post: Post }> = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);

    const handleLike = () => {
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        setIsLiked(!isLiked);
    };

    return (
        <Card className="mb-4">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                    <Avatar src={post.author.avatar} alt={post.author.name} size="md" />
                    <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{post.author.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">@{post.author.username} · {timeAgo(post.timestamp)}</p>
                    </div>
                </div>
                <button className="p-2 -mr-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                    {ICONS.moreHorizontal}
                </button>
            </div>

            {/* Post Content */}
            <div 
                className="px-4 pb-3 text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(post.content) }}
             />

            {/* Post Image */}
            {post.image && (
                <div className="bg-slate-200 dark:bg-slate-700">
                    <img
                        src={post.image}
                        alt={post.imageDescription || 'Post image'}
                        className="w-full h-auto max-h-[400px] object-cover"
                    />
                </div>
            )}

            {/* Stats */}
            {(likeCount > 0 || post.comments > 0) && (
                 <div className="flex justify-between items-center px-4 pt-3 text-sm text-slate-500 dark:text-slate-400">
                    <span>{likeCount.toLocaleString()} Likes</span>
                    <span>{post.comments.toLocaleString()} Comments</span>
                </div>
            )}
           
            {/* Actions */}
            <div className="px-2 py-1 mt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-around items-center">
                    <ActionButton
                        icon={isLiked ? React.cloneElement(ICONS.likeSolid, { className: "h-5 w-5" }) : ICONS.like}
                        label="Like"
                        onClick={handleLike}
                        isActive={isLiked}
                    />
                     <ActionButton
                        icon={ICONS.comment}
                        label="Comment"
                    />
                     <ActionButton
                        icon={ICONS.share}
                        label="Share"
                    />
                </div>
            </div>
        </Card>
    );
};