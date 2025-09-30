import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, TrendingUp, PieChart, User, X, BookOpen } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Risk Assessment', href: '/risk-quiz', icon: BarChart3 },
  { name: 'Recommendations', href: '/recommendations', icon: TrendingUp },
  { name: 'Market Snapshot', href: '/market', icon: PieChart },
  { name: 'Trading Simulator', href: '/simulator', icon: BookOpen },
  { name: 'Profile', href: '/profile', icon: User },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 z-50`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">InvestAI</span>
          </div>
          <button onClick={onClose} className="lg:hidden">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}