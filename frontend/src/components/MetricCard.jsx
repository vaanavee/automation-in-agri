import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function MetricCard({ title, value, unit, icon, color, status }) {
  const { t } = useTranslation();

  const getStatusColor = () => {
    switch(status) {
      case 'healthy': return 'bg-green-100 text-green-700 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getIconColor = () => {
    switch(color) {
      case 'blue': return 'bg-blue-50 text-blue-500';
      case 'green': return 'bg-green-50 text-green-500';
      case 'orange': return 'bg-orange-50 text-orange-500';
      case 'purple': return 'bg-purple-50 text-purple-500';
      case 'yellow': return 'bg-yellow-50 text-yellow-500';
      case 'red': return 'bg-red-50 text-red-500';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  const getStatusText = (status) => {
    if (status === 'warning') return t('warning_status');
    return t(status);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${getIconColor()}`}>
          {icon}
        </div>
        <div className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor()}`}>
          {getStatusText(status)}
        </div>
      </div>
      
      <div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-800">{value}</span>
          <span className="text-sm text-gray-500 font-medium">{unit}</span>
        </div>
      </div>
    </motion.div>
  );
}
