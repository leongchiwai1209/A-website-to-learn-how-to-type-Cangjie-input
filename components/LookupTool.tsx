import React, { useState } from 'react';
import { CANGJIE_DATA, DICTIONARY } from '../constants';
import { Translations } from '../types';

interface LookupToolProps {
  t: Translations;
}

const LookupTool: React.FC<LookupToolProps> = ({ t }) => {
  const [input, setInput] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length <= 1) {
      setInput(val);
    }
  };

  const code = input ? DICTIONARY[input] : null;

  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      <h2 className="font-serif text-3xl sm:text-4xl mb-6 text-zen-charcoal">{t.home_title}</h2>
      <p className="text-gray-500 mb-10">{t.home_desc}</p>

      <div className="bg-white border-b-4 border-zen-lightJade rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-10 mb-8">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          maxLength={1}
          className="w-24 h-24 text-5xl text-center border-2 border-gray-200 rounded-xl mb-6 font-serif focus:outline-none focus:border-zen-jade transition-colors"
          placeholder="漢"
        />

        <div className="min-h-[120px] flex flex-col items-center justify-center">
          {input ? (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default LookupTool;
