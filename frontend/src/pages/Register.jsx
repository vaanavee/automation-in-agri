import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdSolarPower, MdAdd, MdDelete } from 'react-icons/md';
import { motion } from 'framer-motion';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // State for all inputs
  const [formData, setFormData] = useState({
    farmerName: '',
    mobileNumber: '',
    password: '',
    farmName: '',
    village: '',
    district: '',
    zones: [{ zoneName: 'Zone 1', area: '', cropType: '' }]
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleZoneChange = (index, field, value) => {
    const newZones = [...formData.zones];
    newZones[index][field] = value;
    setFormData({ ...formData, zones: newZones });
  };

  const addZone = () => {
    setFormData({
      ...formData,
      zones: [...formData.zones, { zoneName: `Zone ${formData.zones.length + 1}`, area: '', cropType: '' }]
    });
  };

  const removeZone = (index) => {
    if (formData.zones.length > 1) {
      const newZones = formData.zones.filter((_, i) => i !== index);
      setFormData({ ...formData, zones: newZones });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const parsedZones = formData.zones.map(z => ({
        zoneName: z.zoneName,
        area: parseFloat(z.area) || 0,
        cropType: z.cropType
      }));

      const payload = {
        ...formData,
        zones: parsedZones
      };

      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        data = { detail: 'Invalid server response' };
      }

      if (response.ok) {
        navigate('/login');
      } else {
        setError(typeof data.detail === 'string' ? data.detail : 'Registration failed');
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
        <LanguageSwitcher />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center text-green-600 mb-4"
        >
          <MdSolarPower size={64} />
        </motion.div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {t('join_agri') || 'Create New Account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('already_account') || 'Already have an account?'} {' '}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
            {t('sign_in_btn') || 'Sign in'}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('farmer_name') || 'Account Holder Name'}</label>
                <input name="farmerName" type="text" required value={formData.farmerName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('mobile_number') || 'Mobile Number'}</label>
                <input name="mobileNumber" type="tel" required value={formData.mobileNumber} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('password') || 'Password'}</label>
                <input name="password" type="password" required value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('farm_name') || 'Farm Name'}</label>
                <input name="farmName" type="text" value={formData.farmName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('village') || 'Village'}</label>
                <input name="village" type="text" required value={formData.village} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('district') || 'District'}</label>
                <input name="district" type="text" required value={formData.district} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              </div>
            </div>

            <div className="mt-8 border-t pt-6 border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Farm Zones Setup</h3>
                <button 
                  type="button" 
                  onClick={addZone}
                  className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-200"
                >
                  <MdAdd /> Add Zone
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.zones.map((zone, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative">
                    {formData.zones.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeZone(index)}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        title="Remove Zone"
                      >
                        <MdDelete size={20} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mr-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Zone Name</label>
                        <input type="text" required value={zone.zoneName} onChange={(e) => handleZoneChange(index, 'zoneName', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Area (Acres)</label>
                        <input type="number" step="0.1" required value={zone.area} onChange={(e) => handleZoneChange(index, 'area', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Crop Type</label>
                        <input type="text" required value={zone.cropType} onChange={(e) => handleZoneChange(index, 'cropType', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Creating account...' : (t('create_account') || 'Create Account')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
