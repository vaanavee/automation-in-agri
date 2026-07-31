import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MdWbSunny, MdWaterDrop, MdAir, MdCloud, MdOutlineWbTwilight } from 'react-icons/md';

export default function Weather() {
  const { t } = useTranslation();

  const weatherData = {
    currentTemp: 32,
    humidity: 65,
    rainProb: 15,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    tomorrowForecast: 'Heavy Rain Expected',
    suggestion: 'Rain expected tomorrow. Irrigation is not required today.'
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{t('weather_forecast')}</h1>
        <p className="text-gray-500 mt-1">{t('localized_weather_desc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Weather Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <MdWbSunny size={150} />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h2 className="text-xl font-medium opacity-90">{t('current_weather')}</h2>
              <p className="text-5xl font-bold mt-2">{weatherData.currentTemp}°C</p>
              <p className="text-xl mt-1 font-medium">{t('partly_cloudy')}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-12 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
               <div className="text-center">
                 <div className="flex justify-center mb-1"><MdWaterDrop size={24} /></div>
                 <p className="text-sm opacity-80">{t('humidity')}</p>
                 <p className="font-semibold text-lg">{weatherData.humidity}%</p>
               </div>
               <div className="text-center border-x border-white/20">
                 <div className="flex justify-center mb-1"><MdCloud size={24} /></div>
                 <p className="text-sm opacity-80">{t('rain_prob_short')}</p>
                 <p className="font-semibold text-lg">{weatherData.rainProb}%</p>
               </div>
               <div className="text-center">
                 <div className="flex justify-center mb-1"><MdAir size={24} /></div>
                 <p className="text-sm opacity-80">{t('wind_speed')}</p>
                 <p className="font-semibold text-lg">{weatherData.windSpeed} km/h</p>
               </div>
            </div>
          </div>
        </div>

        {/* Forecast & Suggestions */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-orange-500">
               <MdOutlineWbTwilight size={28} />
               <h3 className="font-bold text-gray-800 text-lg">{t('tomorrows_forecast')}</h3>
            </div>
            <p className="text-xl font-semibold text-gray-700">{t('heavy_rain_expected')}</p>
            <div className="mt-4 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
               <div className="bg-blue-500 w-3/4 h-full"></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{t('precipitation_chance')}</p>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-green-50 rounded-3xl p-6 shadow-sm border border-green-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-green-500"></div>
            <h3 className="font-bold text-green-800 text-lg mb-2">{t('irrigation_suggestion')}</h3>
            <p className="text-green-700 font-medium leading-relaxed">
              {t('weather_suggestion_desc')}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Weekly forecast placeholder */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
         <h3 className="font-bold text-gray-800 text-lg mb-6">{t('seven_day_forecast')}</h3>
         <div className="flex justify-between items-center text-center overflow-x-auto pb-4 gap-4">
            {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day, i) => (
              <div key={day} className="flex flex-col items-center min-w-[60px]">
                <p className="text-sm text-gray-500 font-medium mb-2">{t(day)}</p>
                <div className="bg-blue-50 p-3 rounded-full text-blue-500 mb-2">
                  {i % 3 === 0 ? <MdCloud size={24}/> : <MdWbSunny size={24} className="text-orange-400"/>}
                </div>
                <p className="font-bold text-gray-800">{32 - i}°</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
