import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { 
  MdDashboard, 
  MdOutlineSensors, 
  MdWbSunny, 
  MdLightbulb, 
  MdAssessment,
  MdNotificationsActive,
  MdSettings,
  MdSolarPower
} from 'react-icons/md';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const { t } = useTranslation();

  const navItems = [
    { name: t('dashboard'), path: '/dashboard', icon: <MdDashboard size={24} /> },
    { name: t('farm_monitoring'), path: '/monitoring', icon: <MdOutlineSensors size={24} /> },
    { name: t('weather'), path: '/weather', icon: <MdWbSunny size={24} /> },
    { name: t('recommendations'), path: '/recommendations', icon: <MdLightbulb size={24} /> },
    { name: t('reports'), path: '/reports', icon: <MdAssessment size={24} /> },
    { name: t('alerts'), path: '/alerts', icon: <MdNotificationsActive size={24} /> },
    { name: t('settings'), path: '/settings', icon: <MdSettings size={24} /> },
  ];

  return (
    <div className="w-64 h-full bg-white shadow-xl flex flex-col z-20">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-green-500 p-2 rounded-lg text-white">
          <MdSolarPower size={28} />
        </div>
        <h1 className="text-2xl font-bold text-green-700">AgriGuard</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-green-50 text-green-600 font-semibold shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-green-500'
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-100">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-xs text-green-600 font-medium mb-2">{t('system_status')}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-green-700">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {t('online')}
          </div>
        </div>
      </div>
    </div>
  );
}
