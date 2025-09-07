import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Building,
  Zap,
  Globe
} from 'lucide-react';
import MetricCard from '../components/MetricCard';

const IndustryInsights = ({ data }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('saas');
  
  // Industry benchmark data
  const industryBenchmarks = {
    saas: {
      name: 'SaaS',
      companies: 847,
      avgBurn: 72000,
      avgRunway: 8.2,
      avgCash: 590000,
      burnRange: { min: 45000, max: 120000 },
      runwayRange: { min: 4.5, max: 18.0 },
      topPercentile: { burn: 45000, runway: 15.2, cash: 850000 },
      medianPercentile: { burn: 68000, runway: 8.7, cash: 580000 },
      bottomPercentile: { burn: 95000, runway: 5.1, cash: 380000 },
      insights: [
        "Top 25% of SaaS startups maintain 15+ months runway",
        "Median burn rate increasing 12% YoY due to talent costs",
        "Companies with >$1M ARR typically burn 20% less per revenue dollar"
      ]
    },
    fintech: {
      name: 'Fintech',
      companies: 523,
      avgBurn: 89000,
      avgRunway: 7.1,
      avgCash: 630000,
      burnRange: { min: 55000, max: 150000 },
      runwayRange: { min: 3.8, max: 16.5 },
      topPercentile: { burn: 55000, runway: 14.8, cash: 920000 },
      medianPercentile: { burn: 85000, runway: 7.4, cash: 620000 },
      bottomPercentile: { burn: 125000, runway: 4.2, cash: 450000 },
      insights: [
        "Fintech burns 24% higher than SaaS due to compliance costs",
        "Regulatory requirements add ~$15k monthly overhead",
        "Series A+ companies show 30% better runway management"
      ]
    },
    ecommerce: {
      name: 'E-commerce',
      companies: 392,
      avgBurn: 58000,
      avgRunway: 9.8,
      avgCash: 570000,
      burnRange: { min: 35000, max: 95000 },
      runwayRange: { min: 5.2, max: 22.0 },
      topPercentile: { burn: 38000, runway: 18.5, cash: 780000 },
      medianPercentile: { burn: 55000, runway: 10.1, cash: 560000 },
      bottomPercentile: { burn: 78000, runway: 6.8, cash: 420000 },
      insights: [
        "E-commerce shows highest runway variability by season",
        "Inventory financing creates unique cash flow patterns",
        "Top performers optimize for gross margin over growth rate"
      ]
    }
  };

  const currentBenchmark = industryBenchmarks[selectedIndustry];
  const { cashOnHand, monthlyBurn } = data;
  const ourRunway = cashOnHand / monthlyBurn;

  // Calculate percentile rankings
  const calculatePercentile = (ourValue, benchmarkData, metric) => {
    if (metric === 'burn') {
      // Lower burn is better
      if (ourValue <= benchmarkData.topPercentile.burn) return 'top';
      if (ourValue <= benchmarkData.medianPercentile.burn) return 'above-median';
      if (ourValue <= benchmarkData.bottomPercentile.burn) return 'below-median';
      return 'bottom';
    } else {
      // Higher runway/cash is better
      const value = metric === 'runway' ? ourRunway : cashOnHand;
      const topValue = benchmarkData.topPercentile[metric];
      const medianValue = benchmarkData.medianPercentile[metric];
      const bottomValue = benchmarkData.bottomPercentile[metric];
      
      if (value >= topValue) return 'top';
      if (value >= medianValue) return 'above-median';
      if (value >= bottomValue) return 'below-median';
      return 'bottom';
    }
  };

  const getPercentileColor = (percentile) => {
    switch (percentile) {
      case 'top': return 'text-green-600 bg-green-50';
      case 'above-median': return 'text-blue-600 bg-blue-50';
      case 'below-median': return 'text-yellow-600 bg-yellow-50';
      case 'bottom': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPercentileText = (percentile) => {
    switch (percentile) {
      case 'top': return 'Top 25%';
      case 'above-median': return 'Above Median';
      case 'below-median': return 'Below Median';
      case 'bottom': return 'Bottom 25%';
      default: return 'Unknown';
    }
  };

  const burnPercentile = calculatePercentile(monthlyBurn, currentBenchmark, 'burn');
  const runwayPercentile = calculatePercentile(ourRunway, currentBenchmark, 'runway');
  const cashPercentile = calculatePercentile(cashOnHand, currentBenchmark, 'cash');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Industry Insights</h2>
          <p className="text-gray-600 mt-1">See how your startup compares to industry peers</p>
        </div>
        
        {/* Industry Selector */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">Industry:</span>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="saas">SaaS</option>
            <option value="fintech">Fintech</option>
            <option value="ecommerce">E-commerce</option>
          </select>
        </div>
      </div>

      {/* Your Performance vs Industry */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Performance vs {currentBenchmark.name} Industry</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Burn Rate Comparison */}
          <div className="text-center">
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke={burnPercentile === 'top' || burnPercentile === 'above-median' ? '#10b981' : '#ef4444'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${burnPercentile === 'top' ? 75 : burnPercentile === 'above-median' ? 60 : burnPercentile === 'below-median' ? 40 : 25} 251.2`}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingDown className={`w-6 h-6 ${burnPercentile === 'top' || burnPercentile === 'above-median' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  ${(monthlyBurn / 1000).toFixed(0)}k
                </div>
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPercentileColor(burnPercentile)}`}>
                  {getPercentileText(burnPercentile)}
                </div>
                <div className="text-sm text-gray-600">
                  vs ${(currentBenchmark.avgBurn / 1000).toFixed(0)}k avg
                </div>
              </div>
            </div>
          </div>

          {/* Runway Comparison */}
          <div className="text-center">
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke={runwayPercentile === 'top' || runwayPercentile === 'above-median' ? '#10b981' : '#ef4444'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${runwayPercentile === 'top' ? 75 : runwayPercentile === 'above-median' ? 60 : runwayPercentile === 'below-median' ? 40 : 25} 251.2`}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className={`w-6 h-6 ${runwayPercentile === 'top' || runwayPercentile === 'above-median' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  {ourRunway.toFixed(1)}m
                </div>
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPercentileColor(runwayPercentile)}`}>
                  {getPercentileText(runwayPercentile)}
                </div>
                <div className="text-sm text-gray-600">
                  vs {currentBenchmark.avgRunway.toFixed(1)}m avg
                </div>
              </div>
            </div>
          </div>

          {/* Cash Position */}
          <div className="text-center">
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke={cashPercentile === 'top' || cashPercentile === 'above-median' ? '#10b981' : '#ef4444'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${cashPercentile === 'top' ? 75 : cashPercentile === 'above-median' ? 60 : cashPercentile === 'below-median' ? 40 : 25} 251.2`}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <DollarSign className={`w-6 h-6 ${cashPercentile === 'top' || cashPercentile === 'above-median' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  ${(cashOnHand / 1000).toFixed(0)}k
                </div>
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPercentileColor(cashPercentile)}`}>
                  {getPercentileText(cashPercentile)}
                </div>
                <div className="text-sm text-gray-600">
                  vs ${(currentBenchmark.avgCash / 1000).toFixed(0)}k avg
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Benchmark Ranges */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {currentBenchmark.name} Industry Ranges
          </h3>
          
          <div className="space-y-6">
            {/* Burn Rate Range */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Monthly Burn Rate</span>
                <span className="text-xs text-gray-500">{currentBenchmark.companies} companies</span>
              </div>
              <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>${(currentBenchmark.burnRange.min / 1000).toFixed(0)}k</span>
                  <span>${(currentBenchmark.avgBurn / 1000).toFixed(0)}k avg</span>
                  <span>${(currentBenchmark.burnRange.max / 1000).toFixed(0)}k</span>
                </div>
                {/* Your position marker */}
                <div 
                  className="absolute top-0 w-2 h-2 bg-primary rounded-full transform -translate-x-1 -translate-y-0"
                  style={{
                    left: `${Math.min(Math.max(((monthlyBurn - currentBenchmark.burnRange.min) / (currentBenchmark.burnRange.max - currentBenchmark.burnRange.min)) * 100, 0), 100)}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Runway Range */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Runway (Months)</span>
              </div>
              <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{currentBenchmark.runwayRange.min.toFixed(1)}m</span>
                  <span>{currentBenchmark.avgRunway.toFixed(1)}m avg</span>
                  <span>{currentBenchmark.runwayRange.max.toFixed(1)}m</span>
                </div>
                {/* Your position marker */}
                <div 
                  className="absolute top-0 w-2 h-2 bg-primary rounded-full transform -translate-x-1 -translate-y-0"
                  style={{
                    left: `${Math.min(Math.max(((ourRunway - currentBenchmark.runwayRange.min) / (currentBenchmark.runwayRange.max - currentBenchmark.runwayRange.min)) * 100, 0), 100)}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Industry Insights</h3>
          
          <div className="space-y-4">
            {currentBenchmark.insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{currentBenchmark.companies}</div>
                <div className="text-xs text-gray-500">Companies Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {selectedIndustry === 'saas' ? '12%' : selectedIndustry === 'fintech' ? '18%' : '8%'}
                </div>
                <div className="text-xs text-gray-500">Avg YoY Burn Growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Percentile Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Percentile Breakdown</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Percentile</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Monthly Burn</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Runway (Months)</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Cash Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="bg-green-50">
                <td className="py-3 px-4 font-medium text-green-900">Top 25%</td>
                <td className="py-3 px-4 text-right text-green-900">${(currentBenchmark.topPercentile.burn / 1000).toFixed(0)}k</td>
                <td className="py-3 px-4 text-right text-green-900">{currentBenchmark.topPercentile.runway.toFixed(1)}m</td>
                <td className="py-3 px-4 text-right text-green-900">${(currentBenchmark.topPercentile.cash / 1000).toFixed(0)}k</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900">Median</td>
                <td className="py-3 px-4 text-right text-gray-900">${(currentBenchmark.medianPercentile.burn / 1000).toFixed(0)}k</td>
                <td className="py-3 px-4 text-right text-gray-900">{currentBenchmark.medianPercentile.runway.toFixed(1)}m</td>
                <td className="py-3 px-4 text-right text-gray-900">${(currentBenchmark.medianPercentile.cash / 1000).toFixed(0)}k</td>
              </tr>
              <tr className="bg-red-50">
                <td className="py-3 px-4 font-medium text-red-900">Bottom 25%</td>
                <td className="py-3 px-4 text-right text-red-900">${(currentBenchmark.bottomPercentile.burn / 1000).toFixed(0)}k</td>
                <td className="py-3 px-4 text-right text-red-900">{currentBenchmark.bottomPercentile.runway.toFixed(1)}m</td>
                <td className="py-3 px-4 text-right text-red-900">${(currentBenchmark.bottomPercentile.cash / 1000).toFixed(0)}k</td>
              </tr>
              <tr className="bg-blue-50 font-medium">
                <td className="py-3 px-4 text-blue-900">Your Company</td>
                <td className="py-3 px-4 text-right text-blue-900">${(monthlyBurn / 1000).toFixed(0)}k</td>
                <td className="py-3 px-4 text-right text-blue-900">{ourRunway.toFixed(1)}m</td>
                <td className="py-3 px-4 text-right text-blue-900">${(cashOnHand / 1000).toFixed(0)}k</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IndustryInsights;
