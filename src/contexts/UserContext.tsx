import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface RiskProfile {
  age: number;
  income: number;
  investmentHorizon: number;
  riskTolerance: number;
  financialGoals: string[];
  score: number;
  allocation: {
    equity: number;
    debt: number;
    government: number;
  };
}

interface UserContextType {
  riskProfile: RiskProfile | null;
  updateRiskProfile: (profile: RiskProfile) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);

  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`investmentAdvisor_riskProfile_${user.id}`);
      if (savedProfile) {
        setRiskProfile(JSON.parse(savedProfile));
      }
    } else {
      setRiskProfile(null);
    }
  }, [user]);

  const updateRiskProfile = (profile: RiskProfile) => {
    setRiskProfile(profile);
    if (user) {
      localStorage.setItem(`investmentAdvisor_riskProfile_${user.id}`, JSON.stringify(profile));
    }
  };

  return (
    <UserContext.Provider value={{ riskProfile, updateRiskProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}