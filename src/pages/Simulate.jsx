import React, { useState, useEffect } from 'react';
import MetricCard from '../components/MetricCard';
import Gauge from '../components/Gauge';
import InsightText from '../components/InsightText';
import { 
  DollarSign, 
  TrendingDown, 
  Calendar, 
  Users, 
  Play, 
  RotateCcw,
  Calculator,
  TrendingUp
} from 'lucide-react';

const Simulate = ({ data, onApplyChanges, showToast }) => {
  const [burnChange, setBurnChange] = useState(0); // -30% to +30%
  const [mrrGrowth, setMrrGrowth] = useState(0); // 0% to 10%
  const [hireEngineer, setHireEngineer] = useState(false);
  
  // Calculate simulated values
  const baseBurn = data.monthlyBurn;
  const engineerCost = hireEngineer ? 10000 : 0;
  const burnMultiplier = 1 + (burnChange / 100);
  const simulatedBurn = (baseBurn * burnMultiplier) + engineerCost;
  
  // Simulate MRR impact on burn (higher MRR growth can reduce effective burn)
  const mrrImpact = mrrGrowth * 2000; // $2k reduction per 1% MRR growth
  const effectiveBurn = Math.max(simulatedBurn - mrrImpact, 20000); // Minimum $20k burn
  
  const simulatedRunway = data.cashOnHand / effectiveBurn;
  
  const calculateHealthScore = (months) => {
    if (months >= 18) return 100;
    if (months >= 12) return 85;
    if (months >= 9) return 70;
    if (months >= 6) return 55;
    if (months >= 3) return 35;
    return Math.max(10, months * 10);
  };

  const simulatedScore = calculateHealthScore(simulatedRunway);

  const handleReset = () => {
    setBurnChange(0);
    setMrrGrowth(0);
    setHireEngineer(false);
    showToast('Simulation reset to baseline', 'success');
  };

  const handleApply = () => {
    const newData = {
      ...data,
      monthlyBurn: effectiveBurn
    };
    onApplyChanges(newData);
    showToast('Changes applied to dashboard!', 'success');
  };

  // Calculate changes from baseline
  const burnDifference = effectiveBurn - data.monthlyBurn;
  const runwayDifference = simulatedRunway - (data.cashOnHand / data.monthlyBurn);
  const scoreDifference = simulatedScore - calculateHealthScore(data.cashOnHand / data.monthlyBurn);

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-brand-50 to-purple-50 rounded-2xl p-8 border border-brand-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-brand-100 rounded-2xl">
              <Calculator className="w-8 h-8 text-brand-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Predictive Scenario Engine</h2>
              <p className="text-slate-600 mt-1">CFO-level modeling for strategic decision making</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleReset}
              className="btn-secondary flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleApply}
              className="btn-primary flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Apply Changes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Burn Rate Controls */}
        <div className="slider-container">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Burn Rate Changes</h3>
          
          {/* Burn Change Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                Burn Rate Adjustment
              </label>
              <span className="text-sm text-gray-600">
                {burnChange > 0 ? '+' : ''}{burnChange}%
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              value={burnChange}
              onChange={(e) => setBurnChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>-30%</span>
              <span>0%</span>
              <span>+30%</span>
            </div>
          </div>

          {/* Engineer Hire Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-600" />
              <div>
                <div className="font-medium text-gray-900">Hire 1 Engineer</div>
                <div className="text-sm text-gray-600">+$10k monthly burn</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hireEngineer}
                onChange={(e) => setHireEngineer(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        {/* Revenue Controls */}
        <div className="slider-container">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth</h3>
          
          {/* MRR Growth Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                Monthly Recurring Revenue Growth
              </label>
              <span className="text-sm text-gray-600">
                {mrrGrowth}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={mrrGrowth}
              onChange={(e) => setMrrGrowth(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>5%</span>
              <span>10%</span>
            </div>
          </div>

          {/* MRR Impact */}
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm font-medium text-green-900 mb-1">
              Revenue Impact
            </div>
            <div className="text-sm text-green-700">
              {mrrGrowth > 0 ? (
                <>Reduces effective burn by ${mrrImpact.toLocaleString()}/month</>
              ) : (
                <>No revenue growth impact</>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Results */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Simulated Results</h3>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Simulated Monthly Burn"
            value={effectiveBurn}
            subtitle={`${burnDifference >= 0 ? '+' : ''}${burnDifference.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} from baseline`}
            icon={TrendingDown}
            trend={burnDifference > 0 ? ((burnDifference / data.monthlyBurn) * 100) : -((Math.abs(burnDifference) / data.monthlyBurn) * 100)}
          />
          <MetricCard
            title="Simulated Runway"
            value={simulatedRunway}
            subtitle={`${runwayDifference >= 0 ? '+' : ''}${runwayDifference.toFixed(1)} months from baseline`}
            icon={Calendar}
            trend={runwayDifference > 0 ? 10 : runwayDifference < 0 ? -10 : 0}
          />
          <MetricCard
            title="Health Score Impact"
            value={simulatedScore}
            subtitle={`${scoreDifference >= 0 ? '+' : ''}${scoreDifference.toFixed(0)} points from baseline`}
            icon={DollarSign}
            trend={scoreDifference}
          />
        </div>

        {/* Health Gauge & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Simulated Health Score
              </h3>
              <p className="text-sm text-gray-600">
                Impact of your scenario changes
              </p>
            </div>
            
            <Gauge score={simulatedScore} />
            
            <div className="mt-6">
              <InsightText 
                cashOnHand={data.cashOnHand}
                monthlyBurn={effectiveBurn}
                runwayMonths={simulatedRunway}
              />
            </div>
          </div>

          {/* Scenario Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Scenario Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Base Monthly Burn</span>
                <span className="font-medium">{data.monthlyBurn.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</span>
              </div>
              
              {burnChange !== 0 && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Burn Rate Change ({burnChange > 0 ? '+' : ''}{burnChange}%)</span>
                  <span className={`font-medium ${burnChange > 0 ? 'text-danger' : 'text-safe'}`}>
                    {(baseBurn * burnMultiplier - baseBurn).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                  </span>
                </div>
              )}
              
              {hireEngineer && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Engineer Hire</span>
                  <span className="font-medium text-danger">+$10,000</span>
                </div>
              )}
              
              {mrrGrowth > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">MRR Growth Impact ({mrrGrowth}%)</span>
                  <span className="font-medium text-safe">-${mrrImpact.toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-2 pt-4 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-900">Net Monthly Burn</span>
                <span className="font-bold text-lg">{effectiveBurn.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-gray-900">Runway Change</span>
                <span className={`font-bold text-lg ${runwayDifference >= 0 ? 'text-safe' : 'text-danger'}`}>
                  {runwayDifference >= 0 ? '+' : ''}{runwayDifference.toFixed(1)} months
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulate;
