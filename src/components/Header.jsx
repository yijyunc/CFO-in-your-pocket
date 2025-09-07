import React, { useState } from 'react';
import { ChevronDown, Building2 } from 'lucide-react';
import RunwayLogo from './RunwayLogo';

const Header = ({ selectedCompany, onCompanyChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const companies = [
    { id: 'acme', name: 'Acme SaaS', type: 'SaaS' },
    { id: 'beta', name: 'BetaTech', type: 'AI/ML' },
    { id: 'gamma', name: 'Gamma Fintech', type: 'Fintech' },
  ];

  const handleCompanySelect = (company) => {
    onCompanyChange(company);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Intelligence</h2>
            <p className="text-sm text-slate-600 mt-1">Real-time CFO insights and analytics</p>
          </div>
          <div className="h-8 w-px bg-slate-300"></div>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors duration-200 border border-slate-200"
            >
              <Building2 className="w-5 h-5 text-slate-600" />
              <div className="text-left">
                <div className="text-sm font-semibold text-slate-700">
                  {selectedCompany?.name || 'Select Company'}
                </div>
                <div className="text-xs text-slate-500">
                  {selectedCompany?.type || 'Company Type'}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-3 w-64 bg-white border border-slate-200 rounded-2xl shadow-strong z-50 animate-slide-up">
                {companies.map((company) => (
                  <button
                    key={company.id}
                    onClick={() => handleCompanySelect(company)}
                    className="w-full text-left px-6 py-4 hover:bg-slate-50 first:rounded-t-2xl last:rounded-b-2xl transition-colors duration-200 border-b border-slate-100 last:border-b-0"
                  >
                    <div className="font-semibold text-slate-900">{company.name}</div>
                    <div className="text-sm text-slate-500 mt-1">{company.type}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="px-3 py-2 bg-brand-50 text-brand-700 text-sm font-medium rounded-xl border border-brand-200">
            Professional Demo
          </div>
          <div className="flex items-center space-x-3">
            <RunwayLogo size="w-10 h-10" />
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-700">CFO Dashboard</div>
              <div className="text-xs text-slate-500">Live Analytics</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
