import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MdWaterDrop, 
  MdScience, 
  MdThermostat, 
  MdSettingsApplications,
  MdCloud
} from 'react-icons/md';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { t } = useTranslation();
  
  const [user, setUser] = useState(null);
  
  // Real-time data specifically for Zone 1 (Prototype Hardware)
  const [zone1Data, setZone1Data] = useState({
    moisture: 45,
    ph: 6.8,
    soilTemp: 24.5,
    motorStatus: 'OFF',
    rainStatus: 'No Rain',
    lastUpdated: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch real-time data from backend for Zone 1
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

    // Fetch immediately on mount
    fetchLatestData();

    // Then poll every 5 seconds
    const interval = setInterval(fetchLatestData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (val, min, max, warnMin, warnMax) => {
    if (val < min || val > max) return 'text-red-600 bg-red-100';
    if (val < warnMin || val > warnMax) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  if (!user) {
    return <div className="p-8 text-center text-gray-500">Loading user data...</div>;
  }

  const zones = user.zones || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{t('farm_overview') || 'Farm Overview'}</h1>
          <p className="text-gray-500 mt-1">{user.farmName} - {user.farmerName}</p>
        </div>
        <div className="text-sm text-gray-400 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          {t('last_updated') || 'Last Updated'} <span className="font-medium text-gray-600">{zone1Data.lastUpdated}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="text-4xl font-bold text-gray-800">{zones.length}</div>
          <div className="text-gray-500 font-medium mt-2">Total Registered Zones</div>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="text-4xl font-bold text-green-700">1</div>
          <div className="text-green-600 font-medium mt-2">Active Prototype Zones</div>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="text-xl font-bold text-blue-700">System Normal</div>
          <div className="text-blue-600 font-medium mt-2">Overall Farm Status</div>
        </div>
      </div>

      {zones.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Summary ({zones[0].zoneName} - Active Prototype)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
              <MdWaterDrop size={24} className="text-blue-500" />
              <div><p className="text-xs text-gray-500">Moisture</p><p className="font-bold text-gray-800">{zone1Data.moisture.toFixed(1)}%</p></div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
              <MdThermostat size={24} className="text-orange-500" />
              <div><p className="text-xs text-gray-500">Temp</p><p className="font-bold text-gray-800">{zone1Data.soilTemp.toFixed(1)}°C</p></div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
              <MdSettingsApplications size={24} className="text-gray-500" />
              <div><p className="text-xs text-gray-500">Motor</p><p className={`font-bold ${zone1Data.motorStatus === 'ON' ? 'text-green-600' : 'text-gray-600'}`}>{zone1Data.motorStatus}</p></div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
              <MdCloud size={24} className="text-blue-400" />
              <div><p className="text-xs text-gray-500">Rain</p><p className="font-bold text-gray-800">{zone1Data.rainStatus}</p></div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-4">
         <a href="/monitoring" className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors inline-block text-center">
           Detailed Farm Monitoring
         </a>
         <a href="/reports" className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors inline-block text-center">
           View Government Reports
         </a>
      </div>
    </div>
  );
}
