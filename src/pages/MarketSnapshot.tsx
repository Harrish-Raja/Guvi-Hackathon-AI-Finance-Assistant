import React from 'react';
import { TrendingUp, TrendingDown, Activity, Clock, BarChart3, PieChart } from 'lucide-react';
import { marketIndices, newsHeadlines, chartData, topStocks } from '../data/mockData';

const LineChart = ({ data, color = '#3B82F6', height = 200, showArea = true }: {
  data: Array<{ month: string; value: number }>;
  color?: string;
  height?: number;
  showArea?: boolean;
}) => {
  const minValue = Math.min(...data.map(d => d.value));
  const maxValue = Math.max(...data.map(d => d.value));
  const range = maxValue - minValue;
  
  return (
    <div className={`h-${height === 200 ? '64' : '48'}`}>
      <svg className="w-full h-full" viewBox={`0 0 400 ${height}`}>
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        
        {/* Chart area */}
        <path
          d={`M 20,${height - 40} ${data.map((point, index) => {
            const x = 20 + (index * (360 / (data.length - 1)));
            const y = (height - 40) - ((point.value - minValue) / range * (height - 80));
            return `L ${x},${y}`;
          }).join(' ')}`}
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
        
        {showArea && (
          <path
            d={`M 20,${height - 40} ${data.map((point, index) => {
              const x = 20 + (index * (360 / (data.length - 1)));
              const y = (height - 40) - ((point.value - minValue) / range * (height - 80));
              return `L ${x},${y}`;
            }).join(' ')} L ${20 + (360)},${height - 40} Z`}
            fill={`url(#gradient-${color.replace('#', '')})`}
          />
        )}

        {/* Data points */}
        {data.map((point, index) => (
          <g key={index}>
            <circle
              cx={20 + (index * (360 / (data.length - 1)))}
              cy={(height - 40) - ((point.value - minValue) / range * (height - 80))}
              r="4"
              fill={color}
            />
            <text
              x={20 + (index * (360 / (data.length - 1)))}
              y={height - 15}
              textAnchor="middle"
              fontSize="12"
              fill="#6B7280"
            >
              {point.month}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const BarChart = ({ data, color = '#10B981' }: {
  data: Array<{ sector: string; performance: number; color: string }>;
  color?: string;
}) => {
  const maxValue = Math.max(...data.map(d => Math.abs(d.performance)));
  
  return (
    <div className="h-64">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {data.map((item, index) => {
          const barHeight = Math.abs(item.performance) / maxValue * 120;
          const x = 30 + (index * 50);
          const y = item.performance >= 0 ? 90 - barHeight : 90;
          
          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width="35"
                height={barHeight}
                fill={item.color}
                rx="2"
              />
              <text
                x={x + 17.5}
                y={180}
                textAnchor="middle"
                fontSize="10"
                fill="#6B7280"
              >
                {item.sector}
              </text>
              <text
                x={x + 17.5}
                y={item.performance >= 0 ? y - 5 : y + barHeight + 15}
                textAnchor="middle"
                fontSize="10"
                fill={item.performance >= 0 ? '#10B981' : '#EF4444'}
                fontWeight="bold"
              >
                {item.performance > 0 ? '+' : ''}{item.performance}%
              </text>
            </g>
          );
        })}
        
        {/* Zero line */}
        <line
          x1="20"
          y1="90"
          x2="380"
          y2="90"
          stroke="#E5E7EB"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      </svg>
    </div>
  );
};

export default function MarketSnapshot() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Market Snapshot</h1>
            <p className="text-purple-100 text-lg">
              Real-time market overview and trends
            </p>
          </div>
          <div className="hidden md:block">
            <Activity className="h-16 w-16 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Market Indices */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Market Indices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketIndices.map((index, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">{index.name}</h3>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center text-sm ${
                index.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {index.changePercent >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {index.changePercent >= 0 ? '+' : ''}{index.change.toFixed(2)} 
                ({(index.changePercent * 100).toFixed(2)}%)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nifty 50 Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Nifty 50 Trend</h2>
            <span className="text-sm text-gray-600">6 Months</span>
          </div>
          <LineChart data={chartData.nifty50} color="#3B82F6" />
        </div>

        {/* Market Volatility Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Market Volatility</h2>
            <span className="text-sm text-gray-600">6 Months</span>
          </div>
          <LineChart 
            data={chartData.marketVolatility.map(d => ({ month: d.month, value: d.volatility }))} 
            color="#EF4444" 
          />
        </div>
      </div>

      {/* Individual Stock Charts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Top Stocks Performance</h2>
          <span className="text-sm text-gray-600">6 Months</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <BarChart data={chartData.sectorPerformance} />
          </div>
          <div className="space-y-3">
            {chartData.sectorPerformance.map((sector, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: sector.color }}
                  />
                  <span className="font-medium text-gray-900">{sector.sector}</span>
                </div>
                <span className={`font-semibold ${
                  sector.performance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {sector.performance > 0 ? '+' : ''}{sector.performance}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Stocks Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Top Stocks Today</h2>
          <BarChart3 className="h-6 w-6 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Stock</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Price</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Change</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">% Change</th>
              </tr>
            </thead>
            <tbody>
              {topStocks.map((stock, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{stock.symbol}</div>
                      <div className="text-sm text-gray-600">{stock.name}</div>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 font-medium text-gray-900">
                    ₹{stock.price.toFixed(2)}
                  </td>
                  <td className={`text-right py-3 px-4 font-medium ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change >= 0 ? '+' : ''}₹{stock.change.toFixed(2)}
                  </td>
                  <td className={`text-right py-3 px-4 font-medium ${
                    stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <div className="flex items-center justify-end">
                      {stock.changePercent >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sector Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Sector Performance</h2>
          <PieChart className="h-6 w-6 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <BarChart data={chartData.sectorPerformance} />
          </div>
          <div className="space-y-3">
            {chartData.sectorPerformance.map((sector, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: sector.color }}
                  />
                  <span className="font-medium text-gray-900">{sector.sector}</span>
                </div>
                <span className={`font-semibold ${
                  sector.performance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {sector.performance > 0 ? '+' : ''}{sector.performance}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Market Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Market Sentiment</h3>
            <p className="text-green-700 text-sm">
              Markets are showing positive momentum with strong FII inflows and stable macroeconomic indicators.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Key Drivers</h3>
            <p className="text-blue-700 text-sm">
              IT sector earnings, RBI's monetary policy stance, and global market trends are key factors to watch.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">Investment Outlook</h3>
            <p className="text-purple-700 text-sm">
              Long-term outlook remains positive with focus on quality stocks and systematic investment approaches.
            </p>
          </div>
        </div>
      </div>

      {/* News Headlines */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Market News</h2>
        <div className="space-y-4">
          {newsHeadlines.map((news, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{news.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{news.summary}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {news.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Content */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Understanding Market Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Market Indices</h3>
            <p className="text-blue-700 text-sm">
              Market indices like Nifty 50 and Sensex track the performance of top companies and give an overview of market direction. 
              They're useful benchmarks for comparing your portfolio performance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Market Volatility</h3>
            <p className="text-blue-700 text-sm">
              Markets naturally fluctuate due to various factors like economic policies, global events, and investor sentiment. 
              Long-term investors should focus on fundamentals rather than short-term movements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}