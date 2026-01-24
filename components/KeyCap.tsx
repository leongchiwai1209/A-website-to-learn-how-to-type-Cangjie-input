import React from 'react';

interface KeyCapProps {
  letter: string;
  cangjieChar: string;
  isPressed: boolean;
  onClick: () => void;
}

const KeyCap: React.FC<KeyCapProps> = ({ letter, cangjieChar, isPressed, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        w-[36px] h-[48px] sm:w-[50px] sm:h-[56px] md:w-[60px] md:h-[64px]
        bg-white border rounded-md sm:rounded-lg
        flex flex-col items-center justify-center
        cursor-pointer select-none transition-all duration-100
        ${isPressed 
          ? 'transform translate-y-[3px] shadow-none bg-zen-lightJade border-zen-jade' 
          : 'shadow-[0_4px_0_#ccc] border-gray-200 hover:border-zen-jade hover:shadow-[0_4px_0_#2d6a4f]'}
      `}
    >
      <span className={`text-[10px] sm:text-xs font-bold ${isPressed ? 'text-zen-jade' : 'text-gray-400'}`}>
        {letter}
      </span>
      <span className={`text-sm sm:text-lg md:text-xl font-bold font-serif ${isPressed ? 'text-zen-jade' : 'text-zen-charcoal'}`}>
        {cangjieChar}
      </span>
    </div>
  );
};

export default KeyCap;
