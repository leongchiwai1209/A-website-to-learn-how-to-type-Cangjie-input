import React from 'react';
import { TabId, Translations } from '../types';

interface NavbarProps {
  currentTab: TabId;
  setTab: (t: TabId) => void;
  t: Translations;
}

const Navbar: React.FC<NavbarProps> = ({ currentTab, setTab, t }) => {
  const navItems: { id: TabId; label: string }[] = [
    { id: 'home', label: t.nav_home },
    { id: 'learn', label: t.nav_learn },
    { id: 'practice', label: t.nav_practice },
    { id: 'table', label: t.nav_table },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4 transition-all">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h1 
            onClick={() => setTab('home')}
            className="font-serif text-2xl font-bold tracking-tighter text-zen-jade cursor-pointer select-none"
        >
          Cangjie <span className="font-sans font-light text-zen-jade/70">Zen</span>
        </h1>
        <div className="flex space-x-4 sm:space-x-8 text-xs sm:text-sm uppercase tracking-widest font-medium overflow-x-auto w-full sm:w-auto justify-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`pb-1 transition-colors border-b-2 whitespace-nowrap ${
                currentTab === item.id 
                  ? 'border-zen-jade text-zen-jade' 
                  : 'border-transparent text-gray-500 hover:text-zen-jade/70'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
