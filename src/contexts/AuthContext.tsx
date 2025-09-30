import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('investmentAdvisor_currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('investmentAdvisor_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const userSession = { id: user.id, email: user.email, name: user.name };
      setUser(userSession);
      localStorage.setItem('investmentAdvisor_currentUser', JSON.stringify(userSession));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('investmentAdvisor_users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      return false; // User already exists
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
    };

    users.push(newUser);
    localStorage.setItem('investmentAdvisor_users', JSON.stringify(users));

    const userSession = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userSession);
    localStorage.setItem('investmentAdvisor_currentUser', JSON.stringify(userSession));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('investmentAdvisor_currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}