import React from 'react';

const RunwayLogo = ({ size = 'w-8 h-8', className = '' }) => {
  return (
    <div className={`${size} ${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Runway base */}
        <rect
          x="10"
          y="45"
          width="80"
          height="10"
          rx="2"
          fill="url(#runwayGradient)"
        />
        
        {/* Runway stripes */}
        <rect x="15" y="47" width="8" height="6" rx="1" fill="white" opacity="0.8" />
        <rect x="28" y="47" width="8" height="6" rx="1" fill="white" opacity="0.8" />
        <rect x="41" y="47" width="8" height="6" rx="1" fill="white" opacity="0.8" />
        <rect x="54" y="47" width="8" height="6" rx="1" fill="white" opacity="0.8" />
        <rect x="67" y="47" width="8" height="6" rx="1" fill="white" opacity="0.8" />
        <rect x="80" y="47" width="8" height="6" rx="1" fill="white" opacity="0.8" />
        
        {/* Airplane taking off */}
        <g transform="translate(70,35) rotate(15)">
          {/* Airplane body */}
          <ellipse cx="0" cy="0" rx="12" ry="3" fill="url(#planeGradient)" />
          
          {/* Wings */}
          <ellipse cx="-2" cy="0" rx="8" ry="1.5" fill="url(#wingGradient)" />
          <ellipse cx="3" cy="0" rx="4" ry="1" fill="url(#wingGradient)" />
          
          {/* Tail */}
          <path d="M-10,-1 L-14,-3 L-14,3 L-10,1 Z" fill="url(#wingGradient)" />
        </g>
        
        {/* Success trajectory arc */}
        <path
          d="M 20 50 Q 50 20 85 25"
          stroke="url(#trajectoryGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        
        {/* Credit score indicators (small circles) */}
        <circle cx="25" cy="35" r="2" fill="#10b981" opacity="0.6" />
        <circle cx="35" cy="30" r="2" fill="#10b981" opacity="0.7" />
        <circle cx="45" cy="25" r="2" fill="#10b981" opacity="0.8" />
        <circle cx="55" cy="22" r="2" fill="#10b981" opacity="0.9" />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="runwayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          
          <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#9ca3af" />
          </linearGradient>
          
          <linearGradient id="trajectoryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default RunwayLogo;
