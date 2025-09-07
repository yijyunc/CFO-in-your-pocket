import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Info,
  TrendingUp,
  Bot,
  BarChart3
} from 'lucide-react';
import RunwayLogo from './RunwayLogo';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: '/',
      name: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      path: '/simulate',
      name: 'Simulate',
      icon: TrendingUp,
    },
    {
      path: '/compare',
      name: 'Industry Insights',
      icon: BarChart3,
    },
    {
      path: '/ai-companion',
      name: 'AI Companion',
      icon: Bot,
    },
    {
      path: '/about',
      name: 'About',
      icon: Info,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-72 bg-white border-r border-slate-200 h-full flex flex-col shadow-soft">
      {/* Enhanced Logo */}
      <div className="p-8 border-b border-slate-200 bg-gradient-to-br from-brand-50 to-white">
        <div className="flex items-center space-x-4">
          <RunwayLogo size="w-12 h-12" />
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Runway Karma</h1>
            <p className="text-sm text-brand-600 font-medium">CFO in Your Pocket</p>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="flex-1 p-6 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <div
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`sidebar-item ${isActive ? 'active' : ''} group`}
            >
              <div className={`p-2 rounded-xl transition-colors duration-200 ${
                isActive ? 'bg-brand-100' : 'bg-slate-100 group-hover:bg-slate-200'
              }`}>
                <Icon className={`w-5 h-5 ${
                  isActive ? 'text-brand-600' : 'text-slate-600 group-hover:text-slate-700'
                }`} />
              </div>
              <span className="text-sm font-semibold">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-brand-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Enhanced Footer */}
      <div className="p-6 border-t border-slate-200 bg-slate-25">
        <div className="text-center">
          <div className="text-xs font-semibold text-slate-700 mb-1">CFO Intelligence Platform</div>
          <div className="text-xs text-slate-500">v2.0 • Professional Edition</div>
          <div className="mt-3 px-3 py-2 bg-gradient-to-r from-success-50 to-emerald-50 rounded-lg border border-success-200">
            <div className="text-xs font-medium text-success-700">✓ Real-time Analytics</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
