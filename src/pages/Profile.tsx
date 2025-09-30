import React, { useState } from 'react';
import { User, Mail, Calendar, Target, PieChart, TrendingUp, CreditCard as Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function Profile() {
  const { user } = useAuth();
  const { riskProfile } = useUser();
  const { portfolio } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const totalPortfolioValue = portfolio.holdings.reduce(
    (total, holding) => total + holding.quantity * holding.currentPrice,
    portfolio.cash
  );

  const totalInvestmentValue = portfolio.holdings.reduce(
    (total, holding) => total + holding.quantity * holding.currentPrice,
    0
  );

  const totalGainLoss = portfolio.holdings.reduce(
    (total, holding) => total + (holding.currentPrice - holding.avgPrice) * holding.quantity,
    0
  );

  const handleSave = () => {
    // In a real app, you would update the user data in the backend
    // For now, we'll just close the edit mode
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  const getRiskLevelText = (score: number) => {
    if (score <= 30) return 'Conservative';
    if (score <= 50) return 'Moderate';
    if (score <= 70) return 'Balanced';
    return 'Aggressive';
  };

  const getRiskLevelColor = (score: number) => {
    if (score <= 30) return 'text-green-600 bg-green-50';
    if (score <= 50) return 'text-yellow-600 bg-yellow-50';
    if (score <= 70) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-4 rounded-full mr-6">
              <User className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Profile</h1>
              <p className="text-gray-200 text-lg">Manage your account and preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <User className="h-6 w-6 text-gray-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Mail className="h-6 w-6 text-gray-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{user?.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Risk Profile */}
      {riskProfile && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Risk Profile</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(riskProfile.score)}`}>
              {getRiskLevelText(riskProfile.score)} Investor
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Risk Score</p>
              <p className="text-2xl font-bold text-blue-600">{riskProfile.score}/100</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Equity Allocation</p>
              <p className="text-2xl font-bold text-green-600">{riskProfile.allocation.equity}%</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <PieChart className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Debt Allocation</p>
              <p className="text-2xl font-bold text-orange-600">{riskProfile.allocation.debt}%</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Time Horizon</p>
              <p className="text-2xl font-bold text-purple-600">{riskProfile.investmentHorizon}Y</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">Financial Goals</h3>
            <div className="flex flex-wrap gap-2">
              {riskProfile.financialGoals.map((goal, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {goal.charAt(0).toUpperCase() + goal.slice(1)}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Portfolio Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Portfolio Value</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{totalPortfolioValue.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Investments</p>
            <p className="text-2xl font-bold text-blue-600">
              ₹{totalInvestmentValue.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total P&L</p>
            <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalGainLoss >= 0 ? '+' : ''}₹{totalGainLoss.toFixed(0)}
            </p>
            <p className={`text-sm ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalInvestmentValue > 0 ? `(${((totalGainLoss / totalInvestmentValue) * 100).toFixed(2)}%)` : '(0%)'}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Holdings Breakdown</h3>
          {portfolio.holdings.length > 0 ? (
            <div className="space-y-3">
              {portfolio.holdings.slice(0, 5).map((holding) => (
                <div key={holding.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{holding.name}</p>
                    <p className="text-sm text-gray-600">{holding.quantity} shares</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ₹{(holding.quantity * holding.currentPrice).toLocaleString('en-IN')}
                    </p>
                    <p className={`text-sm ${
                      (holding.currentPrice - holding.avgPrice) >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {((holding.currentPrice - holding.avgPrice) / holding.avgPrice * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
              {portfolio.holdings.length > 5 && (
                <p className="text-sm text-gray-600 text-center">
                  And {portfolio.holdings.length - 5} more holdings...
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">
              No investments yet. Visit the recommendations page to get started!
            </p>
          )}
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Account Actions</h2>
        <div className="space-y-4">
          <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
            <h3 className="font-medium text-gray-900">Retake Risk Assessment</h3>
            <p className="text-sm text-gray-600 mt-1">
              Update your risk profile if your financial situation has changed
            </p>
          </button>
          <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
            <h3 className="font-medium text-gray-900">Export Portfolio Data</h3>
            <p className="text-sm text-gray-600 mt-1">
              Download your portfolio and transaction history
            </p>
          </button>
          <button className="w-full text-left p-4 hover:bg-red-50 rounded-lg transition-colors border border-red-200 text-red-600">
            <h3 className="font-medium">Reset Portfolio</h3>
            <p className="text-sm text-red-500 mt-1">
              Clear all your holdings and start fresh (cannot be undone)
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}