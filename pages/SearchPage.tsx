import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { ICONS, USERS } from '../constants';
import { Avatar } from '../components/ui/Avatar';
import { User } from '../types';

interface SearchPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ isOpen, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Auto-focus the input when the page opens
      inputRef.current?.focus();
    } else {
        // Clear search when closing
        setSearchTerm('');
        setSearchResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const results = Object.values(USERS).filter(
        user =>
          user.name.toLowerCase().includes(lowercasedTerm) ||
          user.username.toLowerCase().includes(lowercasedTerm)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Simple placeholder search results
  const recentSearches = [USERS['user-2'], USERS['user-4']];
  const suggestedTopics = ['#KLIASFest2024', '#NewResearch'];

  const renderContent = () => {
    if (searchTerm.trim().length < 2) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-3">Recent Searches</h3>
            <div className="space-y-3">
              {recentSearches.map(user => (
                <div key={user.id} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Avatar src={user.avatar} alt={user.name} />
                      <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">@{user.username}</p>
                      </div>
                   </div>
                   <button className="text-2xl text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">&times;</button>
                </div>
              ))}
            </div>
          </div>
           <div>
            <h3 className="font-bold text-lg mb-3">Suggested Topics</h3>
            <div className="space-y-3">
               {suggestedTopics.map(topic => (
                  <div key={topic}>
                      <p className="font-bold text-red-600 hover:underline cursor-pointer">{topic}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{Math.floor(Math.random()*2000+1000)} posts</p>
                  </div>
               ))}
            </div>
          </div>
        </div>
      );
    }

    if (searchResults.length > 0) {
      return (
        <div className="space-y-1">
          {searchResults.map(user => (
            <Link key={user.id} to={`/profile/${user.id}`} onClick={onClose} className="block p-2 -mx-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar src={user.avatar} alt={user.name} />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">@{user.username}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }

    return (
      <div className="text-center p-8 text-slate-500 dark:text-slate-400">
        <p>No results found for "{searchTerm}"</p>
      </div>
    );
  };


  return (
    <div
      className={`fixed inset-0 bg-white dark:bg-slate-900 z-50 transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
    >
      <div className="flex flex-col h-full">
        <header className="p-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700">
          <button onClick={onClose} className="p-2 -ml-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
              {React.cloneElement(ICONS.chevronLeft, { className: 'h-6 w-6' })}
          </button>
          <Input
            ref={inputRef}
            placeholder="Search KLIAS..."
            icon={React.cloneElement(ICONS.search, { className: 'h-5 w-5' })}
            className="flex-1 !bg-slate-100 dark:!bg-slate-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </header>
        <main className="flex-1 p-4 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
