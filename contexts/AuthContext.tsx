
import React, { createContext, useState, useMemo, useEffect } from 'react';
import { User, Role } from '../types';
import { USERS } from '../constants';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  register: (name: string, email: string, role: Role) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email: string) => {
    // Mock login logic
    const foundUser = Object.values(USERS).find(u => u.email === email);
    if (foundUser) {
        setUser(foundUser);
    } else {
        // For demo, log in as student if not found
        setUser(USERS['user-1']);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = (name: string, email: string, role: Role) => {
    // Mock registration
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      username: name.toLowerCase().replace(' ', ''),
      avatar: `https://picsum.photos/seed/${name}/200`,
      // FIX: Added missing 'coverPhoto' property to satisfy the User interface.
      coverPhoto: `https://picsum.photos/seed/cover-${Date.now()}/1500/500`,
      bio: 'New user to the KLIAS platform!',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
  };

  const value = useMemo(() => ({ user, isAuthenticated, login, logout, register }), [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
