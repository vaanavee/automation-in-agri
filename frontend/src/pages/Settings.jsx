import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MdSettings, MdPerson, MdNotificationsActive, MdTune, MdArrowBack } from 'react-icons/md';

export default function Settings() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(null);

  const settingsOptions = [
    { id: 'profile', titleKey: 'profile_settings', icon: <MdPerson size={24} /> },
    { id: 'notifications', titleKey: 'notification_preferences', icon: <MdNotificationsActive size={24} /> },
    { id: 'calibration', titleKey: 'sensor_calibration', icon: <MdTune size={24} /> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {activeTab ? (
          <button 
            onClick={() => setActiveTab(null)}
            className="bg-gray-200 p-3 rounded-2xl text-gray-700 hover:bg-gray-300 transition-colors"
          >
            <MdArrowBack size={32} />
          </button>
        ) : (
          <div className="bg-gray-200 p-3 rounded-2xl text-gray-700">
             <MdSettings size={32} />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            {activeTab ? t(settingsOptions.find(o => o.id === activeTab).titleKey) : t('settings_title')}
          </h1>
          <p className="text-gray-500 mt-1">
            {activeTab ? 'Update your preferences below' : t('settings_desc')}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {!activeTab ? (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 gap-4"
            >
              {settingsOptions.map((option, idx) => (
                <motion.div 
                  key={option.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveTab(option.id)}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                      {option.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{t(option.titleKey)}</h3>
                  </div>
                  <div className="text-gray-400">
                    &rarr;
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              {activeTab === 'profile' && (
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" defaultValue={
                      (() => {
                        const u = localStorage.getItem('user');
                        return u ? JSON.parse(u).farmerName : '';
                      })()
                    } className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input type="tel" defaultValue={
                      (() => {
                        const u = localStorage.getItem('user');
                        return u ? JSON.parse(u).mobileNumber || '' : '';
                      })()
                    } className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:outline-none" />
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 transition-colors">Save Changes</button>
                </form>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  {['Email Alerts', 'SMS Notifications', 'Push Notifications'].map((notif) => (
                    <div key={notif} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <span className="font-medium text-gray-700">{notif}</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-green-600 cursor-pointer" />
                    </div>
                  ))}
                  <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 transition-colors mt-4">Save Preferences</button>
                </div>
              )}

              {activeTab === 'calibration' && (
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">Adjust sensor baseline values if readings appear inaccurate.</p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Moisture Offset (%)</label>
                    <input type="number" defaultValue="0" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">pH Offset</label>
                    <input type="number" defaultValue="0.0" step="0.1" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:outline-none" />
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 transition-colors">Calibrate Sensors</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
