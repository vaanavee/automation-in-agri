import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MdWaterDrop, MdScience, MdThermostat, MdCheckCircle, MdWarning, MdSettingsApplications } from 'react-icons/md';

export default function Monitoring() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch real-time data from backend for Zone 1
  const [zone1Data, setZone1Data] = useState({
    moisture: 45,
    ph: 6.8,
    soilTemp: 24.5,
    motorStatus: 'OFF',
    rainStatus: 'No Rain',
    lastUpdated: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/data/latest');
        const result = await response.json();
        
        if (result.status === 'success' && result.data) {
          const d = result.data;
          setZone1Data({
            moisture: d.moisture,
            ph: d.ph,
            soilTemp: d.temperature,
            motorStatus: d.moisture < 40 ? 'ON' : 'OFF',
            rainStatus: d.rain_status === 1 ? 'Raining' : 'No Rain',
            lastUpdated: new Date().toLocaleTimeString()
          });
        }
      } catch (err) {
        console.error('Failed to fetch sensor data:', err);
      }
    };

    fetchLatestData();
    const interval = setInterval(fetchLatestData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!user) {
    return <div className="p-8 text-center text-gray-500">Loading user data...</div>;
  }

  const zones = user.zones || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{t('farm_monitoring') || 'Detailed Farm Monitoring'}</h1>
        <p className="text-gray-500 mt-1">Select and inspect each zone individually</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {zones.map((zone, idx) => {
          const isActive = idx === 0;

          return (
            <motion.div 
              key={zone.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl p-6 border-2 shadow-sm ${
                isActive ? 'bg-green-50 border-green-300 text-green-900' : 'bg-gray-50 border-gray-200 text-gray-500'
              }`}
            >
              <div className="flex justify-between items-center mb-6 border-b border-black/10 pb-4">
                <div>
                  <h2 className="text-2xl font-bold">{zone.zoneName}</h2>
                  <p className="text-sm opacity-80 mt-1">Crop: {zone.cropType} | {zone.area} acres</p>
                </div>
                {isActive ? (
                  <div className="flex flex-col items-end">
                    <MdCheckCircle size={32} className="text-green-600 mb-1" />
                    <span className="text-[10px] font-bold bg-green-200 text-green-800 px-2 py-1 rounded">ACTIVE PROTOTYPE</span>
                  </div>
                ) : (
                  <MdSettingsApplications size={32} className="text-gray-400" />
                )}
              </div>

              {isActive ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white/60 p-3 rounded-xl border border-green-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><MdWaterDrop size={20} /></div>
                      <span className="font-medium">Soil Moisture</span>
                    </div>
                    <span className="font-bold text-lg">{zone1Data.moisture.toFixed(1)}%</span>
                  </div>

                  <div className="flex items-center justify-between bg-white/60 p-3 rounded-xl border border-green-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><MdThermostat size={20} /></div>
                      <span className="font-medium">Temperature</span>
                    </div>
                    <span className="font-bold text-lg">{zone1Data.soilTemp.toFixed(1)}°C</span>
                  </div>

                  <div className="flex items-center justify-between bg-white/60 p-3 rounded-xl border border-green-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><MdScience size={20} /></div>
                      <span className="font-medium">Rain Status</span>
                    </div>
                    <span className="font-bold text-lg">{zone1Data.rainStatus}</span>
                  </div>

                  <div className="flex items-center justify-between bg-white/60 p-3 rounded-xl border border-green-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-200 p-2 rounded-lg text-gray-700"><MdSettingsApplications size={20} /></div>
                      <span className="font-medium">Motor Status</span>
                    </div>
                    <span className={`font-bold text-lg ${zone1Data.motorStatus === 'ON' ? 'text-green-600' : 'text-gray-700'}`}>{zone1Data.motorStatus}</span>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-black/10">
                    <p className="text-xs opacity-70 text-center mb-2">Last Updated: {zone1Data.lastUpdated}</p>
                    <button className="w-full py-2 rounded-lg font-medium transition-colors bg-green-200 hover:bg-green-300 text-green-800">
                      View Advanced Analytics
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center justify-center text-center h-48">
                  <p className="text-sm font-medium bg-gray-200 text-gray-600 px-3 py-1 rounded-lg">
                    Prototype hardware not connected
                  </p>
                  <p className="text-xs mt-4 max-w-[200px] opacity-80">
                    This zone is registered to your account, but real-time hardware values are unavailable.
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{t('graphical_farm_layout') || 'Graphical Farm Layout'}</h3>
        <div className="relative w-full h-80 bg-slate-50 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden flex flex-wrap items-center justify-center gap-4 p-4">
           {zones.map((zone, idx) => (
             <div 
               key={idx} 
               className={`h-24 min-w-[150px] flex-1 rounded-xl flex items-center justify-center font-bold relative group cursor-pointer transition-all ${
                 idx === 0 ? 'bg-green-200 text-green-800 border-2 border-green-400' : 'bg-gray-200 text-gray-500 border border-gray-300'
               }`}
             >
               {zone.zoneName}
               {idx === 0 && (
                 <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500"></div>
               )}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
