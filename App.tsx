import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import LookupTool from './components/LookupTool';
import PracticeCard from './components/PracticeCard';
import ReferenceTable from './components/ReferenceTable';
import RulesGuide from './components/RulesGuide';
import Keyboard from './components/Keyboard';
import LanguageSwitcher from './components/LanguageSwitcher';
import { TabId, LangCode, CangjieChar } from './types';
import { TRANSLATIONS, CANGJIE_DATA } from './constants';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabId>('home');
  const [currentLang, setCurrentLang] = useState<LangCode>('ja');
  const [activeKey, setActiveKey] = useState<string | null>(null); // For global keyboard listener visualization
  const [selectedCharInfo, setSelectedCharInfo] = useState<CangjieChar | null>(null);
  
  // Data loading
  const [dictionary, setDictionary] = useState<Record<string, string>>({});
  const [extendedDictionary, setExtendedDictionary] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isExtendedLoading, setIsExtendedLoading] = useState(false);

  const t = TRANSLATIONS[currentLang];

  // Fetch core dictionary on mount
  useEffect(() => {
    fetch('cangjie-dictionary.json')
      .then((res) => res.json())
      .then((data) => {
        setDictionary(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load dictionary:", err);
        setIsLoading(false);
      });
  }, []);

  // Lazy load extended dictionary
  const loadExtendedDictionary = useCallback(async () => {
    if (Object.keys(extendedDictionary).length > 0) return; // Already loaded

    setIsExtendedLoading(true);
    try {
      const res = await fetch('cangjie-dictionary-extended.json');
      const data = await res.json();
      setExtendedDictionary(data);
    } catch (err) {
      console.error("Failed to load extended dictionary:", err);
    } finally {
      setIsExtendedLoading(false);
    }
  }, [extendedDictionary]);

  // Global key listener to drive state
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'BACKSPACE') {
        setActiveKey('BACKSPACE');
      } else if (e.code === 'Space' || key === ' ') {
        setActiveKey('SPACE');
        e.preventDefault(); // Prevent scrolling when pressing space
      } else if (/^[A-Z]$/.test(key)) {
        setActiveKey(key);
      }
    };
    
    // Clear active key
    const handleKeyUp = () => {
       setActiveKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleKeyboardClick = (key: string) => {
    setActiveKey(key);
    // Mimic a quick press for mouse clicks
    setTimeout(() => setActiveKey(null), 150);
  };

  // Logic for "Learn" tab detail view
  useEffect(() => {
    if (currentTab === 'learn') {
       if (activeKey === 'SPACE') {
           setSelectedCharInfo(null);
       } else if (activeKey && /^[A-Y]$/.test(activeKey)) {
           const data = CANGJIE_DATA.find(d => d.key === activeKey);
           if (data) setSelectedCharInfo(data);
       }
    }
  }, [activeKey, currentTab]);

  const getDescription = (info: CangjieChar) => {
    if (currentLang === 'ja') return info.desc_ja;
    if (currentLang === 'en') return info.desc_en;
    return info.desc_zh;
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-zen-offwhite text-zen-charcoal">
      <Navbar currentTab={currentTab} setTab={setCurrentTab} t={t} />

      <main className="flex-grow w-full max-w-6xl mx-auto p-4 md:p-8">
        
        {/* Tab: Home */}
        {currentTab === 'home' && (
          <LookupTool 
            t={t} 
            dictionary={dictionary} 
            extendedDictionary={extendedDictionary}
            isLoading={isLoading} 
            isExtendedLoading={isExtendedLoading}
            onEnableExtended={loadExtendedDictionary}
          />
        )}

        {/* Tab: Learn */}
        {currentTab === 'learn' && (
          <div className="animate-fade-in">
             <div className="mb-12 text-center min-h-[250px] flex flex-col items-center justify-center">
                {selectedCharInfo ? (
                    <div className="bg-white border-b-4 border-zen-lightJade rounded-xl shadow-lg p-8 w-full max-w-3xl animate-fade-in text-left">
                         <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-zen-lightJade text-zen-jade">
                                    {t.cats[selectedCharInfo.cat] || selectedCharInfo.cat}
                                </span>
                                <h3 className="font-serif text-6xl mt-4 text-zen-jade">
                                    {selectedCharInfo.char} 
                                    <span className="text-2xl text-gray-300 font-sans ml-2">({selectedCharInfo.key})</span>
                                </h3>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{t.learn_aux_title}</p>
                                <div className="flex flex-wrap justify-end gap-2 max-w-[150px]">
                                    {selectedCharInfo.aux.map((a, i) => (
                                        <span key={i} className="bg-zen-offwhite px-2 py-1 rounded text-lg font-serif text-zen-jade">{a}</span>
                                    ))}
                                </div>
                            </div>
                         </div>
                         <p className="text-gray-600 text-lg leading-relaxed border-t pt-4 mt-4">
                             {getDescription(selectedCharInfo)}
                         </p>
                    </div>
                ) : (
                    <div className="text-center opacity-70">
                        <h2 className="font-serif text-3xl mb-2 text-zen-charcoal">{t.learn_title}</h2>
                        <p className="text-gray-500">{t.learn_desc}</p>
                    </div>
                )}
             </div>

             <div className="flex justify-center">
                 <Keyboard onKeyPress={handleKeyboardClick} highlightKey={activeKey} />
             </div>
          </div>
        )}

        {/* Tab: Practice */}
        {currentTab === 'practice' && (
           <div className="flex flex-col gap-12">
               <PracticeCard 
                 t={t} 
                 triggerKey={activeKey} 
                 onNext={() => setActiveKey(null)}
               />
               <div className="opacity-50 hover:opacity-100 transition-opacity flex justify-center scale-90">
                 {/* Visual only keyboard for reference during practice */}
                 <Keyboard onKeyPress={handleKeyboardClick} highlightKey={activeKey} />
               </div>
           </div>
        )}

        {/* Tab: Table */}
        {currentTab === 'table' && <ReferenceTable t={t} />}

        {/* Tab: Rules (New) */}
        {currentTab === 'rules' && <RulesGuide t={t} />}

      </main>

      <LanguageSwitcher currentLang={currentLang} onChange={setCurrentLang} />

      <footer className="p-8 text-center text-xs text-gray-400 tracking-widest uppercase">
        &copy; 2024 Cangjie Zen — Wikipedia {t.footer_ref}
      </footer>
    </div>
  );
};

export default App;