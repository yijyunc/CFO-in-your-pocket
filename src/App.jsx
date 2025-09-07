import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';
import Dashboard from './pages/Dashboard';
import Simulate from './pages/Simulate';
import AICompanion from './pages/BizPlan';
import IndustryInsights from './pages/IndustryInsights';
import About from './pages/About';

// AppContent component to use useLocation hook
const AppContent = () => {
  const location = useLocation();
  
  // Initial data state
  const [data, setData] = useState({
    cashOnHand: 480000,
    monthlyBurn: 65000,
  });

  // Company state
  const [selectedCompany, setSelectedCompany] = useState({
    id: 'acme',
    name: 'Acme SaaS',
    type: 'SaaS'
  });

  // Toast state
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const showToast = (message, type = 'success') => {
    setToast({
      isVisible: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleApplyChanges = (newData) => {
    setData(newData);
  };

  const handleCompanyChange = (company) => {
    setSelectedCompany(company);
    
    // Update data based on company selection
    const companyData = {
      'acme': { cashOnHand: 480000, monthlyBurn: 65000 },
      'beta': { cashOnHand: 320000, monthlyBurn: 45000 },
      'gamma': { cashOnHand: 750000, monthlyBurn: 85000 },
    };
    
    setData(companyData[company.id] || companyData['acme']);
    showToast(`Switched to ${company.name}`, 'success');
  };

  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/simulate':
        return 'Simulate';
      case '/compare':
        return 'Industry Insights';
      case '/ai-companion':
        return 'AI Companion';
      case '/about':
        return 'About';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0">
          <Header 
            selectedCompany={selectedCompany}
            onCompanyChange={handleCompanyChange}
          />
        </div>
        
        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard data={data} />} 
            />
            <Route 
              path="/simulate" 
              element={
                <Simulate 
                  data={data} 
                  onApplyChanges={handleApplyChanges}
                  showToast={showToast}
                />
              } 
            />
            <Route 
              path="/compare" 
              element={<IndustryInsights data={data} />} 
            />
            <Route 
              path="/ai-companion" 
              element={<AICompanion />} 
            />
            <Route 
              path="/about" 
              element={<About />} 
            />
          </Routes>
        </main>
      </div>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
