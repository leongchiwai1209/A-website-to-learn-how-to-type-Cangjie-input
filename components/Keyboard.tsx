import React from 'react';
import { KEYBOARD_LAYOUT, CANGJIE_DATA } from '../constants';
import KeyCap from './KeyCap';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  highlightKey?: string | null;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, highlightKey }) => {
  // Removed local state and effects. Visual state is now purely driven by props.
  // This fixes the bug where effects were triggering twice or conflicting with parent state.

  return (
    <div className="flex flex-col items-center gap-2 p-2 sm:p-4 bg-zen-sand/20 rounded-xl border border-zen-sand/50 select-none">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className="flex justify-center gap-1 sm:gap-2"
          style={{ paddingLeft: rowIndex === 1 ? '10px' : rowIndex === 2 ? '25px' : '0' }}
        >
          {row.map((key) => {
            const data = CANGJIE_DATA.find((d) => d.key === key) || { char: '' };
            return (
              <KeyCap
                key={key}
                letter={key}
                cangjieChar={data.char}
                isPressed={highlightKey === key}
                onClick={() => onKeyPress(key)}
              />
            );
          })}
        </div>
      ))}

      {/* Space Bar */}
      <div className="flex justify-center mt-1 sm:mt-2 w-full">
         <div 
            onClick={() => onKeyPress('SPACE')}
            className={`
                w-48 h-[36px] sm:h-[48px] md:h-[56px] border rounded-md sm:rounded-lg
                flex items-center justify-center cursor-pointer select-none transition-all duration-100
                ${highlightKey === 'SPACE' 
                   ? 'transform translate-y-[3px] shadow-none bg-zen-lightJade border-zen-jade'
                   : 'bg-white border-gray-200 shadow-[0_4px_0_#ccc] hover:border-zen-jade hover:shadow-[0_4px_0_#2d6a4f]'}
            `}
         >
             <span className="text-xs font-bold text-gray-400">SPACE</span>
         </div>
      </div>
    </div>
  );
};

export default Keyboard;