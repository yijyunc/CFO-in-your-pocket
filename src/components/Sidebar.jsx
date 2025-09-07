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
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <RunwayLogo size="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Runway Karma</h1>
            <p className="text-xs text-gray-500">Stay alive, not spreadsheets</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <div
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>MVP Version</p>
          <p className="mt-1">Stay alive, not spreadsheets</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
