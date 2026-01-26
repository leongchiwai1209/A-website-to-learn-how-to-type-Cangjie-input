import React from 'react';
import { Translations } from '../types';

interface RulesGuideProps {
  t: Translations;
}

const RulesGuide: React.FC<RulesGuideProps> = ({ t }) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl mb-4 text-zen-charcoal">{t.rules_title}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">{t.rules_desc}</p>
      </div>

      <div className="space-y-8">
        {t.rules_list.map((rule, idx) => (
          <div key={idx} className="bg-white border-l-4 border-zen-jade rounded-r-xl shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
            <h3 className="font-serif text-2xl text-zen-jade mb-3">{rule.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{rule.desc}</p>
            
            <div className="bg-zen-offwhite rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {rule.examples.map((ex, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-3 rounded border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 flex items-center justify-center bg-zen-charcoal text-white text-2xl font-serif rounded">
                      {ex.char}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zen-jade font-bold text-lg tracking-wider">{ex.code}</span>
                      {ex.note && <span className="text-xs text-gray-400">{ex.note}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RulesGuide;