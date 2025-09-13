
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Student } from '@/lib/types';
import { users, student as defaultStudent, facultyUser } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: Student | null;
  login: (email: string, pass: string) => Student;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Student | null>(null);
  const router = useRouter();

  const login = (email: string, pass: string): Student => {
    let loggedInUser: Student;

    if (email === facultyUser.email && pass === '123456') {
      loggedInUser = facultyUser;
    } else {
      // For demo, any other login is considered a student
      // In a real app, you'd look up the user and check their password hash
      loggedInUser = users.find(u => u.role === 'student') || defaultStudent;
    }
    
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = () => {
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
