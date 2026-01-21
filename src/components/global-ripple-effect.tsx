'use client';

import { useEffect, useState, useRef } from 'react';
import EasterEgg from './easter-egg';

const CLICK_COUNT_THRESHOLD = 50;
const CLICK_TIME_WINDOW_MS = 10000; // 10 seconds

export default function GlobalRippleEffect() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const timestampsRef = useRef<number[]>([]);
  const isEggActiveRef = useRef(false);

  useEffect(() => {
    isEggActiveRef.current = showEasterEgg;
  }, [showEasterEgg]);

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // Ripple effect logic
      const circle = document.createElement("span");
      const diameter = 40; 
      const radius = diameter / 2;
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - radius}px`;
      circle.style.top = `${event.clientY - radius}px`;
      circle.classList.add("ripple-effect");
      document.body.appendChild(circle);
      const animationDuration = 600;
      setTimeout(() => {
        if (circle.parentElement) {
          circle.remove();
        }
      }, animationDuration);

      // Do not trigger easter egg if clicking inside an active easter egg component
      const targetElement = event.target as HTMLElement;
      if (targetElement.closest('[data-easter-egg="true"]')) {
        return;
      }
      
      if (isEggActiveRef.current) {
        return;
      }

      // Easter egg logic
      const now = Date.now();
      timestampsRef.current = [...timestampsRef.current, now].slice(-CLICK_COUNT_THRESHOLD);
      
      if (timestampsRef.current.length === CLICK_COUNT_THRESHOLD) {
        const timeDiff = timestampsRef.current[CLICK_COUNT_THRESHOLD - 1] - timestampsRef.current[0];
        if (timeDiff < CLICK_TIME_WINDOW_MS) {
          setShowEasterEgg(true);
          timestampsRef.current = []; // Reset
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const handleEggClose = () => {
    setShowEasterEgg(false);
  };
  
  if (showEasterEgg) {
    return <EasterEgg onClose={handleEggClose} />;
  }

  return null;
}
