import React from 'react';
import { TrendingUp, Target, PieChart, BookOpen, ArrowRight, AlertTriangle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { usePortfolio } from '../contexts/PortfolioContext';
import { Link } from 'react-router-dom';
import { investments, marketIndices } from '../data/mockData';

export default function Home() {
  const { riskProfile } = useUser();
  const { portfolio } = usePortfolio();

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

  const quickStats = [
    {
      title: 'Portfolio Value',
      value: `₹${totalPortfolioValue.toLocaleString('en-IN')}`,
      change: totalGainLoss,
      changePercent: totalInvestmentValue > 0 ? (totalGainLoss / totalInvestmentValue) * 100 : 0,
      icon: TrendingUp,
      color: 'text-blue-600',
    },
    {
      title: 'Available Cash',
      value: `₹${portfolio.cash.toLocaleString('en-IN')}`,
      icon: Target,
      color: 'text-green-600',
    },
    {
      title: 'Total Investments',
      value: `₹${totalInvestmentValue.toLocaleString('en-IN')}`,
      change: totalGainLoss,
      changePercent: totalInvestmentValue > 0 ? (totalGainLoss / totalInvestmentValue) * 100 : 0,
      icon: PieChart,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to InvestAI</h1>
            <p className="text-blue-100 text-lg">
              Your AI-powered investment advisor for smart financial decisions
            </p>
          </div>
          <div className="hidden md:block">
            <BookOpen className="h-16 w-16 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Risk Assessment Alert */}
      {!riskProfile && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-800">
                Complete Your Risk Assessment
              </h3>
              <p className="text-yellow-700 mt-1">
                Take our quick risk assessment to get personalized investment recommendations.
              </p>
            </div>
            <Link
              to="/risk-quiz"
              className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              {stat.change !== undefined && (
                <span className={`text-sm font-medium ${
                  stat.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change >= 0 ? '+' : ''}₹{stat.change.toFixed(0)}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
            {stat.changePercent !== undefined && (
              <p className={`text-xs mt-1 ${
                stat.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changePercent >= 0 ? '+' : ''}{stat.changePercent.toFixed(2)}%
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Market Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Market Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {marketIndices.map((index, i) => (
            <div key={i} className="text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-1">{index.name}</h3>
              <p className="text-lg font-bold text-gray-900">
                {index.value.toLocaleString('en-IN')}
              </p>
              <p className={`text-sm ${
                index.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {index.changePercent >= 0 ? '+' : ''}{index.change.toFixed(2)} 
                ({(index.changePercent * 100).toFixed(2)}%)
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/risk-quiz"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Assessment</h3>
          <p className="text-gray-600 text-sm">
            Evaluate your risk tolerance and get personalized investment strategies.
          </p>
        </Link>

        <Link
          to="/recommendations"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Recommendations</h3>
          <p className="text-gray-600 text-sm">
            Discover AI-powered investment recommendations tailored for you.
          </p>
        </Link>

        <Link
          to="/simulator"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Practice Trading</h3>
          <p className="text-gray-600 text-sm">
            Use our simulator to practice trading with virtual money.
          </p>
        </Link>
      </div>

      {/* Recent Holdings */}
      {portfolio.holdings.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Holdings</h2>
            <Link
              to="/simulator"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {portfolio.holdings.slice(0, 3).map((holding) => {
              const gainLoss = (holding.currentPrice - holding.avgPrice) * holding.quantity;
              const gainLossPercent = ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
              
              return (
                <div key={holding.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{holding.name}</h4>
                    <p className="text-sm text-gray-600">
                      {holding.quantity} shares @ ₹{holding.currentPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ₹{(holding.quantity * holding.currentPrice).toLocaleString('en-IN')}
                    </p>
                    <p className={`text-sm ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {gainLoss >= 0 ? '+' : ''}₹{gainLoss.toFixed(0)} ({gainLossPercent.toFixed(2)}%)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}