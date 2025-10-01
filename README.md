🚀 GenAI Investment Advisor for Indian Retail Investors

A comprehensive, AI-powered investment advisory platform designed specifically for Indian retail investors. This application provides personalized investment recommendations, risk assessment, market analysis, and virtual trading capabilities - all powered by intelligent algorithms and working entirely with static data for demonstration purposes.

📋 Project Overview

The GenAI Investment Advisor is a full-stack web application that democratizes investment advice for Indian retail investors. It combines sophisticated risk assessment algorithms, personalized recommendation engines, and educational content to guide users through their investment journey.

Key Features

🎯 Intelligent Risk Assessment – Dynamic scoring algorithm with weighted factors

📊 Personalized Recommendations – AI-driven investment suggestions based on risk profile

📈 Market Snapshot – Real-time market visualization with interactive charts

💼 Virtual Trading Simulator – Paper trading with portfolio tracking

🎓 Educational Content – Context-aware financial literacy resources

👤 User Profile Management – Comprehensive profile and preference management

🛠️ Tech Stack
Frontend

React 18 – Modern React with hooks and functional components

TypeScript – Type-safe development with enhanced IDE support

Tailwind CSS – Utility-first CSS framework for rapid UI development

Vite – Next-generation frontend build tool

React Router DOM – Declarative routing for React applications

Lucide React – Beautiful & consistent icon library

State Management

React Context API – Global state management with custom hooks

LocalStorage – Persistent client-side data storage

Data & Charts

Custom SVG Charts – Lightweight, responsive chart components

Mock Data Architecture – Comprehensive static data structure

JSON-based Storage – Structured data management

Development Tools

ESLint – Code linting and quality assurance

PostCSS – CSS processing and optimization

Autoprefixer – Automatic CSS vendor prefixing

🏗️ Application Architecture
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + TypeScript)            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │    Auth     │  │    User     │  │  Portfolio  │         │
│  │   Context   │  │   Context   │  │   Context   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Login/    │  │    Risk     │  │Recommenda-  │         │
│  │   Signup    │  │ Assessment  │  │    tions    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Market    │  │  Trading    │  │   Profile   │         │
│  │  Snapshot   │  │  Simulator  │  │ Management  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer (LocalStorage)                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │    User     │  │    Risk     │  │  Portfolio  │         │
│  │  Profiles   │  │  Profiles   │  │    Data     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘

Component Structure
src/
├── components/
│   └── Layout/
│       ├── Header.tsx          # Navigation header
│       └── Sidebar.tsx         # Main navigation sidebar
├── contexts/
│   ├── AuthContext.tsx         # Authentication state
│   ├── UserContext.tsx         # User profile & risk data
│   └── PortfolioContext.tsx    # Trading & portfolio state
├── pages/
│   ├── Login.tsx              # Authentication page
│   ├── Home.tsx               # Dashboard overview
│   ├── RiskQuiz.tsx           # Risk assessment form
│   ├── Recommendations.tsx     # AI-powered suggestions
│   ├── MarketSnapshot.tsx     # Market analysis & charts
│   ├── Simulator.tsx          # Virtual trading platform
│   └── Profile.tsx            # User profile management
├── data/
│   └── mockData.ts            # Static data & market information
└── App.tsx                    # Main application component

👤 User Journey
graph TD
    A[Landing Page] --> B[Sign Up/Login]
    B --> C[Risk Assessment Quiz]
    C --> D[Risk Score Calculation]
    D --> E[Personalized Dashboard]
    E --> F[Investment Recommendations]
    F --> G[Market Analysis]
    G --> H[Virtual Trading]
    H --> I[Portfolio Tracking]
    I --> J[Profile Management]
    
    F --> K[Educational Content]
    G --> K
    H --> K

Detailed User Flow

Authentication – Secure signup/login with email validation

Risk Profiling – 5-question assessment covering:

Age and life stage

Annual household income

Investment time horizon

Risk tolerance and market behavior

Financial goals and objectives

Score Calculation – Weighted algorithm produces 0–100 risk score

Asset Allocation – Dynamic allocation bands based on risk profile

Recommendations – Filtered and ranked investment options

Market Research – Interactive charts and market analysis

Virtual Trading – Paper trading with real-time portfolio updates

Continuous Learning – Educational content and tips throughout

🔄 Data Flow
Authentication Flow
User Input → Validation → LocalStorage → Context State → UI Update

Risk Assessment Flow
Quiz Responses → Weighted Scoring Algorithm → Risk Profile → Asset Allocation → Recommendations

Trading Flow
Trade Order → Validation → Portfolio Update → Transaction Log → LocalStorage → UI Refresh

Data Persistence Strategy

User Accounts: investmentAdvisor_users

Current Session: investmentAdvisor_currentUser

Risk Profiles: investmentAdvisor_riskProfile_{userId}

Portfolios: investmentAdvisor_portfolio_{userId}
