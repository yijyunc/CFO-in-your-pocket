import React, { useState, useEffect } from 'react';
import MetricCard from '../components/MetricCard';
import Gauge from '../components/Gauge';
import InsightText from '../components/InsightText';
import { 
  DollarSign, 
  TrendingDown, 
  Calendar, 
  TrendingUp,
  AlertTriangle,
  Target,
  Activity,
  BarChart3,
  Eye,
  Brain
} from 'lucide-react';

const Dashboard = ({ data }) => {
  const { cashOnHand, monthlyBurn } = data;
  const runwayMonths = cashOnHand / monthlyBurn;
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading for smooth animations
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [data]);
  
  // Enhanced runway health score calculation with multiple factors
  const calculateHealthScore = (months, burn, cash) => {
    let baseScore = 0;
    
    // Runway months score (60% weight)
    if (months >= 18) baseScore += 60;
    else if (months >= 12) baseScore += 50;
    else if (months >= 9) baseScore += 40;
    else if (months >= 6) baseScore += 30;
    else if (months >= 3) baseScore += 15;
    else baseScore += Math.max(5, months * 3);
    
    // Burn efficiency score (25% weight)
    const burnEfficiency = cash > 500000 && burn < 70000 ? 25 : 
                          cash > 300000 && burn < 80000 ? 20 :
                          cash > 200000 && burn < 90000 ? 15 : 10;
    baseScore += burnEfficiency;
    
    // Cash cushion score (15% weight)
    const cashCushion = cash >= 750000 ? 15 :
                       cash >= 500000 ? 12 :
                       cash >= 300000 ? 8 : 5;
    baseScore += cashCushion;
    
    return Math.min(100, Math.max(10, baseScore));
  };

  const healthScore = calculateHealthScore(runwayMonths, monthlyBurn, cashOnHand);
  
  // Get status for metric cards
  const getRunwayStatus = (months) => {
    if (months <= 3) return 'danger';
    if (months <= 6) return 'warning';
    if (months <= 12) return 'neutral';
    return 'success';
  };
  
  const getBurnStatus = (burn, cash) => {
    const burnRate = burn / cash * 100;
    if (burnRate > 15) return 'danger';
    if (burnRate > 10) return 'warning';
    return 'success';
  };

  // Mock monthly trend data for the chart
  const monthlyData = [
    { month: 'Jan', cash: 580000, burn: 62000 },
    { month: 'Feb', cash: 518000, burn: 63000 },
    { month: 'Mar', cash: 455000, burn: 65000 },
    { month: 'Apr', cash: 390000, burn: 65000 },
    { month: 'May', cash: 325000, burn: 65000 },
    { month: 'Jun', cash: 260000, burn: 65000 },
  ];

  const currentMonth = monthlyData[monthlyData.length - 1];

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* CFO Intelligence Header */}
      <div className="bg-gradient-to-r from-brand-50 to-blue-50 rounded-2xl p-8 border border-brand-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-brand-100 rounded-2xl">
              <Brain className="w-8 h-8 text-brand-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Financial Intelligence Dashboard</h1>
              <p className="text-slate-600 mt-1">CFO-level insights for your startup's financial health</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-brand-600">{healthScore}</div>
            <div className="text-sm text-slate-600">Health Score</div>
          </div>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard
          title="Cash Position"
          value={cashOnHand}
          subtitle="Available runway funding"
          icon={DollarSign}
          trend={-12.5}
          status="success"
          insight="Strong cash position for 7+ months"
          isPremium={false}
        />
        <MetricCard
          title="Monthly Burn Rate"
          value={monthlyBurn}
          subtitle="Operating expenses per month"
          icon={TrendingDown}
          trend={2.3}
          status={getBurnStatus(monthlyBurn, cashOnHand)}
          insight="Burn rate within healthy range"
          isPremium={false}
        />
        <MetricCard
          title="Runway Timeline"
          value={runwayMonths}
          subtitle="Months until cash depletion"
          icon={Calendar}
          status={getRunwayStatus(runwayMonths)}
          insight={runwayMonths > 12 ? "Excellent runway position" : runwayMonths > 6 ? "Good runway, monitor closely" : "Critical: Need immediate action"}
          isPremium={true}
        />
      </div>

      {/* Enhanced Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Health Gauge */}
        <div className="lg:col-span-2 chart-container">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Target className="w-6 h-6 text-brand-600" />
              <h3 className="text-2xl font-bold text-slate-900">
                Runway Health Intelligence
              </h3>
            </div>
            <p className="text-slate-600">
              Multi-factor analysis of your startup's financial stability
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <Gauge score={healthScore} size="large" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <div className="text-2xl font-bold text-slate-900">{Math.round(runwayMonths * 4.33)}</div>
              <div className="text-sm text-slate-600">Weeks Remaining</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <div className="text-2xl font-bold text-slate-900">{Math.round((monthlyBurn / cashOnHand) * 100)}%</div>
              <div className="text-sm text-slate-600">Monthly Burn Rate</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <div className="text-2xl font-bold text-slate-900">
                {new Date(Date.now() + runwayMonths * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
              <div className="text-sm text-slate-600">Projected Depletion</div>
            </div>
          </div>
          
          <InsightText 
            cashOnHand={cashOnHand}
            monthlyBurn={monthlyBurn}
            runwayMonths={runwayMonths}
          />
        </div>

        {/* AI Insights Panel */}
        <div className="space-y-6">
          <div className="insight-card">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-5 h-5 text-brand-600" />
              <h4 className="font-semibold text-slate-900">Key Observations</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${healthScore > 70 ? 'bg-success-500' : healthScore > 40 ? 'bg-amber-500' : 'bg-alert-500'}`} />
                <p className="text-sm text-slate-700">
                  {healthScore > 70 ? 'Strong financial position with healthy runway' : 
                   healthScore > 40 ? 'Moderate runway - monitor burn rate closely' : 
                   'Critical runway situation - immediate action required'}
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2 bg-blue-500" />
                <p className="text-sm text-slate-700">
                  Current burn efficiency: {((cashOnHand / monthlyBurn) / 12 * 100).toFixed(0)}% of ideal 12-month runway
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2 bg-purple-500" />
                <p className="text-sm text-slate-700">
                  Recommended action: {runwayMonths > 12 ? 'Focus on growth initiatives' : 
                                     runwayMonths > 6 ? 'Optimize burn rate or secure funding' : 
                                     'Emergency cost reduction needed'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="w-5 h-5 text-brand-600" />
              <h4 className="font-semibold text-slate-900">Quick Actions</h4>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                <div className="font-medium text-slate-900 text-sm">Run Scenario Analysis</div>
                <div className="text-xs text-slate-600">Model different burn rates and hiring decisions</div>
              </button>
              <button className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                <div className="font-medium text-slate-900 text-sm">Compare to Industry</div>
                <div className="text-xs text-slate-600">See how you stack against similar startups</div>
              </button>
              <button className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                <div className="font-medium text-slate-900 text-sm">AI Recommendations</div>
                <div className="text-xs text-slate-600">Get personalized financial strategy advice</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Trend Analysis */}
      <div className="chart-container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-brand-600" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">Cash Flow Intelligence</h3>
              <p className="text-slate-600">Historical trends and predictive analysis</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-brand-500 rounded-full"></div>
              <span className="text-slate-600 font-medium">Cash Position</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-alert-500 rounded-full"></div>
              <span className="text-slate-600 font-medium">Monthly Burn</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              <span className="text-slate-600 font-medium">Projection</span>
            </div>
          </div>
        </div>

        {/* Enhanced trend visualization */}
        <div className="space-y-6">
          {monthlyData.map((item, index) => {
            const cashPercentage = (item.cash / 600000) * 100;
            const burnPercentage = (item.burn / 70000) * 100;
            const isCurrentMonth = index === monthlyData.length - 1;
            
            return (
              <div key={item.month} className={`flex items-center space-x-6 p-4 rounded-xl transition-all duration-300 ${
                isCurrentMonth ? 'bg-brand-50 border border-brand-200' : 'bg-slate-50 hover:bg-slate-100'
              }`}>
                <div className="w-12 text-sm font-semibold text-slate-700">
                  {item.month}
                  {isCurrentMonth && <div className="text-xs text-brand-600">Current</div>}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-brand-400 to-brand-600 h-3 rounded-full transition-all duration-700 shadow-sm"
                        style={{ width: `${Math.min(cashPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-semibold text-slate-700 w-20 text-right">
                      ${(item.cash / 1000).toFixed(0)}k
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-alert-400 to-alert-600 h-3 rounded-full transition-all duration-700 shadow-sm"
                        style={{ width: `${Math.min(burnPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-semibold text-slate-700 w-20 text-right">
                      ${(item.burn / 1000).toFixed(0)}k
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Projection */}
        <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <span className="text-lg font-semibold text-amber-900">Predictive Analysis</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-amber-800 mb-2">Zero Cash Date</div>
              <div className="text-2xl font-bold text-amber-900">
                {new Date(Date.now() + runwayMonths * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric' 
                })}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-amber-800 mb-2">Recommended Action</div>
              <div className="text-sm text-amber-900 font-medium">
                {runwayMonths > 12 ? 'Maintain current trajectory - excellent position' : 
                 runwayMonths > 6 ? 'Begin fundraising or optimize burn rate' : 
                 'Immediate cost reduction or emergency funding required'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
