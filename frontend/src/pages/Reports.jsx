import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MdVolumeUp, MdPauseCircle, MdAssessment } from 'react-icons/md';

export default function Reports() {
  const { t, i18n } = useTranslation();
  const [playingId, setPlayingId] = useState(null);

  // Fallback to t('reports_text') directly if it's already translated
  // For the TTS, we get the translated string
  const getReportText = () => {
    // This assumes translation keys like reports_text exist
    return t('reports_text');
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
           <MdAssessment size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{t('reports_title')}</h1>
          <p className="text-gray-500 mt-1">{t('reports_desc')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border shadow-sm flex flex-col justify-between border-gray-100"
        >
          <div>
             <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('weekly_soil_health')}</h2>
             <p className="text-lg text-gray-600 leading-relaxed mb-8">
               {getReportText()}
             </p>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={() => handleSpeak(getReportText(), 'report-1')}
              className={`shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                playingId === 'report-1' 
                  ? 'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-200' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200'
              }`}
            >
              {playingId === 'report-1' ? (
                <>
                  <MdPauseCircle size={24} className="animate-pulse" />
                  <span>{t('stop')}</span>
                </>
              ) : (
                <>
                  <MdVolumeUp size={24} />
                  <span>{t('listen_to_report')}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Chart Mockup */}
      <div className="mt-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-64 flex items-center justify-center">
         <p className="text-gray-400 font-medium">{t('under_construction')}</p>
      </div>
    </div>
  );
}
