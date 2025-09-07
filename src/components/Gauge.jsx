import React from 'react';
import { Shield, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const Gauge = ({ score, className = '', size = 'large', showDetails = true }) => {
  const getScoreColor = (score) => {
    if (score <= 39) return '#dc2626'; // alert-600
    if (score <= 69) return '#d97706'; // amber-600  
    return '#059669'; // success-600
  };

  const getScoreGradient = (score) => {
    if (score <= 39) return 'from-alert-500 to-alert-600';
    if (score <= 69) return 'from-amber-500 to-amber-600';
    return 'from-success-500 to-success-600';
  };

  const getScoreStatus = (score) => {
    if (score <= 39) return { 
      text: 'Critical Risk', 
      icon: AlertTriangle, 
      color: 'text-alert-600',
      bgColor: 'bg-alert-50',
      borderColor: 'border-alert-200'
    };
    if (score <= 69) return { 
      text: 'Needs Attention', 
      icon: Shield, 
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    };
    return { 
      text: 'Healthy', 
      icon: CheckCircle, 
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200'
    };
  };

  const color = getScoreColor(score);
  const status = getScoreStatus(score);
  const StatusIcon = status.icon;
  
  // Calculate the stroke-dashoffset for the progress
  const radius = size === 'large' ? 85 : 65;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const containerSize = size === 'large' ? 'w-64 h-64' : 'w-48 h-48';
  const viewBox = size === 'large' ? '0 0 200 200' : '0 0 160 160';
  const centerX = size === 'large' ? 100 : 80;
  const centerY = size === 'large' ? 100 : 80;

  return (
    <div className={`gauge-container ${className}`}>
      <div className={`relative ${containerSize} mx-auto`}>
        {/* Outer glow effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-xl`} />
        
        {/* Main gauge */}
        <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox={viewBox}>
          {/* Background track */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="12"
            className="opacity-20"
          />
          
          {/* Progress circle with gradient */}
          <defs>
            <linearGradient id={`gauge-gradient-${score}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
          </defs>
          
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={`url(#gauge-gradient-${score})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            filter="drop-shadow(0 0 8px rgba(0,0,0,0.1))"
          />
          
          {/* Inner highlight */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius - 20}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeOpacity="0.3"
            strokeDasharray={circumference * 0.8}
            strokeDashoffset={offset * 0.8}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className={`text-5xl font-bold tracking-tight mb-2 ${
            size === 'large' ? 'text-5xl' : 'text-4xl'
          } text-slate-900`}>
            {Math.round(score)}
          </div>
          
          {showDetails && (
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${status.bgColor} ${status.borderColor} border`}>
              <StatusIcon className={`w-4 h-4 ${status.color}`} />
              <span className={`text-sm font-semibold ${status.color}`}>
                {status.text}
              </span>
            </div>
          )}
          
          {/* Performance indicator */}
          {showDetails && (
            <div className="mt-3 text-center">
              <div className="flex items-center justify-center space-x-1 text-slate-500">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-medium">Health Score</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Score scale */}
      {showDetails && (
        <div className="mt-6">
          <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Critical</span>
            <span>Caution</span>
            <span>Healthy</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full flex">
              <div className="flex-1 bg-alert-400"></div>
              <div className="flex-1 bg-amber-400"></div>
              <div className="flex-1 bg-success-400"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0</span>
            <span>40</span>
            <span>70</span>
            <span>100</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gauge;
