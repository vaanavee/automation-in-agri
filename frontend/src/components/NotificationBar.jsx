import React, { useState, useEffect } from 'react';
import { MdNotificationsActive } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationBar() {
  const [notification, setNotification] = useState(null);

  const prevMotorRef = React.useRef(null);
  const prevRainRef = React.useRef(null);

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/data/latest');
        const result = await response.json();
        
        if (result.status === 'success' && result.data) {
          const d = result.data;
          const currentMotor = d.moisture < 40 ? 'ON' : 'OFF';
          const currentRain = d.rain_status === 1 ? 'Raining' : 'No Rain';
          
          if (prevMotorRef.current !== null && prevMotorRef.current !== currentMotor) {
             setNotification(currentMotor === 'ON' ? 'Zone 1: Motor turned ON because the soil condition requires irrigation.' : 'Zone 1: Motor turned OFF. Soil moisture is optimal.');
             setTimeout(() => setNotification(null), 8000);
          } else if (prevRainRef.current !== null && prevRainRef.current !== currentRain && currentRain === 'Raining') {
             setNotification('Zone 1: Rain detected.');
             setTimeout(() => setNotification(null), 8000);
          }
          
          prevMotorRef.current = currentMotor;
          prevRainRef.current = currentRain;
        }
      } catch (err) {
        console.error('Failed to fetch sensor data for notifications:', err);
      }
    };

    const interval = setInterval(fetchLatestData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-[100] flex justify-center mt-4 px-4 pointer-events-none"
        >
          <div className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 font-medium border-2 border-yellow-400">
            <MdNotificationsActive size={24} className="animate-pulse" />
            <span>{notification}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
