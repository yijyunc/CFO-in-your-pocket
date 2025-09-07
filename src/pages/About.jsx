import React from 'react';
import { 
  Heart, 
  Target, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp,
  Coffee,
  Github,
  Twitter,
  Mail
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get runway insights in seconds, not hours of spreadsheet work"
    },
    {
      icon: Target,
      title: "Founder-Focused",
      description: "Built by founders, for founders who need clarity over complexity"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your financial data stays local - no backend, no data collection"
    },
    {
      icon: Heart,
      title: "Mission Driven",
      description: "Helping startups survive and thrive with better financial visibility"
    }
  ];

  const team = [
    {
      name: "Demo Founder",
      role: "Product & Engineering",
      description: "Ex-startup founder who learned the hard way about runway management",
      avatar: "DF"
    },
    {
      name: "Demo Designer", 
      role: "UX & Design",
      description: "Making complex financial data beautiful and actionable",
      avatar: "DD"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-6">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Runway Karma</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Runway Karma helps founders track cash, model scenarios, and stay alive — in seconds, not spreadsheets.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Too many great startups fail not because their product isn't good enough, but because they run out of cash without warning. 
            We believe every founder deserves instant, clear visibility into their runway health - without the complexity of enterprise tools 
            or the tedium of manual spreadsheets.
          </p>
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Runway Karma?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Story */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">The Story Behind Runway Karma</h3>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            Runway Karma was born from a simple realization: <strong>42% of startups fail because they run out of cash</strong>, 
            yet most founders are flying blind when it comes to their financial runway.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Traditional financial planning tools are either too complex (built for CFOs, not founders) or too expensive 
            for early-stage startups. Spreadsheets become unwieldy and error-prone as your business grows.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We wanted to create something different: a tool that gives you <strong>instant clarity</strong> on your runway health, 
            lets you <strong>model scenarios quickly</strong>, and helps you make <strong>data-driven decisions</strong> about your startup's future.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Think Credit Karma's simplicity for understanding your credit score, combined with Pigment's modeling power, 
            but designed specifically for startup founders who need answers fast.
          </p>
        </div>
      </div>

      {/* Team */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Meet the Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                {member.avatar}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h4>
              <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Built for Impact</h3>
          <p className="text-blue-100">Our mission in numbers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">42%</div>
            <div className="text-blue-100">of startups fail from cash issues</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">5M+</div>
            <div className="text-blue-100">startups worldwide need this</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">⚡</div>
            <div className="text-blue-100">seconds to get runway insights</div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="text-center bg-gray-50 rounded-2xl p-8">
        <Coffee className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Let's Connect</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          This is an MVP demo, but we'd love to hear your thoughts! Runway management is a real problem, 
          and we're exploring solutions that could actually help founders.
        </p>
        
        <div className="flex items-center justify-center space-x-6">
          <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
            <Twitter className="w-5 h-5" />
            <span>Twitter</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
            <span>Email</span>
          </a>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          Built with ❤️ for the startup community
        </div>
      </div>
    </div>
  );
};

export default About;
