import React from 'react';

const Gauge = ({ score, className = '' }) => {
  const getScoreColor = (score) => {
    if (score <= 39) return '#ef4444'; // danger
    if (score <= 69) return '#f59e0b'; // warning
    return '#10b981'; // safe
  };

  const getScoreStatus = (score) => {
    if (score <= 39) return { text: 'Danger', emoji: '🔴', color: 'text-danger' };
    if (score <= 69) return { text: 'Warning', emoji: '🟡', color: 'text-warning' };
    return { text: 'Safe', emoji: '🟢', color: 'text-safe' };
  };

  const color = getScoreColor(score);
  const status = getScoreStatus(score);
  
  // Calculate the stroke-dashoffset for the progress
  const circumference = 2 * Math.PI * 70; // radius = 70
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`gauge-container ${className}`}>
      <div className="relative w-48 h-48 mx-auto">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-gray-900 mb-1">
            {Math.round(score)}
          </div>
          <div className={`text-sm font-medium ${status.color} flex items-center space-x-1`}>
            <span>{status.emoji}</span>
            <span>{status.text}</span>
          </div>
        </div>
      </div>
      
      {/* Score labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2 px-4">
        <span>0</span>
        <span className="font-medium">Runway Health Score</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default Gauge;
