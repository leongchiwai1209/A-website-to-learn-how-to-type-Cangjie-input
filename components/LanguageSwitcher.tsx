import React, { useState } from 'react';
import { LangCode, Translations } from '../types';
import { TRANSLATIONS } from '../constants';

interface LanguageSwitcherProps {
  currentLang: LangCode;
  onChange: (lang: LangCode) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const langs: { code: LangCode; label: string; flag: string }[] = [
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'zh-hans', label: '中国語（簡体）', flag: '🇨🇳' },
    { code: 'zh-hant', label: '中国語（繁体）', flag: '🇹🇼' },
    { code: 'zh-hk', label: '広東語', flag: '🇭🇰' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-100 rounded-xl shadow-xl p-2 min-w-[180px] flex flex-col animate-fade-in mb-2">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                onChange(l.code);
                setIsOpen(false);
              }}
              className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors hover:bg-zen-offwhite ${
                currentLang === l.code ? 'text-zen-jade font-bold' : 'text-gray-600'
              }`}
            >
              <span>{l.label}</span>
              <span>{l.flag}</span>
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur border border-white/20 shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-300"
      >
        {t.flag}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
