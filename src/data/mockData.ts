export interface Investment {
  symbol: string;
  name: string;
  type: 'equity' | 'debt' | 'government';
  threeYearReturn: number;
  volatility: number;
  expenseRatio: number;
  currentPrice: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
  minInvestment: number;
}

export const investments: Investment[] = [
  // Equity Instruments
  {
    symbol: 'NIFTY50ETF',
    name: 'Nifty 50 ETF',
    type: 'equity',
    threeYearReturn: 12.5,
    volatility: 16.2,
    expenseRatio: 0.5,
    currentPrice: 185.50,
    riskLevel: 'medium',
    description: 'Tracks the Nifty 50 index, providing broad market exposure to top 50 Indian companies.',
    minInvestment: 1000,
  },
  {
    symbol: 'ICICIPRU',
    name: 'ICICI Prudential Bluechip Fund',
    type: 'equity',
    threeYearReturn: 14.8,
    volatility: 18.5,
    expenseRatio: 1.05,
    currentPrice: 62.30,
    riskLevel: 'medium',
    description: 'Invests in large-cap stocks with strong fundamentals and growth potential.',
    minInvestment: 5000,
  },
  {
    symbol: 'HDFCTOP100',
    name: 'HDFC Top 100 Fund',
    type: 'equity',
    threeYearReturn: 13.2,
    volatility: 17.8,
    expenseRatio: 1.25,
    currentPrice: 745.20,
    riskLevel: 'medium',
    description: 'Focuses on top 100 companies by market capitalization for steady growth.',
    minInvestment: 5000,
  },
  {
    symbol: 'MOTILALMIDCAP',
    name: 'Motilal Oswal Midcap Fund',
    type: 'equity',
    threeYearReturn: 18.6,
    volatility: 24.3,
    expenseRatio: 1.8,
    currentPrice: 89.15,
    riskLevel: 'high',
    description: 'Invests in mid-cap companies with high growth potential but higher volatility.',
    minInvestment: 5000,
  },
  {
    symbol: 'SBISMALLCAP',
    name: 'SBI Small Cap Fund',
    type: 'equity',
    threeYearReturn: 22.4,
    volatility: 28.7,
    expenseRatio: 1.95,
    currentPrice: 156.80,
    riskLevel: 'high',
    description: 'Targets small-cap companies for potentially higher returns with significant risk.',
    minInvestment: 5000,
  },
  
  // Debt Instruments
  {
    symbol: 'ICICISHTERM',
    name: 'ICICI Short Term Fund',
    type: 'debt',
    threeYearReturn: 6.8,
    volatility: 2.1,
    expenseRatio: 0.65,
    currentPrice: 28.45,
    riskLevel: 'low',
    description: 'Invests in short-term debt securities with low interest rate risk.',
    minInvestment: 5000,
  },
  {
    symbol: 'HDFCCORP',
    name: 'HDFC Corporate Bond Fund',
    type: 'debt',
    threeYearReturn: 7.2,
    volatility: 2.8,
    expenseRatio: 0.45,
    currentPrice: 22.15,
    riskLevel: 'low',
    description: 'Invests in high-quality corporate bonds for stable income.',
    minInvestment: 5000,
  },
  {
    symbol: 'AXISCREDIT',
    name: 'Axis Credit Risk Fund',
    type: 'debt',
    threeYearReturn: 8.5,
    volatility: 4.2,
    expenseRatio: 1.15,
    currentPrice: 19.85,
    riskLevel: 'medium',
    description: 'Invests in lower-rated corporate bonds for higher yields with moderate risk.',
    minInvestment: 5000,
  },
  {
    symbol: 'UTILTDURATION',
    name: 'UTI Medium Duration Fund',
    type: 'debt',
    threeYearReturn: 7.8,
    volatility: 3.5,
    expenseRatio: 0.85,
    currentPrice: 25.60,
    riskLevel: 'low',
    description: 'Invests in medium-duration debt securities balancing yield and interest rate risk.',
    minInvestment: 5000,
  },
  
  // Government Securities
  {
    symbol: 'GILT10Y',
    name: '10-Year Government Bond',
    type: 'government',
    threeYearReturn: 6.2,
    volatility: 3.8,
    expenseRatio: 0.25,
    currentPrice: 102.50,
    riskLevel: 'low',
    description: 'Direct investment in 10-year government bonds with sovereign guarantee.',
    minInvestment: 10000,
  },
  {
    symbol: 'SBIGILTSEC',
    name: 'SBI Magnum Gilt Fund',
    type: 'government',
    threeYearReturn: 5.9,
    volatility: 4.1,
    expenseRatio: 0.55,
    currentPrice: 48.25,
    riskLevel: 'low',
    description: 'Invests in government securities across different maturities.',
    minInvestment: 5000,
  },
  {
    symbol: 'ICICIGILT',
    name: 'ICICI Gilt Fund',
    type: 'government',
    threeYearReturn: 6.0,
    volatility: 3.9,
    expenseRatio: 0.6,
    currentPrice: 18.90,
    riskLevel: 'low',
    description: 'Focuses on government bonds for capital preservation and steady income.',
    minInvestment: 5000,
  },
];

