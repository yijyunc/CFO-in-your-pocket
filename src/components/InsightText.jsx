import React from 'react';
import { AlertTriangle, TrendingUp, CheckCircle, Target } from 'lucide-react';

const InsightText = ({ cashOnHand, monthlyBurn, runwayMonths, className = '' }) => {
  const getInsight = () => {
    const months = runwayMonths;
    
    if (months <= 3) {
      return {
        icon: AlertTriangle,
        color: 'text-alert-700 bg-alert-50 border-alert-200',
        bgGradient: 'bg-gradient-to-r from-alert-50 to-red-50',
        priority: 'CRITICAL',
        title: 'Emergency Action Required',
        text: `Only ${months.toFixed(1)} months of runway remaining. Immediate steps needed:`,
        actions: [
          'Implement emergency cost reduction (30-50%)',
          'Accelerate fundraising timeline',
          'Consider bridge financing options',
          'Evaluate non-essential expenses for elimination'
        ]
      };
    } else if (months <= 6) {
      const savingsNeeded = (monthlyBurn * 0.15);
      const extraMonths = (cashOnHand / (monthlyBurn * 0.85)) - months;
      return {
        icon: Target,
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        bgGradient: 'bg-gradient-to-r from-amber-50 to-orange-50',
        priority: 'HIGH',
        title: 'Strategic Action Recommended',
        text: `${months.toFixed(1)} months runway. Optimize now to extend timeline:`,
        actions: [
          `Reduce burn by ${savingsNeeded.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} for +${extraMonths.toFixed(1)} months`,
          'Begin fundraising process within 60 days',
          'Review and optimize largest expense categories',
          'Consider revenue acceleration strategies'
        ]
      };
    } else if (months <= 12) {
      return {
        icon: TrendingUp,
        color: 'text-blue-700 bg-blue-50 border-blue-200',
        bgGradient: 'bg-gradient-to-r from-blue-50 to-indigo-50',
        priority: 'MEDIUM',
        title: 'Growth & Monitoring Phase',
        text: `${months.toFixed(1)} months runway. Good position for strategic growth:`,
        actions: [
          'Focus on revenue growth and customer acquisition',
          'Monitor burn rate trends monthly',
          'Plan fundraising 6 months ahead of depletion',
          'Invest in high-ROI growth initiatives'
        ]
      };
    } else {
      return {
        icon: CheckCircle,
        color: 'text-success-700 bg-success-50 border-success-200',
        bgGradient: 'bg-gradient-to-r from-success-50 to-emerald-50',
        priority: 'LOW',
        title: 'Excellent Financial Position',
        text: `${months.toFixed(1)} months runway. Strong position for aggressive growth:`,
        actions: [
          'Invest confidently in growth initiatives',
          'Consider strategic hiring and expansion',
          'Explore market expansion opportunities',
          'Build financial reserves for future opportunities'
        ]
      };
    }
  };

  const insight = getInsight();
  const Icon = insight.icon;

  return (
    <div className={`rounded-2xl border ${insight.bgGradient} ${insight.color} ${className} overflow-hidden`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-2 rounded-xl bg-white/60`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-lg text-xs font-bold bg-white/80 ${
                insight.priority === 'CRITICAL' ? 'text-alert-700' :
                insight.priority === 'HIGH' ? 'text-amber-700' :
                insight.priority === 'MEDIUM' ? 'text-blue-700' :
                'text-success-700'
              }`}>
                {insight.priority} PRIORITY
              </span>
            </div>
            <h4 className="font-bold text-lg mt-1">{insight.title}</h4>
          </div>
        </div>

        {/* Main Text */}
        <p className="font-medium mb-4 leading-relaxed">
          {insight.text}
        </p>

        {/* Action Items */}
        <div className="space-y-2">
          {insight.actions.map((action, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0"></div>
              <span className="text-sm font-medium leading-relaxed">{action}</span>
            </div>
          ))}
        </div>

        {/* Financial Metrics Summary */}
        <div className="mt-6 p-4 bg-white/60 rounded-xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">{((monthlyBurn / cashOnHand) * 100).toFixed(1)}%</div>
              <div className="text-xs font-medium opacity-75">Monthly Burn Rate</div>
            </div>
            <div>
              <div className="text-lg font-bold">{Math.round(runwayMonths * 4.33)}</div>
              <div className="text-xs font-medium opacity-75">Weeks Remaining</div>
            </div>
            <div>
              <div className="text-lg font-bold">
                {new Date(Date.now() + runwayMonths * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
              <div className="text-xs font-medium opacity-75">Depletion Date</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightText;
