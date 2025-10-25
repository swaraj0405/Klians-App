import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Avatar } from './ui/Avatar';
import { Input } from './ui/Input';
import { ICONS } from '../constants';
import { Theme, Role } from '../types';
import { SearchResultsDropdown } from './SearchResultsDropdown';

export const Header: React.FC = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Effect to handle clicks outside of the search component
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!user) return null;

    const SearchIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

    return (
        <header className="bg-white dark:bg-slate-800 fixed md:sticky top-0 z-20 w-full border-b border-slate-200 dark:border-slate-700">
            {/* Mobile Header */}
            <div className="md:hidden p-4 h-16 flex items-center justify-between">
                <Link to="/home" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to">
                    KLIAS
                </Link>
                <div className="flex items-center space-x-4">
                    <Link to="/messages" className="text-slate-600 dark:text-slate-300">
                        {React.cloneElement(ICONS.messages, { className: "h-7 w-7" })}
                    </Link>
                    <button className="text-slate-600 dark:text-slate-300">
                        {React.cloneElement(ICONS.bell, { className: "h-7 w-7" })}
                    </button>
                    {(user.role === Role.TEACHER || user.role === Role.ADMIN) && (
                        <Link to="/profile">
                            <div className="rounded-full p-0.5 border-2 border-red-500">
                                <Avatar src={user.avatar} alt={user.name} size="sm" />
                            </div>
                        </Link>
                    )}
                </div>
            </div>

            {/* Desktop Header */}
            <div className="max-w-7xl mx-auto px-4 hidden md:flex items-center justify-between gap-6 h-16">
                {/* Left: Brand */}
                <div className="flex-shrink-0">
                    <Link to="/home" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to">
                        KLIAS
                    </Link>
                </div>
                
                {/* Center: Search */}
                <div className="flex-1 max-w-xl relative" ref={searchRef}>
                    <Input 
                        placeholder="Search KLIAS..." 
                        icon={SearchIcon} 
                        className="bg-slate-100 dark:bg-slate-700 !rounded-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setDropdownVisible(true)}
                    />
                    {isDropdownVisible && (
                        <SearchResultsDropdown 
                            searchTerm={searchTerm}
                            onClose={() => {
                                setDropdownVisible(false);
                                setSearchTerm('');
                            }}
                        />
                    )}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-6">
                    <button className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                        {ICONS.bell}
                    </button>

                    <button onClick={toggleTheme} className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                        {theme === Theme.LIGHT ? ICONS.moon : ICONS.sun}
                    </button>
                
                    <Link to="/profile" className="flex items-center space-x-3">
                        <Avatar src={user.avatar} alt={user.name} size="md" />
                        <div>
                            <p className="font-semibold text-slate-800 dark:text-slate-100">{user.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">@{user.username}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
};