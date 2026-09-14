import React from 'react';
import { MdNotifications, MdAccountCircle } from 'react-icons/md';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function Topbar() {
  const { t } = useTranslation();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          {t('dashboard')}
        </h2>
        <p className="text-sm text-gray-500">{t('welcome_back')}</p>
      </div>
      
      <div className="flex items-center gap-6">
        <LanguageSwitcher />
        
        <button className="relative p-2 text-gray-400 hover:text-green-600 transition-colors">
          <MdNotifications size={24} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
          <MdAccountCircle size={36} className="text-gray-400" />
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-700">
              {(() => {
                const userStr = localStorage.getItem('user');
                if (userStr) {
                  try { return JSON.parse(userStr).farmerName; } catch(e) {}
                }
                return 'Account Holder';
              })()}
            </p>
            <p className="text-xs text-gray-500">Premium Member</p>
          </div>
        </div>
      </div>
    </header>
  );
}
