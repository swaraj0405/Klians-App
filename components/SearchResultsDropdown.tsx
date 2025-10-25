
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { USERS } from '../constants';
import { User } from '../types';
import { Avatar } from './ui/Avatar';
import { Card } from './ui/Card';

interface SearchResultsDropdownProps {
  searchTerm: string;
  onClose: () => void;
}

export const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = ({ searchTerm, onClose }) => {
  const [searchResults, setSearchResults] = useState<User[]>([]);

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

  const recentSearches = [USERS['user-2'], USERS['user-4']];
  const suggestedTopics = ['#KLIASFest2024', '#NewResearch'];

  const renderContent = () => {
    if (searchTerm.trim().length < 2) {
      return (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm px-4 mb-2 text-slate-500 dark:text-slate-400">Recent Searches</h3>
            <div className="space-y-1">
              {recentSearches.map(user => (
                <Link key={user.id} to={`/profile/${user.id}`} onClick={onClose} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <Avatar src={user.avatar} alt={user.name} size="sm" />
                  <div>
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">@{user.username}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
           <div>
            <h3 className="font-semibold text-sm px-4 mb-2 text-slate-500 dark:text-slate-400">Suggested Topics</h3>
            <div className="space-y-1">
               {suggestedTopics.map(topic => (
                  <a key={topic} href="#" onClick={onClose} className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <p className="font-bold text-red-600">{topic}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{Math.floor(Math.random()*2000+1000)} posts</p>
                  </a>
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
            <Link key={user.id} to={`/profile/${user.id}`} onClick={onClose} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <Avatar src={user.avatar} alt={user.name} size="sm"/>
              <div>
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">@{user.username}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    }

    return (
      <div className="text-center p-8 text-sm text-slate-500 dark:text-slate-400">
        <p>No results found for "{searchTerm}"</p>
      </div>
    );
  };

  return (
    <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto py-2 z-50">
      {renderContent()}
    </Card>
  );
};