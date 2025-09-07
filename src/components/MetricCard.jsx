import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  isPremium = false,
  status = 'neutral',
  insight = null 
}) => {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (title.includes('Cash') || title.includes('Burn')) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      }
      return val.toFixed(1);
    }
    return val;
  };

  const getTrendColor = () => {
    if (!trend) return 'text-slate-400';
    if (title.includes('Burn')) {
      // For burn rate, lower is better
      return trend > 0 ? 'text-alert-600' : 'text-success-600';
    }
    // For cash and runway, higher is better
    return trend > 0 ? 'text-success-600' : 'text-alert-600';
  };

  const getTrendIcon = () => {
    if (!trend || trend === 0) return <Minus className="w-4 h-4" />;
    return trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const getStatusStyles = () => {
    switch (status) {
      case 'danger':
        return 'border-alert-200 bg-gradient-to-br from-alert-50 to-white';
      case 'warning':
        return 'border-amber-200 bg-gradient-to-br from-amber-50 to-white';
      case 'success':
        return 'border-success-200 bg-gradient-to-br from-success-50 to-white';
      default:
        return 'border-slate-200 bg-gradient-to-br from-white to-slate-50';
    }
  };

  const cardClass = isPremium ? 'metric-card-premium' : `metric-card ${getStatusStyles()}`;

  return (
    <div className={`${cardClass} group hover:scale-[1.02] transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {Icon && (
            <div className={`p-3 rounded-2xl transition-all duration-200 ${
              isPremium 
                ? 'bg-brand-100 group-hover:bg-brand-200' 
                : 'bg-slate-100 group-hover:bg-slate-200'
            }`}>
              <Icon className={`w-6 h-6 ${
                isPremium ? 'text-brand-600' : 'text-slate-600'
              }`} />
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        {trend !== undefined && (
          <div className={`flex items-center space-x-1 px-3 py-2 rounded-xl bg-white/60 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-semibold">
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          </div>
        )}
      </div>
      
      {/* Value */}
      <div className="space-y-2">
        <div className={`text-4xl font-bold tracking-tight ${
          status === 'danger' ? 'text-alert-700' :
          status === 'warning' ? 'text-amber-700' :
          status === 'success' ? 'text-success-700' :
          'text-slate-900'
        }`}>
          {formatValue(value)}
        </div>
        
        {/* Insight */}
        {insight && (
          <div className="mt-4 p-3 bg-white/80 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-600 font-medium">{insight}</p>
          </div>
        )}
      </div>

      {/* Progress indicator for runway */}
      {title.includes('Runway') && typeof value === 'number' && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>0 months</span>
            <span>18+ months</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${
                value <= 3 ? 'bg-alert-500' :
                value <= 6 ? 'bg-amber-500' :
                value <= 12 ? 'bg-blue-500' :
                'bg-success-500'
              }`}
              style={{ width: `${Math.min((value / 18) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
