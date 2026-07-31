import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MdWaterDrop, MdScience, MdThermostat, MdCheckCircle, MdWarning } from 'react-icons/md';

const zones = [
  {
    id: 'A',
    nameKey: 'zone_a',
    shortKey: 'zone_a_short',
    moisture: 42,
    ph: 6.5,
    temp: 24,
    status: 'healthy',
    crop: 'Rice'
  },
  {
    id: 'B',
    nameKey: 'zone_b',
    shortKey: 'zone_b_short',
    moisture: 28,
    ph: 7.2,
    temp: 26,
    status: 'warning',
    crop: 'Sugarcane'
  },
  {
    id: 'C',
    nameKey: 'zone_c',
    shortKey: 'zone_c_short',
    moisture: 55,
    ph: 6.8,
    temp: 23,
    status: 'healthy',
    crop: 'Banana'
  }
];

export default function Monitoring() {
  const { t } = useTranslation();

  const getStatusColor = (status) => {
    return status === 'healthy' ? 'bg-green-100 border-green-300 text-green-700' : 'bg-yellow-100 border-yellow-300 text-yellow-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{t('farm_monitoring')}</h1>
        <p className="text-gray-500 mt-1">{t('farm_monitoring_desc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {zones.map((zone, idx) => (
          <motion.div 
            key={zone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`rounded-2xl p-6 border-2 shadow-sm ${getStatusColor(zone.status)}`}
          >
            <div className="flex justify-between items-center mb-6 border-b border-white/50 pb-4">
              <div>
                <h2 className="text-xl font-bold">{t(zone.nameKey)}</h2>
                <p className="text-sm opacity-80">{t('crop_prefix')}: {zone.crop}</p>
              </div>
              {zone.status === 'healthy' ? (
                <MdCheckCircle size={32} className="text-green-600" />
              ) : (
                <MdWarning size={32} className="text-yellow-600" />
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/50 p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><MdWaterDrop size={20} /></div>
                  <span className="font-medium">{t('moisture')}</span>
                </div>
                <span className="font-bold">{zone.moisture}%</span>
              </div>

              <div className="flex items-center justify-between bg-white/50 p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><MdScience size={20} /></div>
                  <span className="font-medium">{t('soil_ph')}</span>
                </div>
                <span className="font-bold">{zone.ph}</span>
              </div>

              <div className="flex items-center justify-between bg-white/50 p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><MdThermostat size={20} /></div>
                  <span className="font-medium">{t('temperature')}</span>
                </div>
                <span className="font-bold">{zone.temp}°C</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/50">
              <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
                zone.status === 'healthy' ? 'bg-green-200 hover:bg-green-300 text-green-800' : 'bg-yellow-200 hover:bg-yellow-300 text-yellow-800'
              }`}>
                {t('view_detailed_logs')}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{t('graphical_farm_layout')}</h3>
        <div className="relative w-full h-80 bg-green-50 rounded-xl border-2 border-dashed border-green-200 overflow-hidden flex items-center justify-center">
           {/* Simple Grid Representation */}
           <div className="grid grid-cols-2 grid-rows-2 w-full h-full p-4 gap-4">
              <div className="bg-green-200/50 rounded-lg flex items-center justify-center font-bold text-green-800 relative group cursor-pointer transition-all hover:bg-green-300/50">
                {t('zone_a_short')}
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="bg-yellow-200/50 rounded-lg flex items-center justify-center font-bold text-yellow-800 relative group cursor-pointer transition-all hover:bg-yellow-300/50">
                {t('zone_b_short')}
                <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
              <div className="col-span-2 bg-green-200/50 rounded-lg flex items-center justify-center font-bold text-green-800 relative group cursor-pointer transition-all hover:bg-green-300/50">
                {t('zone_c_short')}
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