export const marketIndices = [
  { name: 'NIFTY 50', value: 21875.70, change: 2.45, changePercent: 0.011 },
  { name: 'SENSEX', value: 72273.90, change: 89.83, changePercent: 0.012 },
  { name: 'NIFTY BANK', value: 48251.35, change: -156.20, changePercent: -0.003 },
  { name: 'NIFTY IT', value: 35420.15, change: 421.75, changePercent: 0.012 },
];

export const newsHeadlines = [
  {
    title: 'RBI Maintains Repo Rate at 6.5%, Focuses on Inflation Control',
    summary: 'The Reserve Bank of India kept the repo rate unchanged, signaling a cautious approach to monetary policy.',
    timestamp: '2 hours ago',
  },
  {
    title: 'Indian IT Sector Shows Strong Q3 Results',
    summary: 'Major IT companies report better-than-expected quarterly earnings driven by AI and cloud services.',
    timestamp: '4 hours ago',
  },
  {
    title: 'FII Inflows Boost Market Sentiment in January',
    summary: 'Foreign institutional investors have pumped ₹12,000 crores into Indian equities this month.',
    timestamp: '6 hours ago',
  },
  {
    title: 'Green Bonds Gain Traction Among Indian Investors',
    summary: 'ESG-focused investments see increased adoption as sustainability becomes a key investment theme.',
    timestamp: '1 day ago',
  },
];

export const chartData = {
  nifty50: [
    { month: 'Jan', value: 21200 },
    { month: 'Feb', value: 21450 },
    { month: 'Mar', value: 21650 },
    { month: 'Apr', value: 21380 },
    { month: 'May', value: 21720 },
    { month: 'Jun', value: 21875 },
  ],
  portfolio: [
    { month: 'Jan', value: 100000 },
    { month: 'Feb', value: 102500 },
    { month: 'Mar', value: 104200 },
    { month: 'Apr', value: 103800 },
    { month: 'May', value: 106500 },
    { month: 'Jun', value: 108200 },
  ],
  individualStocks: {
    'RELIANCE': [
      { month: 'Jan', value: 2450 },
      { month: 'Feb', value: 2520 },
      { month: 'Mar', value: 2480 },
      { month: 'Apr', value: 2610 },
      { month: 'May', value: 2680 },
      { month: 'Jun', value: 2720 },
    ],
    'TCS': [
      { month: 'Jan', value: 3650 },
      { month: 'Feb', value: 3720 },
      { month: 'Mar', value: 3580 },
      { month: 'Apr', value: 3820 },
      { month: 'May', value: 3950 },
      { month: 'Jun', value: 4020 },
    ],
    'HDFCBANK': [
      { month: 'Jan', value: 1580 },
      { month: 'Feb', value: 1620 },
      { month: 'Mar', value: 1590 },
      { month: 'Apr', value: 1650 },
      { month: 'May', value: 1680 },
      { month: 'Jun', value: 1720 },
    ],
    'INFY': [
      { month: 'Jan', value: 1420 },
      { month: 'Feb', value: 1480 },
      { month: 'Mar', value: 1450 },
      { month: 'Apr', value: 1520 },
      { month: 'May', value: 1580 },
      { month: 'Jun', value: 1620 },
    ],
  },
  sectorPerformance: [
    { sector: 'IT', performance: 12.5, color: '#3B82F6' },
    { sector: 'Banking', performance: 8.2, color: '#10B981' },
    { sector: 'Energy', performance: 15.8, color: '#F59E0B' },
    { sector: 'Healthcare', performance: 6.4, color: '#EF4444' },
    { sector: 'Auto', performance: -2.1, color: '#8B5CF6' },
    { sector: 'FMCG', performance: 4.7, color: '#EC4899' },
  ],
  marketVolatility: [
    { month: 'Jan', volatility: 16.2 },
    { month: 'Feb', volatility: 14.8 },
    { month: 'Mar', volatility: 18.5 },
    { month: 'Apr', volatility: 15.2 },
    { month: 'May', volatility: 13.9 },
    { month: 'Jun', volatility: 12.4 },
  ],
};

export const topStocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2720.50, change: 45.20, changePercent: 1.69 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4020.75, change: 85.30, changePercent: 2.17 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1720.25, change: 28.50, changePercent: 1.68 },
  { symbol: 'INFY', name: 'Infosys', price: 1620.80, change: 42.15, changePercent: 2.67 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1150.40, change: -12.30, changePercent: -1.06 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2580.90, change: 18.75, changePercent: 0.73 },
  { symbol: 'ITC', name: 'ITC Limited', price: 485.60, change: -3.20, changePercent: -0.65 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1890.30, change: 22.80, changePercent: 1.22 },
];