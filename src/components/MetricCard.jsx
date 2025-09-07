import React from 'react';

const MetricCard = ({ title, value, subtitle, icon: Icon, trend }) => {
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
    if (!trend) return '';
    return trend > 0 ? 'text-safe' : 'text-danger';
  };

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          )}
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        </div>
        {trend !== undefined && (
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-3xl font-bold text-gray-900">
          {formatValue(value)}
        </div>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
