import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MdNotifications, MdWarning, MdInfo } from 'react-icons/md';

export default function Alerts() {
  const { t } = useTranslation();

  const alerts = [
    { id: 1, type: 'warning', icon: <MdWarning size={24} />, messageKey: 'alert_low_battery', time: '10 mins ago', color: 'yellow' },
    { id: 2, type: 'info', icon: <MdInfo size={24} />, messageKey: 'alert_rain', time: '2 hours ago', color: 'blue' }
  ];

  const getColorClasses = (color) => {
    switch(color) {
      case 'yellow': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'blue': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'red': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIconColorClasses = (color) => {
    switch(color) {
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'red': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="bg-red-100 p-3 rounded-2xl text-red-600">
           <MdNotifications size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{t('alerts_title')}</h1>
          <p className="text-gray-500 mt-1">{t('alerts_desc')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-8">
        {alerts.map((alert, idx) => (
          <motion.div 
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`rounded-2xl p-5 border shadow-sm flex items-center justify-between ${getColorClasses(alert.color)}`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${getIconColorClasses(alert.color)}`}>
                {alert.icon}
              </div>
              <div>
                <p className="text-lg font-bold">{t(alert.messageKey)}</p>
                <p className="text-sm opacity-75 mt-1">{alert.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
