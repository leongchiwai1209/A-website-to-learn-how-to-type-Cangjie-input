import React, { useState } from 'react';
import { CANGJIE_DATA } from '../constants';
import { Translations } from '../types';

interface LookupToolProps {
  t: Translations;
  dictionary: Record<string, string>;
  extendedDictionary: Record<string, string>;
  isLoading: boolean;
  isExtendedLoading: boolean;
  onEnableExtended: () => void;
}

const LookupTool: React.FC<LookupToolProps> = ({ 
  t, 
  dictionary, 
  extendedDictionary, 
  isLoading, 
  isExtendedLoading,
  onEnableExtended 
}) => {
  const [input, setInput] = useState('');
  const [useExtended, setUseExtended] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow surrogate pairs (for some ancient chars) by checking string length logic carefully or just len <= 2
    // But simplified to 1 char for now, or 2 for surrogate pairs
    if ([...val].length <= 1) {
      setInput(val);
    }
  };

  const handleToggle = () => {
    const newState = !useExtended;
    setUseExtended(newState);
    if (newState) {
      onEnableExtended();
    }
  };

  // Lookup in core first, then extended if enabled
  let code = input ? dictionary[input] : null;
  if (!code && useExtended && input) {
    code = extendedDictionary[input];
  }

  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      <h2 className="font-serif text-3xl sm:text-4xl mb-6 text-zen-charcoal">{t.home_title}</h2>
      <p className="text-gray-500 mb-6">{t.home_desc}</p>

      {/* Extended Mode Toggle */}
      <div className="flex justify-center mb-8">
        <label className="flex items-center cursor-pointer group bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={useExtended}
              onChange={handleToggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zen-jade"></div>
          </div>
          <div className="ml-3 text-left">
             <span className="block text-sm font-medium text-zen-charcoal group-hover:text-zen-jade transition-colors">
               {t.extended_mode_label}
             </span>
             <span className="block text-[10px] text-gray-400 max-w-[200px] leading-tight mt-0.5">
               {t.extended_mode_desc}
             </span>
          </div>
        </label>
      </div>

      <div className="bg-white border-b-4 border-zen-lightJade rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-10 mb-8">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          // Remove strict maxLength=1 to allow input methods that might briefly compose, or surrogate pairs
          className="w-24 h-24 text-5xl text-center border-2 border-gray-200 rounded-xl mb-6 font-serif focus:outline-none focus:border-zen-jade transition-colors bg-zen-charcoal text-white placeholder-gray-500"
          placeholder="漢"
        />

        <div className="min-h-[120px] flex flex-col items-center justify-center">
          {isLoading || (useExtended && isExtendedLoading) ? (
             <div className="flex flex-col items-center justify-center text-zen-jade/50">
               <div className="w-8 h-8 border-2 border-zen-jade border-t-transparent rounded-full animate-spin mb-2"></div>
               <span className="text-sm tracking-widest font-serif">
                 {isLoading ? "LOADING DICTIONARY..." : t.loading_extended}
               </span>
             </div>
          ) : (
            input ? (
              code ? (
                <>
                  <div className="flex items-center justify-center gap-4 p-4 bg-zen-lightJade/30 rounded-lg border border-zen-lightJade">
                    {code.split('').map((charKey, idx) => {
                      const data = CANGJIE_DATA.find((d) => d.key === charKey);
                      return (
                        <div key={idx} className="flex flex-col items-center">
                          <span className="text-zen-jade font-bold text-xl">{charKey}</span>
                          <span className="font-serif text-3xl">{data ? data.char : charKey}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-4 text-sm text-zen-jade font-medium">
                    {t.lookup_code} {code}
                  </p>
                </>
              ) : (
                <div className="p-4 bg-red-50 text-red-500 rounded-lg border border-red-100">
                  {t.lookup_error}
                </div>
              )
            ) : (
              <p className="text-gray-400">{t.home_placeholder}</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LookupTool;