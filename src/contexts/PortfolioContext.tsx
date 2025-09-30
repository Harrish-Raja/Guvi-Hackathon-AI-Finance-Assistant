import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Holding {
  symbol: string;
  name: string;
  type: 'equity' | 'debt' | 'government';
  quantity: number;
  avgPrice: number;
  currentPrice: number;
}

interface Transaction {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  timestamp: Date;
}

interface Portfolio {
  cash: number;
  holdings: Holding[];
  transactions: Transaction[];
}

interface PortfolioContextType {
  portfolio: Portfolio;
  executeTrade: (symbol: string, type: 'buy' | 'sell', quantity: number, price: number, name: string, instrumentType: 'equity' | 'debt' | 'government') => boolean;
  updatePrices: (prices: Record<string, number>) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const initialPortfolio: Portfolio = {
  cash: 100000, // Starting with ₹1,00,000
  holdings: [],
  transactions: [],
};

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio>(initialPortfolio);

  useEffect(() => {
    if (user) {
      const savedPortfolio = localStorage.getItem(`investmentAdvisor_portfolio_${user.id}`);
      if (savedPortfolio) {
        setPortfolio(JSON.parse(savedPortfolio));
      } else {
        setPortfolio(initialPortfolio);
      }
    } else {
      setPortfolio(initialPortfolio);
    }
  }, [user]);

  const savePortfolio = (newPortfolio: Portfolio) => {
    if (user) {
      localStorage.setItem(`investmentAdvisor_portfolio_${user.id}`, JSON.stringify(newPortfolio));
    }
  };

  const executeTrade = (
    symbol: string,
    type: 'buy' | 'sell',
    quantity: number,
    price: number,
    name: string,
    instrumentType: 'equity' | 'debt' | 'government'
  ): boolean => {
    const totalValue = quantity * price;

    if (type === 'buy' && portfolio.cash < totalValue) {
      return false; // Insufficient funds
    }

    const newPortfolio = { ...portfolio };

    if (type === 'buy') {
      newPortfolio.cash -= totalValue;
      
      const existingHolding = newPortfolio.holdings.find(h => h.symbol === symbol);
      if (existingHolding) {
        const totalShares = existingHolding.quantity + quantity;
        const totalValue = (existingHolding.quantity * existingHolding.avgPrice) + (quantity * price);
        existingHolding.avgPrice = totalValue / totalShares;
        existingHolding.quantity = totalShares;
        existingHolding.currentPrice = price;
      } else {
        newPortfolio.holdings.push({
          symbol,
          name,
          type: instrumentType,
          quantity,
          avgPrice: price,
          currentPrice: price,
        });
      }
    } else {
      // Sell
      const holding = newPortfolio.holdings.find(h => h.symbol === symbol);
      if (!holding || holding.quantity < quantity) {
        return false; // Insufficient shares
      }

      newPortfolio.cash += totalValue;
      holding.quantity -= quantity;
      
      if (holding.quantity === 0) {
        newPortfolio.holdings = newPortfolio.holdings.filter(h => h.symbol !== symbol);
      }
    }

    // Add transaction
    const transaction: Transaction = {
      id: Date.now().toString(),
      symbol,
      type,
      quantity,
      price,
      timestamp: new Date(),
    };
    newPortfolio.transactions.push(transaction);

    setPortfolio(newPortfolio);
    savePortfolio(newPortfolio);
    return true;
  };

  const updatePrices = (prices: Record<string, number>) => {
    const newPortfolio = { ...portfolio };
    newPortfolio.holdings = newPortfolio.holdings.map(holding => ({
      ...holding,
      currentPrice: prices[holding.symbol] || holding.currentPrice,
    }));
    setPortfolio(newPortfolio);
    savePortfolio(newPortfolio);
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, executeTrade, updatePrices }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}