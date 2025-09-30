import React, { useMemo } from 'react';
import { TrendingUp, Info, ShoppingCart, AlertCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { usePortfolio } from '../contexts/PortfolioContext';
import { investments } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function Recommendations() {
  const { riskProfile } = useUser();
  const { executeTrade } = usePortfolio();

  const recommendations = useMemo(() => {
    if (!riskProfile) return { equity: [], debt: [], government: [] };

    const { score } = riskProfile;
    
    // Filter investments based on risk score
    const equityRecs = investments
      .filter(inv => inv.type === 'equity')
      .filter(inv => {
        if (score <= 30) return inv.riskLevel === 'low';
        if (score <= 50) return inv.riskLevel === 'low' || inv.riskLevel === 'medium';
        return true; // High risk tolerance gets all equity options
      })
      .sort((a, b) => {
        if (score <= 40) return a.volatility - b.volatility; // Sort by lowest volatility first
        return b.threeYearReturn - a.threeYearReturn; // Sort by highest return first
      })
      .slice(0, 3);

    const debtRecs = investments
      .filter(inv => inv.type === 'debt')
      .sort((a, b) => b.threeYearReturn - a.threeYearReturn)
      .slice(0, 2);

    const govRecs = investments
      .filter(inv => inv.type === 'government')
      .sort((a, b) => b.threeYearReturn - a.threeYearReturn)
      .slice(0, 2);

    return { equity: equityRecs, debt: debtRecs, government: govRecs };
  }, [riskProfile]);

  const getExplanation = (investment: any) => {
    const explanations: Record<string, string> = {
      'NIFTY50ETF': 'This ETF tracks India\'s top 50 companies, providing broad market exposure with lower fees. Perfect for beginners seeking diversification.',
      'ICICIPRU': 'A well-managed large-cap fund focusing on quality companies with consistent growth. Suitable for steady long-term wealth creation.',
      'HDFCTOP100': 'Invests in the largest 100 Indian companies by market cap, offering stability with growth potential.',
      'MOTILALMIDCAP': 'Mid-cap companies offer higher growth potential but with increased volatility. Suitable for aggressive investors.',
      'SBISMALLCAP': 'Small-cap investments can provide exceptional returns but come with significant risk. Only for high-risk investors.',
      'ICICISHTERM': 'Short-term debt fund with low interest rate risk, ideal for conservative investors seeking steady returns.',
      'HDFCCORP': 'Invests in high-quality corporate bonds, providing better yields than government securities with managed credit risk.',
      'AXISCREDIT': 'Takes calculated credit risks for higher yields, suitable for investors comfortable with moderate risk.',
      'UTILTDURATION': 'Balances yield and interest rate risk through medium-duration securities, good for moderate investors.',
      'GILT10Y': 'Government bonds provide safety of principal with sovereign guarantee, perfect for risk-averse investors.',
      'SBIGILTSEC': 'Diversified government securities fund offering safety with professional management.',
      'ICICIGILT': 'Pure government bond fund focusing on capital preservation and steady income generation.',
    };

    return explanations[investment.symbol] || investment.description;
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (!riskProfile) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-yellow-800 mb-2">
            Complete Risk Assessment First
          </h2>
          <p className="text-yellow-700 mb-6">
            To get personalized investment recommendations, please complete your risk assessment.
          </p>
          <Link
            to="/risk-quiz"
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
          >
            Take Risk Assessment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Investment Recommendations</h1>
            <p className="text-green-100 text-lg">
              Personalized suggestions based on your risk profile
            </p>
          </div>
          <div className="hidden md:block">
            <TrendingUp className="h-16 w-16 text-green-200" />
          </div>
        </div>
      </div>

      {/* Risk Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {riskProfile.score}/100
            </div>
            <div className="text-sm text-gray-600">Risk Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {riskProfile.allocation.equity}%
            </div>
            <div className="text-sm text-gray-600">Equity Allocation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {riskProfile.allocation.debt}%
            </div>
            <div className="text-sm text-gray-600">Debt Allocation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {riskProfile.allocation.government}%
            </div>
            <div className="text-sm text-gray-600">Government Bonds</div>
          </div>
        </div>
      </div>

      {/* Equity Recommendations */}
      {recommendations.equity.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-3" />
            Equity Investments ({riskProfile.allocation.equity}% allocation)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendations.equity.map((investment) => (
              <div key={investment.symbol} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{investment.name}</h3>
                    <p className="text-sm text-gray-600">{investment.symbol}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(investment.riskLevel)}`}>
                    {investment.riskLevel} risk
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">3Y Return:</span>
                    <div className="font-semibold text-green-600">
                      {investment.threeYearReturn}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Volatility:</span>
                    <div className="font-semibold">{investment.volatility}%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <div className="font-semibold">₹{investment.currentPrice}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Expense:</span>
                    <div className="font-semibold">{investment.expenseRatio}%</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Info className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Why this investment?</span>
                  </div>
                  <p className="text-sm text-gray-600">{getExplanation(investment)}</p>
                </div>

                <button
                  onClick={() => {
                    const success = executeTrade(
                      investment.symbol,
                      'buy',
                      1,
                      investment.currentPrice,
                      investment.name,
                      investment.type
                    );
                    if (success) {
                      alert('Investment added to portfolio! Go to the simulator to manage your holdings.');
                    } else {
                      alert('Insufficient funds. Add more cash in the simulator.');
                    }
                  }}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Invest Now (₹{investment.currentPrice})
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Debt Recommendations */}
      {recommendations.debt.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-4 h-4 bg-orange-500 rounded-full mr-3" />
            Debt Instruments ({riskProfile.allocation.debt}% allocation)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.debt.map((investment) => (
              <div key={investment.symbol} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{investment.name}</h3>
                    <p className="text-sm text-gray-600">{investment.symbol}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(investment.riskLevel)}`}>
                    {investment.riskLevel} risk
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">3Y Return:</span>
                    <div className="font-semibold text-blue-600">
                      {investment.threeYearReturn}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Volatility:</span>
                    <div className="font-semibold">{investment.volatility}%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <div className="font-semibold">₹{investment.currentPrice}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Expense:</span>
                    <div className="font-semibold">{investment.expenseRatio}%</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Info className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Why this investment?</span>
                  </div>
                  <p className="text-sm text-gray-600">{getExplanation(investment)}</p>
                </div>

                <button
                  onClick={() => {
                    const success = executeTrade(
                      investment.symbol,
                      'buy',
                      1,
                      investment.currentPrice,
                      investment.name,
                      investment.type
                    );
                    if (success) {
                      alert('Investment added to portfolio! Go to the simulator to manage your holdings.');
                    } else {
                      alert('Insufficient funds. Add more cash in the simulator.');
                    }
                  }}
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Invest Now (₹{investment.currentPrice})
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Government Bond Recommendations */}
      {recommendations.government.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded-full mr-3" />
            Government Securities ({riskProfile.allocation.government}% allocation)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.government.map((investment) => (
              <div key={investment.symbol} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{investment.name}</h3>
                    <p className="text-sm text-gray-600">{investment.symbol}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(investment.riskLevel)}`}>
                    {investment.riskLevel} risk
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">3Y Return:</span>
                    <div className="font-semibold text-purple-600">
                      {investment.threeYearReturn}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Volatility:</span>
                    <div className="font-semibold">{investment.volatility}%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <div className="font-semibold">₹{investment.currentPrice}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Expense:</span>
                    <div className="font-semibold">{investment.expenseRatio}%</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Info className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Why this investment?</span>
                  </div>
                  <p className="text-sm text-gray-600">{getExplanation(investment)}</p>
                </div>

                <button
                  onClick={() => {
                    const success = executeTrade(
                      investment.symbol,
                      'buy',
                      1,
                      investment.currentPrice,
                      investment.name,
                      investment.type
                    );
                    if (success) {
                      alert('Investment added to portfolio! Go to the simulator to manage your holdings.');
                    } else {
                      alert('Insufficient funds. Add more cash in the simulator.');
                    }
                  }}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Invest Now (₹{investment.currentPrice})
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Educational Note */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start">
          <Info className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Investment Guidelines</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Diversify across different asset classes to reduce risk</li>
              <li>• Consider SIP (Systematic Investment Plan) for regular investing</li>
              <li>• Review and rebalance your portfolio annually</li>
              <li>• Don't invest all your money at once - use rupee cost averaging</li>
              <li>• Keep emergency funds separate from investments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}