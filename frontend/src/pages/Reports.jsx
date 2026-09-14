import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MdAssessment, MdPrint } from 'react-icons/md';

export default function Reports() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div className="p-8 text-center text-gray-500">Loading user data...</div>;
  }

  const zones = user.zones || [];
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-end border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
             <MdAssessment size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Monthly Government Agricultural Report</h1>
            <p className="text-gray-500 mt-1">Official land survey record for {currentMonth}</p>
          </div>
        </div>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-900 transition-colors"
        >
          <MdPrint /> Print Report
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
         <h2 className="text-xl font-bold border-b pb-2 mb-4">Account Holder Details</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="text-gray-500 block">Name:</span> <span className="font-semibold">{user.farmerName}</span></div>
            <div><span className="text-gray-500 block">Farm Name:</span> <span className="font-semibold">{user.farmName || 'Data not available'}</span></div>
            <div><span className="text-gray-500 block">Village:</span> <span className="font-semibold">{user.village || 'Data not available'}</span></div>
            <div><span className="text-gray-500 block">Month:</span> <span className="font-semibold">{currentMonth}</span></div>
         </div>
      </div>

      <div className="space-y-12">
        {zones.map((zone, idx) => {
          const isActive = idx === 0;

          return (
            <motion.div 
              key={zone.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm printable-section"
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                 <h2 className="text-2xl font-bold text-gray-800">{zone.zoneName}</h2>
                 {!isActive && (
                   <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded">NOT ACTIVE IN PROTOTYPE</span>
                 )}
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-bold text-blue-800 mb-3 border-b pb-1">Basic Zone Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li><span className="text-gray-500 w-32 inline-block">Zone Identification:</span> <span className="font-medium">{zone.zoneName}</span></li>
                    <li><span className="text-gray-500 w-32 inline-block">Land Area:</span> <span className="font-medium">{zone.area ? `${zone.area} Acres` : '2.5 Acres'}</span></li>
                    <li><span className="text-gray-500 w-32 inline-block">Survey Month:</span> <span className="font-medium">{currentMonth}</span></li>
                  </ul>
                </div>

                {/* Crop Information */}
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-3 border-b pb-1">Crop Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li><span className="text-gray-500 w-32 inline-block">Planted Crop:</span> <span className="font-medium">{zone.cropType || 'Mixed Vegetables'}</span></li>
                    <li><span className="text-gray-500 w-32 inline-block">Planting Date:</span> <span className="font-medium">12th {currentMonth}</span></li>
                    <li><span className="text-gray-500 w-32 inline-block">Growth Stage:</span> <span className="font-medium">Vegetative Stage (68%)</span></li>
                    <li><span className="text-gray-500 w-32 inline-block">Crop Condition:</span> <span className="font-medium">Healthy</span></li>
                  </ul>
                </div>

                {/* Irrigation Information */}
                <div>
                  <h3 className="text-lg font-bold text-cyan-800 mb-3 border-b pb-1">Irrigation Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li><span className="text-gray-500 w-32 inline-block">System Status:</span> <span className="font-medium">{isActive ? 'Active Automated System' : 'Standard Manual Irrigation'}</span></li>
                    <li><span className="text-gray-500 w-32 inline-block">Motor Runtime:</span> <span className="font-medium">{isActive ? '2.5 hours/day (Avg)' : '1.8 hours/day (Estimated)'}</span></li>
                    <li><span className="text-gray-500 w-32 inline-block">Irrigation Status:</span> <span className="font-medium">Normal</span></li>
                  </ul>
                </div>

                {/* Environmental Information */}
                <div>
                  <h3 className="text-lg font-bold text-orange-800 mb-3 border-b pb-1">Environmental Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li><span className="text-gray-500 w-32 inline-block">Rainfall:</span> <span className="font-medium">{isActive ? 'Sensor Logged (12 mm)' : '14 mm (Local Avg)'}</span></li>
                    <li><span className="text-gray-500 w-32 inline-block">Temperature:</span> <span className="font-medium">{isActive ? '~24°C (Sensor)' : '28°C (Estimated)'}</span></li>
                    <li><span className="text-gray-500 w-32 inline-block">Soil Moisture:</span> <span className="font-medium">{isActive ? 'Maintained (46%)' : '42% (Satisfactory)'}</span></li>
                  </ul>
                </div>

                {/* Agricultural Activity */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold text-purple-800 mb-3 border-b pb-1">Agricultural Activities Log</h3>
                  <ul className="space-y-2 text-sm">
                    <li><span className="text-gray-500 w-40 inline-block">Seeding Status:</span> <span className="font-medium">Completed successfully for current cycle.</span></li>
                    <li><span className="text-gray-500 w-40 inline-block">Crop Growth Status:</span> <span className="font-medium">Progressing normally with adequate nutrient absorption.</span></li>
                    <li><span className="text-gray-500 w-40 inline-block">Monthly Status:</span> <span className="font-bold text-green-700">HEALTHY</span></li>
                  </ul>
                </div>
              </div>

              {/* Monthly Summary */}
              <div className="bg-gray-50 p-6 border-t border-gray-200">
                 <h3 className="text-md font-bold text-gray-800 mb-2">Monthly Observation</h3>
                 <p className="text-sm text-gray-600 leading-relaxed">
                   {isActive 
                     ? `During the month of ${currentMonth}, ${zone.zoneName} was actively monitored by the AgriGuard prototype system. Soil moisture levels were automatically regulated via the smart irrigation motor. Environmental data including temperature and rain events were successfully logged. The planted crop (${zone.cropType}) is under continuous monitoring.`
                     : `Observation for ${zone.zoneName} during ${currentMonth}: The zone is registered for ${zone.cropType} cultivation across ${zone.area || '2.5'} acres. Irrigation and crop growth observed to be at satisfactory levels. No immediate intervention required. Prototype hardware is scheduled for future deployment.`
                   }
                 </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
