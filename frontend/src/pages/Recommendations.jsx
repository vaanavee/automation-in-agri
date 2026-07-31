import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MdVolumeUp, MdLightbulb, MdWaterDrop, MdScience, MdThermostat, MdPauseCircle } from 'react-icons/md';

export default function Recommendations() {
  const { t, i18n } = useTranslation();
  const [playingId, setPlayingId] = useState(null);

  const recommendations = [
    {
      id: 1,
      type: 'moisture',
      icon: <MdWaterDrop size={24} />,
      color: 'blue',
      titleKey: 'irrigation_needed',
      messageKey: 'irrigation_needed_msg'
    },
    {
      id: 2,
      type: 'ph',
      icon: <MdScience size={24} />,
      color: 'purple',
      titleKey: 'ph_adjustment',
      messageKey: 'ph_adjustment_msg'
    },
    {
      id: 3,
      type: 'temp',
      icon: <MdThermostat size={24} />,
      color: 'orange',
      titleKey: 'temperature_warning',
      messageKey: 'temperature_warning_msg'
    }
  ];

  const handleSpeak = (text, id) => {
    if (playingId === id) {
      if (window.currentAudio) {
        window.currentAudio.pause();
      }
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }

    // Stop previous
    if (window.currentAudio) {
      window.currentAudio.pause();
    }
    window.speechSynthesis.cancel();
    
    const langCode = i18n.language || 'en';
    const primaryLang = langCode.split('-')[0];
    
    // Use Google Translate TTS for reliable regional language voices
    const url = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${primaryLang}&q=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    window.currentAudio = audio;
    
    audio.onended = () => setPlayingId(null);
    
    audio.onerror = () => {
      // Fallback to Web Speech API if Audio fails
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = primaryLang === 'ta' ? 'ta-IN' : (primaryLang === 'en' ? 'en-US' : primaryLang);
      
      const voices = window.speechSynthesis.getVoices();
      let voice = voices.find(v => v.lang.startsWith(primaryLang)) || 
                  voices.find(v => v.name.toLowerCase().includes(primaryLang === 'ta' ? 'tamil' : primaryLang));
      
      if (voice) utterance.voice = voice;
      
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
    };
    
    setPlayingId(id);
    audio.play().catch(err => {
      console.warn("Audio API failed, falling back to SpeechSynthesis", err);
      audio.onerror(); // trigger fallback manually
    });
  };

  const getColorClasses = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'purple': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'orange': return 'bg-orange-50 border-orange-200 text-orange-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIconColorClasses = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="bg-yellow-100 p-3 rounded-2xl text-yellow-600">
           <MdLightbulb size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{t('ai_recommendations')}</h1>
          <p className="text-gray-500 mt-1">{t('ai_recommendations_desc')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        {recommendations.map((rec, idx) => {
          const message = t(rec.messageKey);
          
          return (
            <motion.div 
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl p-6 border shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between ${getColorClasses(rec.color)}`}
            >
              <div className="flex items-start gap-4 flex-1">
                <div className={`p-3 rounded-xl mt-1 ${getIconColorClasses(rec.color)}`}>
                  {rec.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{t(rec.titleKey)}</h3>
                  <p className="text-base font-medium opacity-90 leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => handleSpeak(message, rec.id)}
                className={`shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  playingId === rec.id 
                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-200' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200 hover:border-gray-300'
                }`}
              >
                {playingId === rec.id ? (
                  <>
                    <MdPauseCircle size={24} className="animate-pulse" />
                    <span>{t('stop')}</span>
                  </>
                ) : (
                  <>
                    <MdVolumeUp size={24} />
                    <span>{t('listen')}</span>
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-8 bg-green-50 rounded-2xl p-6 border border-green-200 flex gap-4">
         <div className="text-green-600">
           <MdLightbulb size={24} />
         </div>
         <div>
           <h4 className="font-bold text-green-800 mb-1">{t('crop_suggestion_title')}</h4>
           <p className="text-green-700 font-medium">{t('crop_suggestion_desc')}</p>
         </div>
      </div>
    </div>
  );
}
