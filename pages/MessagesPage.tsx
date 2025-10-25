import React, { useState, useEffect, useRef } from 'react';
import { useParams, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { MOCK_CONVERSATIONS, MOCK_GROUPS, ICONS, USERS } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { Avatar } from '../components/ui/Avatar';
import { MessageBubble } from '../components/MessageBubble';
import { Input } from '../components/ui/Input';
import { ChatInput } from '../components/ChatInput';
import { Conversation, Message, Group, User } from '../types';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

const ChatWindow: React.FC<{ 
    conversation: Conversation | undefined, 
    onSendMessage: (conversationId: string, messageText: string) => void,
    onSetMessageToDelete: (details: { convId: string; msgId: string }) => void 
}> = ({ conversation, onSendMessage, onSetMessageToDelete }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom()
    }, [conversation?.messages]);
    
    if (!user) return null;

    if (!conversation) {
        return (
            <div className="flex-1 flex-col items-center justify-center text-slate-500 dark:text-slate-400 hidden md:flex">
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    <h2 className="text-xl font-semibold mt-4">Select a conversation</h2>
                    <p>Start chatting with your friends and colleagues.</p>
                </div>
            </div>
        );
    }
    
    const otherParticipant = conversation.participants.find(p => p.id !== user.id);
    
    const handleSendMessage = (messageText: string) => {
        if (!conversation) return;
        onSendMessage(conversation.id, messageText);
    };

    return (
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-800">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center space-x-3">
                <button onClick={() => navigate('/messages')} className="md:hidden text-slate-500 dark:text-slate-400">
                    {ICONS.chevronLeft}
                </button>
                {otherParticipant && <Avatar src={otherParticipant.avatar} alt={otherParticipant.name} />}
                <div className="flex-1">
                    <h2 className="font-semibold text-base">{otherParticipant?.name}</h2>
                    <p className="text-xs text-green-500">Online</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">{ICONS.info}</button>
                </div>
            </div>
            {/* Messages Area */}
            <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto bg-slate-100 dark:bg-slate-900">
                {conversation.messages.map(msg => (
                    <MessageBubble 
                        key={msg.id} 
                        message={msg} 
                        isOwnMessage={msg.sender?.id === user.id} 
                        onDelete={msg.sender?.id === user.id ? () => onSetMessageToDelete({ convId: conversation.id, msgId: msg.id }) : undefined}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            {/* Input Area */}
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
}

const TabButton: React.FC<{ isActive: boolean; onClick: () => void; children: React.ReactNode }> = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`w-1/2 py-3 text-sm font-semibold text-center transition-colors border-b-2 ${
            isActive
                ? 'border-red-500 text-red-500'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
        }`}
    >
        {children}
    </button>
);

const CreateGroupModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onCreate: (groupName: string, members: User[]) => void;
    currentUser: User;
}> = ({ isOpen, onClose, onCreate, currentUser }) => {
    const [groupName, setGroupName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<User[]>([currentUser]);
    const allUsers = Object.values(USERS);

    useEffect(() => {
        if (!isOpen) {
            setGroupName('');
            setSelectedUsers([currentUser]);
        }
    }, [isOpen, currentUser]);

    const handleToggleUser = (user: User) => {
        setSelectedUsers(prev => 
            prev.some(u => u.id === user.id) 
                ? prev.filter(u => u.id !== user.id)
                : [...prev, user]
        );
    };

    const handleSubmit = () => {
        if(groupName.trim() && selectedUsers.length > 1) {
            onCreate(groupName, selectedUsers);
            onClose();
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Group">
            <div className="space-y-4">
                <Input label="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="e.g., Project Team" />
                <div>
                    <h3 className="text-sm font-medium mb-2">Select Members</h3>
                    <div className="max-h-60 overflow-y-auto space-y-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-md">
                        {allUsers.map(user => (
                            <div key={user.id} className="flex items-center space-x-3 p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-600">
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.some(su => su.id === user.id)}
                                    onChange={() => handleToggleUser(user)}
                                    disabled={user.id === currentUser.id}
                                    className="h-4 w-4 rounded text-red-600 focus:ring-red-500"
                                />
                                <Avatar src={user.avatar} alt={user.name} size="sm" />
                                <div>
                                    <p className="font-semibold text-sm">{user.name}</p>
                                    <p className="text-xs text-slate-500">@{user.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="flex justify-end pt-2">
                    <Button onClick={handleSubmit}>Create Group</Button>
                </div>
            </div>
        </Modal>
    )
}

export const MessagesPage: React.FC = () => {
    const { conversationId } = useParams();
    const { user } = useAuth();
    const location = useLocation();
    const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS.filter(c => !c.isGroup));
    const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
    const [activeTab, setActiveTab] = useState<'messages' | 'groups'>(location.state?.defaultTab || 'messages');
    const [messageToDelete, setMessageToDelete] = useState<{ convId: string; msgId: string } | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const navigate = useNavigate();

    if (!user) return null;

    const userGroups = groups.filter(g => g.members.some(m => m.id === user.id));

    const handleBack = () => {
        if (window.history.length > 2 && window.history.state?.idx > 0) {
            navigate(-1);
        } else {
            navigate('/home', { replace: true });
        }
    };
    
    const activeConversation = conversations.find(c => c.id === conversationId);

    const handleSendMessage = (convId: string, messageText: string) => {
        if (!user) return;
        
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            sender: user,
            text: messageText,
            timestamp: new Date().toISOString(),
            read: true, // Assuming message is read by sender upon sending
        };

        setConversations(prevConvs => 
            prevConvs.map(conv => {
                if (conv.id === convId) {
                    return { ...conv, messages: [...conv.messages, newMessage] };
                }
                return conv;
            })
        );
    };
    
    const handleConfirmDelete = () => {
        if (!messageToDelete) return;

        setConversations(prevConvs =>
            prevConvs.map(conv => {
                if (conv.id === messageToDelete.convId) {
                    const updatedMessages = conv.messages.filter(msg => msg.id !== messageToDelete.msgId);
                    return { ...conv, messages: updatedMessages };
                }
                return conv;
            })
        );

        setMessageToDelete(null);
    };

    const handleCreateGroup = (groupName: string, members: User[]) => {
        if (!user) return;
        const newGroup: Group = {
            id: `group-${Date.now()}`,
            name: groupName,
            avatar: `https://picsum.photos/seed/${groupName}/200`,
            members,
            admins: [user.id],
            messages: []
        };
        setGroups(prevGroups => [newGroup, ...prevGroups]);
    };

    return (
        <>
            <div className="h-full flex text-sm">
                <aside className={`w-full md:w-[320px] lg:w-[360px] flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 ${conversationId ? 'hidden md:flex' : 'flex'}`}>
                    {/* Sidebar Header */}
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                        <div className="md:hidden flex items-center gap-4 mb-4">
                            <button onClick={() => navigate('/home')} className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600">
                                {ICONS.chevronLeft}
                            </button>
                             <h1 className="text-2xl font-bold">Messages</h1>
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-3xl font-bold">Messages</h1>
                        </div>

                        <Input placeholder="Search messages..." className="mt-4" />
                    </div>
                    
                    {/* Mobile Tab switcher */}
                    <div className="md:hidden flex border-b border-slate-200 dark:border-slate-700">
                        <TabButton isActive={activeTab === 'messages'} onClick={() => setActiveTab('messages')}>
                            Messages
                        </TabButton>
                        <TabButton isActive={activeTab === 'groups'} onClick={() => setActiveTab('groups')}>
                            Groups
                        </TabButton>
                    </div>

                    {/* Conversation/Group List */}
                    <div className="flex-1 overflow-y-auto">
                        {/* DM List */}
                        <ul className={activeTab === 'messages' ? 'block' : 'hidden md:block'}>
                            {conversations.map(conv => {
                                 const otherParticipant = conv.participants.find(p => p.id !== user.id);
                                 const lastMessage = conv.messages[conv.messages.length - 1];

                                 return (
                                    <li key={conv.id}>
                                        <NavLink 
                                            to={`/messages/${conv.id}`} 
                                            className={({ isActive }) => `flex items-center p-4 space-x-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-l-4 ${isActive ? 'border-red-500 bg-slate-50 dark:bg-slate-900/50' : 'border-transparent'}`}
                                        >
                                            {otherParticipant && <Avatar src={otherParticipant.avatar} alt={otherParticipant.name} />}
                                            <div className="flex-1 overflow-hidden">
                                                <div className="flex justify-between items-center">
                                                    <p className="font-semibold truncate">{otherParticipant?.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                                <div className="flex justify-between items-center mt-0.5">
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{lastMessage.text}</p>
                                                    {conv.unreadCount > 0 && <span className="text-xs text-white font-bold bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to rounded-full h-5 w-5 flex items-center justify-center">{conv.unreadCount}</span>}
                                                </div>
                                            </div>
                                        </NavLink>
                                    </li>
                                 )
                            })}
                        </ul>
                         {/* Group List (Mobile Only) */}
                        <ul className={activeTab === 'groups' ? 'block md:hidden' : 'hidden'}>
                            {userGroups.map(group => {
                                const lastMessage = group.messages[group.messages.length - 1];
                                return (
                                <li key={group.id}>
                                    <NavLink to={`/groups/${group.id}`} className={({ isActive }) => `flex items-center p-4 space-x-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-l-4 ${isActive ? 'border-red-500 bg-slate-50 dark:bg-slate-900/50' : 'border-transparent'}`}>
                                        <Avatar src={group.avatar} alt={group.name} />
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold truncate">{group.name}</p>
                                                {lastMessage && <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>}
                                            </div>
                                            <div className="flex justify-between items-center mt-0.5">
                                                {lastMessage ? 
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{lastMessage.sender.name}: {lastMessage.text}</p>
                                                    : <p className="text-xs text-slate-500 dark:text-slate-400 italic">No messages yet.</p>
                                                }
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                                )
                            })}
                        </ul>
                    </div>
                </aside>
                <div className={`${conversationId ? 'flex' : 'hidden'} md:flex flex-1`}>
                    <ChatWindow 
                        conversation={activeConversation} 
                        onSendMessage={handleSendMessage} 
                        onSetMessageToDelete={setMessageToDelete}
                    />
                </div>
            </div>
             {activeTab === 'groups' && (
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="md:hidden fixed bottom-20 right-5 h-14 w-14 bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to rounded-full flex items-center justify-center text-white shadow-lg z-20"
                    aria-label="Create new group"
                >
                    {React.cloneElement(ICONS.plus, { className: "h-7 w-7" })}
                </button>
            )}
            <CreateGroupModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateGroup}
                currentUser={user}
            />
            <Modal
                isOpen={!!messageToDelete}
                onClose={() => setMessageToDelete(null)}
                title="Delete Message"
            >
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Are you sure you want to permanently delete this message? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="secondary" onClick={() => setMessageToDelete(null)}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-500">
                        Delete
                    </Button>
                </div>
            </Modal>
        </>
    );
};