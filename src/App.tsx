import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import RiskQuiz from './pages/RiskQuiz';
import Recommendations from './pages/Recommendations';
import MarketSnapshot from './pages/MarketSnapshot';
import Simulator from './pages/Simulator';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { PortfolioProvider } from './contexts/PortfolioContext';

function AppContent() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/risk-quiz" element={<RiskQuiz />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/market" element={<MarketSnapshot />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <PortfolioProvider>
            <AppContent />
          </PortfolioProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;