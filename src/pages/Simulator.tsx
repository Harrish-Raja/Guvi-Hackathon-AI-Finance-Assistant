import React, { useState } from 'react';
import { Plus, Minus, TrendingUp, TrendingDown, History, Search } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { investments } from '../data/mockData';

export default function Simulator() {
  const { portfolio, executeTrade } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'trade' | 'history'>('portfolio');
  const [selectedInvestment, setSelectedInvestment] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredInvestments = investments.filter(inv =>
    inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedInv = investments.find(inv => inv.symbol === selectedInvestment);

  const handleTrade = (type: 'buy' | 'sell') => {
    if (!selectedInv) return;

    const success = executeTrade(
      selectedInv.symbol,
      type,
      quantity,
      selectedInv.currentPrice,
      selectedInv.name,
      selectedInv.type
    );

    if (success) {
      setQuantity(1);
      alert(`${type === 'buy' ? 'Purchased' : 'Sold'} ${quantity} units of ${selectedInv.name}`);
    } else {
      alert(type === 'buy' ? 'Insufficient funds!' : 'Insufficient shares to sell!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Trading Simulator</h1>
            <p className="text-indigo-100 text-lg">
              Practice trading with virtual money
            </p>
          </div>
          <div className="hidden md:block">
            <TrendingUp className="h-16 w-16 text-indigo-200" />
          </div>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Portfolio Value</h3>
          <p className="text-2xl font-bold text-gray-900">
            ₹{totalPortfolioValue.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Available Cash</h3>
          <p className="text-2xl font-bold text-green-600">
            ₹{portfolio.cash.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Invested Amount</h3>
          <p className="text-2xl font-bold text-blue-600">
            ₹{totalInvestmentValue.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total P&L</h3>
          <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalGainLoss >= 0 ? '+' : ''}₹{totalGainLoss.toFixed(0)}
          </p>
          <p className={`text-sm ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalInvestmentValue > 0 ? `(${((totalGainLoss / totalInvestmentValue) * 100).toFixed(2)}%)` : '(0%)'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'portfolio', label: 'Portfolio', icon: TrendingUp },
              { id: 'trade', label: 'Trade', icon: Plus },
              { id: 'history', label: 'History', icon: History },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Your Holdings</h2>
              {portfolio.holdings.length === 0 ? (
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No investments yet. Start trading to build your portfolio!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {portfolio.holdings.map((holding) => {
                    const gainLoss = (holding.currentPrice - holding.avgPrice) * holding.quantity;
                    const gainLossPercent = ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
                    
                    return (
                      <div key={holding.symbol} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{holding.name}</h3>
                            <p className="text-sm text-gray-600">{holding.symbol}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ₹{(holding.quantity * holding.currentPrice).toLocaleString('en-IN')}
                            </p>
                            <p className={`text-sm ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {gainLoss >= 0 ? '+' : ''}₹{gainLoss.toFixed(0)} ({gainLossPercent.toFixed(2)}%)
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Quantity:</span>
                            <div className="font-medium">{holding.quantity}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Avg Price:</span>
                            <div className="font-medium">₹{holding.avgPrice.toFixed(2)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Current Price:</span>
                            <div className="font-medium">₹{holding.currentPrice.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'trade' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Place Trade</h2>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search investments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Investment Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Investment
                </label>
                <select
                  value={selectedInvestment}
                  onChange={(e) => setSelectedInvestment(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Choose an investment...</option>
                  {filteredInvestments.map((investment) => (
                    <option key={investment.symbol} value={investment.symbol}>
                      {investment.name} - ₹{investment.currentPrice}
                    </option>
                  ))}
                </select>
              </div>

              {selectedInv && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedInv.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Current Price:</span>
                      <div className="font-medium">₹{selectedInv.currentPrice}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <div className="font-medium capitalize">{selectedInv.type}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">3Y Return:</span>
                      <div className="font-medium text-green-600">{selectedInv.threeYearReturn}%</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Risk Level:</span>
                      <div className="font-medium capitalize">{selectedInv.riskLevel}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Trade Summary */}
              {selectedInv && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Trade Summary</h3>
                  <p className="text-blue-800">
                    Total Value: ₹{(selectedInv.currentPrice * quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              )}

              {/* Trade Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleTrade('buy')}
                  disabled={!selectedInv}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Buy
                </button>
                <button
                  onClick={() => handleTrade('sell')}
                  disabled={!selectedInv}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Minus className="h-5 w-5 mr-2" />
                  Sell
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
              {portfolio.transactions.length === 0 ? (
                <div className="text-center py-12">
                  <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No transactions yet. Start trading to see your history!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {[...portfolio.transactions].reverse().map((transaction) => (
                    <div key={transaction.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${
                            transaction.type === 'buy' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {transaction.type === 'buy' ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.symbol}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {transaction.quantity} shares @ ₹{transaction.price}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ₹{(transaction.quantity * transaction.price).toLocaleString('en-IN')}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(transaction.timestamp).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Educational Content */}
      <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
        <h2 className="text-xl font-bold text-indigo-900 mb-4">Trading Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-indigo-800 mb-2">Diversification</h3>
            <p className="text-indigo-700 text-sm">
              Don't put all your money in one investment. Spread your risk across different asset classes and sectors.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-800 mb-2">Long-term Thinking</h3>
            <p className="text-indigo-700 text-sm">
              Successful investing requires patience. Focus on long-term growth rather than short-term market movements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}