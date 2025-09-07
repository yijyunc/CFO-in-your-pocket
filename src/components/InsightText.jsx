import React from 'react';
import { AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

const InsightText = ({ cashOnHand, monthlyBurn, runwayMonths, className = '' }) => {
  const getInsight = () => {
    const months = runwayMonths;
    
    if (months <= 3) {
      return {
        icon: AlertTriangle,
        color: 'text-danger bg-red-50 border-red-200',
        text: `🚨 Critical: Only ${months.toFixed(1)} months left. Consider emergency fundraising or immediate cost cuts.`
      };
    } else if (months <= 6) {
      const savingsNeeded = (monthlyBurn * 0.1);
      const extraMonths = (cashOnHand / (monthlyBurn * 0.9)) - months;
      return {
        icon: AlertTriangle,
        color: 'text-warning bg-yellow-50 border-yellow-200',
        text: `⚠️ You have ~${months.toFixed(1)} months. Trim ${savingsNeeded.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} (10% spend) for +${extraMonths.toFixed(1)} months runway.`
      };
    } else if (months <= 12) {
      return {
        icon: TrendingUp,
        color: 'text-blue-600 bg-blue-50 border-blue-200',
        text: `📈 ${months.toFixed(1)} months runway. Good position to focus on growth while monitoring burn rate.`
      };
    } else {
      return {
        icon: CheckCircle,
        color: 'text-safe bg-green-50 border-green-200',
        text: `✅ Excellent: ${months.toFixed(1)} months runway. Strong financial position to invest in growth initiatives.`
      };
    }
  };

  const insight = getInsight();
  const Icon = insight.icon;

  return (
    <div className={`p-4 rounded-lg border ${insight.color} ${className}`}>
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <p className="text-sm font-medium leading-relaxed">
          {insight.text}
        </p>
      </div>
    </div>
  );
};

export default InsightText;
