import React, { useState, useEffect } from 'react';
import { CANGJIE_DATA } from '../constants';
import { Translations } from '../types';
import { lookupLocalChar, searchRemote } from '../utils/db'; // Import separated lookup functions

interface LookupToolProps {
  t: Translations;
  isDbReady: boolean;
  dbError: boolean;
}

const LookupTool: React.FC<LookupToolProps> = ({ 
  t, 
  isDbReady,
  dbError
}) => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState<string | null>(null);
  const [useExtended, setUseExtended] = useState(false);
  const [isSearchingRemote, setIsSearchingRemote] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if ([...val].length <= 1) {
      setInput(val);
    }
  };

  // Perform async lookup
  useEffect(() => {
    let isMounted = true;

    const performLookup = async () => {
        if (!input || !isDbReady) {
            if (isMounted) {
                setCode(null);
                setIsSearchingRemote(false);
            }
            return;
        }

        // 1. Try Local Core First (Instant)
        const localResult = lookupLocalChar(input);
        if (localResult) {
            if (isMounted) {
                setCode(localResult);
                setIsSearchingRemote(false);
            }
            return;
        }

        // 2. If not in local, and Extended Mode is ON, try Remote API
        if (useExtended) {
            if (isMounted) {
                setCode(null);
                setIsSearchingRemote(true);
            }
            
            const remoteResult = await searchRemote(input);
            
            if (isMounted) {
                setCode(remoteResult);
                setIsSearchingRemote(false);
            }
        } else {
            // Not found locally, and extended is OFF
            if (isMounted) {
                setCode(null);
                setIsSearchingRemote(false);
            }
        }
    };

    performLookup();

    return () => { isMounted = false; };
  }, [input, useExtended, isDbReady]);

  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      <h2 className="font-serif text-3xl sm:text-4xl mb-6 text-zen-charcoal">{t.home_title}</h2>
      <p className="text-gray-500 mb-6">{t.home_desc}</p>

      {/* Extended Mode Toggle */}
      <div className="flex justify-center mb-8">
        <label className={`flex items-center cursor-pointer group bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm transition-all`}>
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={useExtended}
              onChange={() => setUseExtended(!useExtended)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zen-jade"></div>
          </div>
          <div className="ml-3 text-left">
             <div className="flex items-center gap-2">
                <span className="block text-sm font-medium text-zen-charcoal group-hover:text-zen-jade transition-colors">
                  {t.extended_mode_label}
                </span>
             </div>
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
          disabled={!isDbReady}
          className="w-24 h-24 text-5xl text-center border-2 border-gray-200 rounded-xl mb-6 font-serif focus:outline-none focus:border-zen-jade transition-colors bg-zen-charcoal text-white placeholder-gray-500 disabled:opacity-50"
          placeholder="漢"
        />

        <div className="min-h-[120px] flex flex-col items-center justify-center">
          {!isDbReady ? (
             <div className="flex flex-col items-center justify-center text-zen-jade/50">
               {dbError ? (
                  <span className="text-red-500">Database Load Failed</span>
               ) : (
                 <>
                  <div className="w-8 h-8 border-2 border-zen-jade border-t-transparent rounded-full animate-spin mb-2"></div>
                  <span className="text-sm tracking-widest font-serif">LOADING CORE DB...</span>
                 </>
               )}
             </div>
          ) : (
            input ? (
              isSearchingRemote ? (
                <div className="flex flex-col items-center animate-fade-in">
                    <div className="w-6 h-6 border-2 border-zen-jade border-t-transparent rounded-full animate-spin mb-2"></div>
                    <span className="text-xs text-gray-400">Searching Cloud...</span>
                </div>
              ) : code ? (
                <>
                  <div className="flex items-center justify-center gap-4 p-4 bg-zen-lightJade/30 rounded-lg border border-zen-lightJade animate-fade-in">
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
                  <p className="mt-4 text-sm text-zen-jade font-medium animate-fade-in">
                    {t.lookup_code} {code}
                  </p>
                </>
              ) : (
                <div className="p-4 bg-red-50 text-red-500 rounded-lg border border-red-100 animate-fade-in">
                   {t.lookup_error}
                   {!useExtended && (
                       <div className="mt-2 text-xs text-red-400">
                           Try turning on Extended Mode?
                       </div>
                   )}
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