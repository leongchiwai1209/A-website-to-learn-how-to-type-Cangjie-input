import React from 'react';
import { CANGJIE_DATA } from '../constants';
import { Translations } from '../types';

interface ReferenceTableProps {
  t: Translations;
}

const ReferenceTable: React.FC<ReferenceTableProps> = ({ t }) => {
  const categories = Array.from(new Set(CANGJIE_DATA.map((d) => d.cat)));

  return (
    <div className="animate-fade-in">
      <h2 className="font-serif text-3xl mb-8 text-center text-zen-charcoal">{t.table_title}</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((cat) => {
          const items = CANGJIE_DATA.filter((d) => d.cat === cat);
          return (
            <div key={cat} className="bg-white border-b-4 border-zen-lightJade rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6">
              <h3 className="font-serif text-xl mb-4 border-b pb-2 text-zen-jade">
                {t.cats[cat] || cat}
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {items.map((d) => (
                  <div key={d.key} className="text-center group hover:bg-zen-offwhite rounded p-1 transition-colors">
                    <div className="text-xs text-gray-400 font-mono group-hover:text-zen-jade">{d.key}</div>
                    <div className="text-2xl font-serif text-zen-charcoal">{d.char}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReferenceTable;
