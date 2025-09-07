import React from 'react';
import { 
  AlertTriangle, 
  Target, 
  Globe, 
  Users, 
  DollarSign, 
  Rocket,
  ArrowRight,
  TrendingUp,
  Building,
  Zap
} from 'lucide-react';

const AICompanion = () => {
  const sections = [
    {
      title: "Problem",
      icon: AlertTriangle,
      color: "bg-red-50 border-red-200 text-red-700",
      iconColor: "text-red-600",
      content: "42% of startups fail from running out of cash - often with little warning or planning visibility."
    },
    {
      title: "Solution", 
      icon: Target,
      color: "bg-blue-50 border-blue-200 text-blue-700",
      iconColor: "text-blue-600",
      content: "A lightweight Runway Health Score + scenario simulator that gives founders cash visibility in seconds, not spreadsheets."
    },
    {
      title: "Market",
      icon: Globe,
      color: "bg-green-50 border-green-200 text-green-700",
      iconColor: "text-green-600",
      content: "5M+ global startups need financial planning. FP&A SaaS market = $11B TAM, growing 15% annually."
    },
    {
      title: "Competitors",
      icon: Users,
      color: "bg-purple-50 border-purple-200 text-purple-700",
      iconColor: "text-purple-600",
      content: "Finmark (too complex for early stage), Runway (expensive for small teams), Pigment (enterprise-only focus)."
    },
    {
      title: "Revenue Model",
      icon: DollarSign,
      color: "bg-yellow-50 border-yellow-200 text-yellow-700",
      iconColor: "text-yellow-600",
      content: "Freemium model: Free health score + basic simulator → $29-$99/mo for advanced features, integrations, and benchmarks."
    },
    {
      title: "MVP Today",
      icon: Rocket,
      color: "bg-indigo-50 border-indigo-200 text-indigo-700",
      iconColor: "text-indigo-600",
      content: "Runway Health Score, scenario modeling, clean dashboard. No backend complexity - immediate value for founders."
    }
  ];

  const nextSteps = [
    {
      title: "Integrations",
      description: "Connect Stripe, QuickBooks, and bank APIs for automated data",
      icon: Zap
    },
    {
      title: "Peer Benchmarks", 
      description: "Anonymous industry comparisons and runway benchmarks",
      icon: TrendingUp
    },
    {
      title: "Advanced ETL",
      description: "Sophisticated data pipeline for enterprise customers", 
      icon: Building
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Companion</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your intelligent financial advisor - get instant insights, strategic recommendations, and business intelligence
        </p>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={index} className={`p-6 rounded-xl border ${section.color}`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Icon className={`w-6 h-6 ${section.iconColor}`} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                  <p className="text-sm leading-relaxed">{section.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Next Steps</h3>
          <p className="text-gray-600">Roadmap for scaling beyond MVP</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nextSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center mt-8">
          <ArrowRight className="w-5 h-5 text-gray-400 mx-2" />
          <span className="text-sm text-gray-500">Progressive enhancement based on user feedback</span>
          <ArrowRight className="w-5 h-5 text-gray-400 mx-2" />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-600 mb-1">5M+</div>
          <div className="text-sm text-blue-700">Global Startups</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
          <div className="text-2xl font-bold text-green-600 mb-1">$11B</div>
          <div className="text-sm text-green-700">FP&A Market</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl">
          <div className="text-2xl font-bold text-red-600 mb-1">42%</div>
          <div className="text-sm text-red-700">Fail from Cash</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
          <div className="text-2xl font-bold text-yellow-600 mb-1">15%</div>
          <div className="text-sm text-yellow-700">Annual Growth</div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Why Runway Karma Wins</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-lg font-semibold mb-2">⚡ Instant Setup</div>
            <div className="text-sm opacity-90">No complex integrations required</div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-2">🎯 Founder-First</div>
            <div className="text-sm opacity-90">Built for startup speed and simplicity</div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-2">📊 Actionable Insights</div>
            <div className="text-sm opacity-90">Not just data - clear next steps</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICompanion;
