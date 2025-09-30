import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Target, TrendingUp } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

interface QuizAnswer {
  age: number;
  income: number;
  investmentHorizon: number;
  riskTolerance: number;
  financialGoals: string[];
}

const questions = [
  {
    id: 'age',
    title: 'What is your age?',
    subtitle: 'Age helps determine your investment timeline and risk capacity',
    type: 'select' as const,
    options: [
      { value: 25, label: 'Under 25', weight: 0.8 },
      { value: 35, label: '25-35', weight: 0.9 },
      { value: 45, label: '36-45', weight: 0.7 },
      { value: 55, label: '46-55', weight: 0.5 },
      { value: 65, label: '56-65', weight: 0.3 },
      { value: 70, label: 'Above 65', weight: 0.1 },
    ],
  },
  {
    id: 'income',
    title: 'What is your annual household income?',
    subtitle: 'Income helps assess your investment capacity',
    type: 'select' as const,
    options: [
      { value: 300000, label: 'Below ₹3 Lakhs', weight: 0.3 },
      { value: 600000, label: '₹3-6 Lakhs', weight: 0.5 },
      { value: 1000000, label: '₹6-10 Lakhs', weight: 0.7 },
      { value: 1500000, label: '₹10-15 Lakhs', weight: 0.8 },
      { value: 2000000, label: '₹15-20 Lakhs', weight: 0.9 },
      { value: 3000000, label: 'Above ₹20 Lakhs', weight: 1.0 },
    ],
  },
  {
    id: 'investmentHorizon',
    title: 'What is your investment time horizon?',
    subtitle: 'Longer investment periods generally allow for higher risk tolerance',
    type: 'select' as const,
    options: [
      { value: 1, label: 'Less than 1 year', weight: 0.1 },
      { value: 3, label: '1-3 years', weight: 0.3 },
      { value: 5, label: '3-5 years', weight: 0.6 },
      { value: 10, label: '5-10 years', weight: 0.8 },
      { value: 15, label: '10-15 years', weight: 0.9 },
      { value: 20, label: 'More than 15 years', weight: 1.0 },
    ],
  },
  {
    id: 'riskTolerance',
    title: 'How do you react to market volatility?',
    subtitle: 'Your emotional response to market fluctuations',
    type: 'select' as const,
    options: [
      { value: 1, label: 'I panic and want to sell immediately', weight: 0.1 },
      { value: 2, label: 'I feel uncomfortable but hold my investments', weight: 0.3 },
      { value: 3, label: 'I remain neutral and stick to my plan', weight: 0.6 },
      { value: 4, label: 'I see it as a buying opportunity', weight: 0.8 },
      { value: 5, label: 'I actively invest more during market downturns', weight: 1.0 },
    ],
  },
  {
    id: 'financialGoals',
    title: 'What are your primary financial goals?',
    subtitle: 'Select all that apply',
    type: 'multiple' as const,
    options: [
      { value: 'retirement', label: 'Retirement Planning', weight: 0.7 },
      { value: 'wealth', label: 'Wealth Creation', weight: 0.9 },
      { value: 'education', label: "Children's Education", weight: 0.6 },
      { value: 'home', label: 'Home Purchase', weight: 0.5 },
      { value: 'emergency', label: 'Emergency Fund', weight: 0.2 },
      { value: 'tax', label: 'Tax Saving', weight: 0.4 },
    ],
  },
];

export default function RiskQuiz() {
  const { updateRiskProfile } = useUser();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({
    financialGoals: [],
  });

  const handleAnswer = (questionId: string, value: any) => {
    if (questionId === 'financialGoals') {
      const currentGoals = answers.financialGoals || [];
      const newGoals = currentGoals.includes(value)
        ? currentGoals.filter(goal => goal !== value)
        : [...currentGoals, value];
      setAnswers({ ...answers, financialGoals: newGoals });
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const calculateRiskScore = (): number => {
    let totalScore = 0;
    let totalWeight = 0;

    // Age weight (25%)
    if (answers.age) {
      const ageOption = questions[0].options.find(opt => opt.value === answers.age);
      if (ageOption) {
        totalScore += ageOption.weight * 25;
        totalWeight += 25;
      }
    }

    // Income weight (20%)
    if (answers.income) {
      const incomeOption = questions[1].options.find(opt => opt.value === answers.income);
      if (incomeOption) {
        totalScore += incomeOption.weight * 20;
        totalWeight += 20;
      }
    }

    // Investment horizon weight (30%)
    if (answers.investmentHorizon) {
      const horizonOption = questions[2].options.find(opt => opt.value === answers.investmentHorizon);
      if (horizonOption) {
        totalScore += horizonOption.weight * 30;
        totalWeight += 30;
      }
    }

    // Risk tolerance weight (15%)
    if (answers.riskTolerance) {
      const riskOption = questions[3].options.find(opt => opt.value === answers.riskTolerance);
      if (riskOption) {
        totalScore += riskOption.weight * 15;
        totalWeight += 15;
      }
    }

    // Financial goals weight (10%)
    if (answers.financialGoals && answers.financialGoals.length > 0) {
      const goalWeights = answers.financialGoals.map(goal =>
        questions[4].options.find(opt => opt.value === goal)?.weight || 0
      );
      const avgGoalWeight = goalWeights.reduce((sum, weight) => sum + weight, 0) / goalWeights.length;
      totalScore += avgGoalWeight * 10;
      totalWeight += 10;
    }

    return totalWeight > 0 ? Math.round(totalScore) : 0;
  };

  const getAllocation = (score: number) => {
    if (score <= 30) {
      return { equity: 20, debt: 50, government: 30 };
    } else if (score <= 50) {
      return { equity: 40, debt: 40, government: 20 };
    } else if (score <= 70) {
      return { equity: 60, debt: 25, government: 15 };
    } else {
      return { equity: 80, debt: 15, government: 5 };
    }
  };

  const canProceed = () => {
    const question = questions[currentQuestion];
    if (question.type === 'multiple') {
      return answers.financialGoals && answers.financialGoals.length > 0;
    }
    return answers[question.id as keyof QuizAnswer] !== undefined;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate and save results
      const score = calculateRiskScore();
      const allocation = getAllocation(score);
      
      const riskProfile = {
        age: answers.age || 0,
        income: answers.income || 0,
        investmentHorizon: answers.investmentHorizon || 0,
        riskTolerance: answers.riskTolerance || 0,
        financialGoals: answers.financialGoals || [],
        score,
        allocation,
      };

      updateRiskProfile(riskProfile);
      navigate('/recommendations');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Target className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Risk Assessment</h1>
            <p className="text-gray-600">Help us understand your investment profile</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{question.title}</h2>
        <p className="text-gray-600 mb-6">{question.subtitle}</p>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = question.type === 'multiple'
              ? answers.financialGoals?.includes(option.value)
              : answers[question.id as keyof QuizAnswer] === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(question.id, option.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full m-auto" />}
                  </div>
                  {option.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestion === questions.length - 1 ? (
            <>
              Get Results
              <TrendingUp className="h-5 w-5 ml-2" />
            </>
          ) : (
            <>
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}