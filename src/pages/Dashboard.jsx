import React from 'react';
import MetricCard from '../components/MetricCard';
import Gauge from '../components/Gauge';
import InsightText from '../components/InsightText';
import { DollarSign, TrendingDown, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = ({ data }) => {
  const { cashOnHand, monthlyBurn } = data;
  const runwayMonths = cashOnHand / monthlyBurn;
  
  // Calculate runway health score (0-100)
  const calculateHealthScore = (months) => {
    if (months >= 18) return 100;
    if (months >= 12) return 85;
    if (months >= 9) return 70;
    if (months >= 6) return 55;
    if (months >= 3) return 35;
    return Math.max(10, months * 10);
  };

  const healthScore = calculateHealthScore(runwayMonths);

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

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Cash on Hand"
          value={cashOnHand}
          subtitle="Available funds"
          icon={DollarSign}
          trend={-12.5}
        />
        <MetricCard
          title="Monthly Burn"
          value={monthlyBurn}
          subtitle="Average spend/month"
          icon={TrendingDown}
          trend={2.3}
        />
        <MetricCard
          title="Months of Runway"
          value={runwayMonths}
          subtitle="At current burn rate"
          icon={Calendar}
        />
      </div>

      {/* Runway Health Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Health Gauge */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Runway Health Score
            </h3>
            <p className="text-sm text-gray-600">
              Based on current cash position and burn rate
            </p>
          </div>
          
          <Gauge score={healthScore} />
          
          <div className="mt-6">
            <InsightText 
              cashOnHand={cashOnHand}
              monthlyBurn={monthlyBurn}
              runwayMonths={runwayMonths}
            />
          </div>
        </div>

        {/* Monthly Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Cash Flow Trend
            </h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-gray-600">Cash</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-danger rounded-full"></div>
                <span className="text-gray-600">Burn</span>
              </div>
            </div>
          </div>

          {/* Simple trend visualization */}
          <div className="space-y-4">
            {monthlyData.map((item, index) => {
              const cashPercentage = (item.cash / 600000) * 100;
              const burnPercentage = (item.burn / 70000) * 100;
              
              return (
                <div key={item.month} className="flex items-center space-x-4">
                  <div className="w-8 text-xs text-gray-500 font-medium">
                    {item.month}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${cashPercentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 w-16 text-right">
                        ${(item.cash / 1000).toFixed(0)}k
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-danger h-2 rounded-full transition-all duration-500"
                          style={{ width: `${burnPercentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 w-16 text-right">
                        ${(item.burn / 1000).toFixed(0)}k
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Projection */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Projection</span>
            </div>
            <p className="text-xs text-blue-700">
              At current burn rate, cash will reach $0 by{' '}
              {new Date(Date.now() + runwayMonths * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
