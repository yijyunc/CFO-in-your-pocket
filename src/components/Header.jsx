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
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Building2 className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {selectedCompany?.name || 'Select Company'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {companies.map((company) => (
                  <button
                    key={company.id}
                    onClick={() => handleCompanySelect(company)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                  >
                    <div className="font-medium text-gray-900">{company.name}</div>
                    <div className="text-xs text-gray-500">{company.type}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Demo Mode
          </div>
          <RunwayLogo size="w-8 h-8" />
        </div>
      </div>
    </header>
  );
};

export default Header;
