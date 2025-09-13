
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
    let loggedInUser: Student | undefined;

    if (email === facultyUser.email && pass === '123456') {
      loggedInUser = facultyUser;
    } else if (email === defaultStudent.email && pass === '123456') {
      loggedInUser = defaultStudent;
    } else {
      const foundUser = users.find(u => u.email === email);
      if (foundUser) {
          // In a real app, you would check a hashed password.
          // For this demo, we'll just log them in if the user exists.
          loggedInUser = foundUser;
      }
    }
    
    if (!loggedInUser) {
        throw new Error("Invalid credentials. Please try again.");
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
