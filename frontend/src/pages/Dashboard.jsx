import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MdWaterDrop, 
  MdScience, 
  MdThermostat, 
  MdCloud, 
  MdWater,
  MdSolarPower,
  MdBatteryChargingFull,
  MdSensors
} from 'react-icons/md';
import MetricCard from '../components/MetricCard';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { t } = useTranslation();
  const [data, setData] = useState({
    moisture: 45,
    ph: 6.8,
    soilTemp: 24.5,
    airTemp: 32.1,
    humidity: 60,
    rainProb: 10,
    solarPower: 120,
    battery: 85,
    lastUpdated: new Date().toLocaleTimeString()
  });

  // Simulate real-time data update every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        moisture: prev.moisture + (Math.random() * 2 - 1),
        soilTemp: prev.soilTemp + (Math.random() * 0.5 - 0.25),
        solarPower: Math.max(0, prev.solarPower + (Math.random() * 10 - 5)),
        lastUpdated: new Date().toLocaleTimeString()
      }));
    }, 60000); // Wait, I'll set to 5 seconds for visual testing, but the requirement is 60s. Let's stick to 60s.
    
    return () => clearInterval(interval);
  }, []);

  const getStatus = (val, min, max, warnMin, warnMax) => {
    if (val < min || val > max) return 'critical';
    if (val < warnMin || val > warnMax) return 'warning';
    return 'healthy';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{t('farm_overview')}</h1>
          <p className="text-gray-500 mt-1">{t('realtime_data_desc')}</p>
        </div>
        <div className="text-sm text-gray-400 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          {t('last_updated')} <span className="font-medium text-gray-600">{data.lastUpdated}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title={t('soil_moisture')} 
          value={data.moisture.toFixed(1)} 
          unit="%" 
          icon={<MdWaterDrop size={28} />} 
          color="blue"
          status={getStatus(data.moisture, 20, 80, 30, 70)}
        />
        <MetricCard 
          title={t('soil_ph')} 
          value={data.ph.toFixed(1)} 
          unit="pH" 
          icon={<MdScience size={28} />} 
          color="purple"
          status={getStatus(data.ph, 5.5, 8.5, 6.0, 7.5)}
        />
        <MetricCard 
          title={t('soil_temp')} 
          value={data.soilTemp.toFixed(1)} 
          unit="°C" 
          icon={<MdThermostat size={28} />} 
          color="orange"
          status={getStatus(data.soilTemp, 10, 40, 15, 35)}
        />
        <MetricCard 
          title={t('air_temp')} 
          value={data.airTemp.toFixed(1)} 
          unit="°C" 
          icon={<MdCloud size={28} />} 
          color="red"
          status={getStatus(data.airTemp, 10, 45, 15, 38)}
        />
        <MetricCard 
          title={t('air_humidity')} 
          value={data.humidity.toFixed(1)} 
          unit="%" 
          icon={<MdWater size={28} />} 
          color="blue"
          status={getStatus(data.humidity, 30, 90, 40, 80)}
        />
        <MetricCard 
          title={t('rain_probability')} 
          value={data.rainProb.toFixed(0)} 
          unit="%" 
          icon={<MdCloud size={28} />} 
          color="blue"
          status="healthy"
        />
        <MetricCard 
          title={t('solar_panel')} 
          value={data.solarPower.toFixed(1)} 
          unit="W" 
          icon={<MdSolarPower size={28} />} 
          color="yellow"
          status={data.solarPower > 50 ? 'healthy' : 'warning'}
        />
        <MetricCard 
          title={t('battery')} 
          value={data.battery.toFixed(0)} 
          unit="%" 
          icon={<MdBatteryChargingFull size={28} />} 
          color="green"
          status={getStatus(data.battery, 20, 100, 40, 100)}
        />
      </div>
      
      {/* Chart Section Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center">
           <p className="text-gray-400">{t('moisture_trend_chart')}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center">
           <p className="text-gray-400">{t('sensor_status')}</p>
        </div>
      </div>
    </div>
  );
}
