import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CANGJIE_DATA, PRACTICE_LIST } from '../constants';
import { Translations } from '../types';

interface PracticeCardProps {
  t: Translations;
  triggerKey: string | null;
  onNext: () => void;
}

const PracticeCard: React.FC<PracticeCardProps> = ({ t, triggerKey, onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [score, setScore] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  
  // Track the last processed key to prevent duplicate processing on re-renders
  const lastProcessedKeyRef = useRef<string | null>(null);

  const currentItem = PRACTICE_LIST[currentIndex];

  const nextWord = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PRACTICE_LIST.length);
    setCurrentInput('');
    setMistakeCount(0);
    setAnimationClass('');
    setIsLocked(false);
    lastProcessedKeyRef.current = null;
    onNext(); // Inform parent to clear trigger if needed
  }, [onNext]);

  useEffect(() => {
    // Reset processed key when key is released
    if (!triggerKey) {
      lastProcessedKeyRef.current = null;
      return;
    }

    if (isLocked) return;

    // Prevent re-processing the same key press (e.g. caused by state updates/re-renders)
    if (lastProcessedKeyRef.current === triggerKey) {
      return;
    }

    // Mark key as processed immediately
    lastProcessedKeyRef.current = triggerKey;

    if (triggerKey === 'BACKSPACE') {
      setCurrentInput((prev) => prev.slice(0, -1));
      return;
    }

    // Only process A-Z letters
    if (!/^[A-Z]$/.test(triggerKey)) return;

    const targetLength = currentItem.code.length;
    
    // Prevent typing beyond required length
    if (currentInput.length >= targetLength) return;

    // Update input
    const nextInput = currentInput + triggerKey;
    setCurrentInput(nextInput);

    // Validate only when full length is reached
    if (nextInput.length === targetLength) {
      setIsLocked(true);
      
      if (nextInput === currentItem.code) {
         // Success
         setScore((prev) => prev + 10);
         setAnimationClass('animate-glow text-zen-jade');
         setTimeout(() => {
            nextWord();
         }, 800);
      } else {
        // Error
        setMistakeCount((prev) => prev + 1);
        setAnimationClass('animate-shake text-red-500');
        setTimeout(() => {
          setAnimationClass('');
          setCurrentInput('');
          setIsLocked(false);
        }, 500);
      }
    }

  }, [triggerKey, currentItem, currentInput, nextWord, isLocked]);


  // Generate hint
  const renderHint = () => {
    if (mistakeCount === 0) return null;
    
    return (
      <div className="h-8 text-red-500 font-bold mb-2 animate-fade-in flex items-center justify-center">
        <span>{t.practice_hint_prefix}</span>
        <span className="ml-2 font-serif flex gap-2">
          {currentItem.code.split('').map((char, idx) => {
             // Reveal keys progressively based on mistake count
             const shouldReveal = idx < mistakeCount;
             const data = CANGJIE_DATA.find(d => d.key === char);
             
             return (
               <span key={idx} className={shouldReveal ? "text-red-500" : "text-gray-300"}>
                 {shouldReveal ? (data?.char || char) : "_"}
               </span>
             );
          })}
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto text-center animate-fade-in">
      <h2 className="font-serif text-3xl mb-6 text-zen-charcoal">{t.practice_title}</h2>
      
      <div className="bg-white border-b-4 border-zen-lightJade rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-12 mb-8 relative">
        {renderHint()}
        
        <div className={`font-serif text-9xl mb-8 transition-all duration-300 ${animationClass}`}>
          {currentItem.word}
        </div>

        <div className={`flex justify-center gap-2 mb-4 min-h-[50px] transition-all duration-300 ${animationClass}`}>
           {currentItem.code.split('').map((_, idx) => {
             const charKey = currentInput[idx];
             const data = charKey ? CANGJIE_DATA.find(d => d.key === charKey) : null;
             
             return (
               <div 
                 key={idx}
                 className={`w-12 h-12 border-b-2 flex items-center justify-center font-serif text-3xl mx-1 transition-colors ${
                   charKey ? 'border-zen-jade text-zen-jade' : 'border-gray-300'
                 }`}
               >
                 {data ? data.char : charKey || ''}
               </div>
             );
           })}
        </div>

        <p className="text-gray-400 text-sm mt-4">{t.practice_instruction}</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-left">
          <span className="text-xs uppercase text-gray-400 tracking-wider">Score</span>
          <div className="text-2xl font-bold text-zen-jade">{score}</div>
        </div>
        <button 
          onClick={nextWord}
          className="px-6 py-2 bg-zen-charcoal text-white rounded hover:bg-gray-700 transition"
        >
          {t.btn_skip}
        </button>
      </div>
    </div>
  );
};

export default PracticeCard;