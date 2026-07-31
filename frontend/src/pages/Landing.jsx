import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdSolarPower, MdSensors, MdOutlinePhoneIphone, MdSecurity } from 'react-icons/md';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-xl text-white">
                <MdSolarPower size={28} />
              </div>
              <span className="text-2xl font-bold text-green-700">AgriGuard</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 hover:text-green-600 font-medium px-3 py-2 rounded-md">
                Login
              </Link>
              <Link to="/register" className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm shadow-green-200">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
            <motion.main 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28"
            >
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Smart Solar Farm</span>{' '}
                  <span className="block text-green-600 xl:inline">Monitoring System</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Empower your agriculture with AgriGuard. Monitor soil health, weather, and irrigation needs in real-time with our 100% solar-powered IoT stations.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                  <Link to="/register" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 shadow-lg shadow-green-200 transition-transform hover:-translate-y-1">
                    Get Started
                  </Link>
                  <Link to="/dashboard" className="flex items-center justify-center px-8 py-3 border-2 border-green-100 text-base font-medium rounded-xl text-green-700 bg-green-50 hover:bg-green-100 md:py-4 md:text-lg md:px-10 transition-transform hover:-translate-y-1">
                    View Demo
                  </Link>
                </div>
              </div>
            </motion.main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-green-50 p-12 flex justify-center items-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="relative w-full max-w-lg aspect-square bg-gradient-to-tr from-green-400 to-green-600 rounded-full opacity-20 blur-3xl absolute"
           ></motion.div>
           <motion.div 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
           >
             {/* Abstract Dashboard preview image */}
             <div className="h-12 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
               <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             <div className="p-6 grid grid-cols-2 gap-4">
               <div className="h-24 bg-blue-50 rounded-xl"></div>
               <div className="h-24 bg-green-50 rounded-xl"></div>
               <div className="h-32 bg-orange-50 rounded-xl col-span-2"></div>
             </div>
           </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything a modern farmer needs
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-green-100 text-green-600 mx-auto">
                  <MdSensors size={32} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">Real-time Sensors</h3>
                <p className="mt-2 text-base text-gray-500">Continuous monitoring of soil moisture, pH, and temperature.</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-yellow-100 text-yellow-600 mx-auto">
                  <MdSolarPower size={32} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">Solar Powered</h3>
                <p className="mt-2 text-base text-gray-500">100% off-grid operation with built-in solar panels and battery backup.</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-100 text-blue-600 mx-auto">
                  <MdOutlinePhoneIphone size={32} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">Multilingual App</h3>
                <p className="mt-2 text-base text-gray-500">Access data in 11 Indian languages with voice assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
