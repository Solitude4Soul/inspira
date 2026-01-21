'use client';

import { useState } from 'react';
import { X, Hammer } from 'lucide-react';

const CRACKS_TO_BREAK = 10;

export default function EasterEgg({ onClose }: { onClose: () => void }) {
  const [crackLevel, setCrackLevel] = useState(0);
  const [isBroken, setIsBroken] = useState(false);

  const handleEggClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the global click handler from running

    if (crackLevel < CRACKS_TO_BREAK) {
      setCrackLevel(crackLevel + 1);
    } else {
      setIsBroken(true);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose();
  }

  if (isBroken) {
    return (
      <div 
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        data-easter-egg="true"
        onClick={onClose}
      >
        <div className="relative rounded-lg bg-background p-8 shadow-2xl border border-primary/20 text-center" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleClose}
            className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground shadow-lg hover:bg-muted"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <Hammer className="h-16 w-16 mx-auto text-primary animate-pulse" />
          <h2 className="mt-4 text-2xl font-headline font-bold">Under Development</h2>
          <p className="mt-2 text-muted-foreground">This special feature is still being built. Come back soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      data-easter-egg="true"
    >
      <div className="relative">
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground shadow-lg hover:bg-muted"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <div 
            className="relative animate-pulse"
            style={{ animationIterationCount: 1, animationDuration: '1s' }}
            onClick={handleEggClick}
        >
            <div 
                className="relative h-48 w-36 cursor-pointer overflow-hidden rounded-[50%/60%_60%_40%_40%] bg-stone-100 shadow-inner transition-transform duration-200 hover:scale-105"
                style={{ animation: crackLevel > 0 ? `shake 0.2s ${crackLevel}` : 'none' }}
            >
                <div 
                className="relative h-full w-full rounded-[50%/60%_60%_40%_40%] bg-amber-50 shadow-md before:absolute before:inset-0 before:rounded-[50%/60%_60%_40%_40%] before:shadow-inner before:content-['']"
                >
                {/* Cracks */}
                {crackLevel >= 1 && <div className="crack" style={{ top: '20%', left: '45%', height: '20%', transform: 'rotate(10deg)' }} />}
                {crackLevel >= 2 && <div className="crack" style={{ top: '40%', left: '30%', height: '30%', transform: 'rotate(-25deg)' }} />}
                {crackLevel >= 3 && <div className="crack" style={{ top: '50%', left: '60%', height: '25%', transform: 'rotate(30deg)' }} />}
                {crackLevel >= 4 && <div className="crack" style={{ top: '10%', left: '55%', height: '25%', transform: 'rotate(-5deg)' }} />}
                {crackLevel >= 5 && <div className="crack" style={{ top: '70%', left: '40%', height: '15%', transform: 'rotate(50deg)' }} />}
                {crackLevel >= 6 && <div className="crack" style={{ top: '30%', left: '20%', height: '20%', transform: 'rotate(15deg)' }} />}
                {crackLevel >= 7 && <div className="crack" style={{ top: '60%', left: '70%', height: '30%', transform: 'rotate(-40deg)' }} />}
                {crackLevel >= 8 && <div className="crack" style={{ top: '5%', left: '40%', height: '15%', transform: 'rotate(5deg)' }} />}
                {crackLevel >= 9 && <div className="crack" style={{ top: '80%', left: '55%', height: '15%', transform: 'rotate(-10deg)' }} />}
                {crackLevel >= CRACKS_TO_BREAK && (
                    <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-yellow-400/20 font-bold text-yellow-300">
                    BREAK IT
                    </div>
                )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
