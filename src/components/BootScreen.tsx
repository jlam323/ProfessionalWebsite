import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useBlink } from "../hooks/useBlink";
import p5Background from "../assets/p5 background.png";

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const blink = useBlink(400);
  
  const lines = [
    "COFFEE CUP FILLED",
    "COGNITIVE SCAN OK",
    "METAVERSE CALIBRATED",
    `PERSONA SYSTEM v5.0 LOADED (${Math.round((loadedCount / 27) * 100)}%)`,
    "ONLINE - BEGINNING DIVE..."
  ];

  // Handle step animations
  useEffect(() => {
    const timings = [0, 300, 600, 900];
    const timers = timings.map((ms, i) => {
      return setTimeout(() => setStep(i + 1), ms);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Handle asset preloading
  useEffect(() => {
    let count = 0;
    const total = 27;
    
    const preloadImages = async () => {
      const promises = Array.from({ length: total }, (_, i) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = new URL(`../assets/cut-in-${i + 1}.webp`, import.meta.url).href;
          const finish = () => {
            count++;
            setLoadedCount(count);
            resolve(null);
          };
          img.onload = finish;
          img.onerror = finish;
        });
      });
      await Promise.all(promises);
    };

    preloadImages();
  }, []);

  // Check for completion
  useEffect(() => {
    if (step === 4 && loadedCount >= 27) {
      const nextStepTimer = setTimeout(() => setStep(5), 500);
      return () => clearTimeout(nextStepTimer);
    }
    if (step === 5) {
      const finalTimer = setTimeout(onComplete, 1000);
      return () => clearTimeout(finalTimer);
    }
  }, [loadedCount, step, onComplete]);

  return (
    <div className="bg-black h-screen flex flex-col justify-center px-16 lg:px-32 relative overflow-hidden">
      {/* Background image fade-in */}
      <motion.img 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.75, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        src={p5Background} 
        alt="" 
        className="hidden lg:block absolute top-0 right-0 h-full w-auto object-cover pointer-events-none z-0 origin-right"
        referrerPolicy="no-referrer"
      />

      {/* Background glitch effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none scanlines"></div>
      
      <div className="relative z-10 space-y-4">
        {lines.map((l, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-6 transition-opacity duration-300 ${i < step ? "opacity-100" : "opacity-0"}`}
          >
            <div 
              className={`w-1 h-6 transform -skew-x-12 transition-colors duration-300 ${
                i < step - 1 ? "bg-gray-800" : "bg-p5-red"
              }`} 
            />
            <span 
              className={`font-display font-bold text-sm lg:text-lg tracking-[0.2em] transform -skew-x-6 transition-colors duration-300 flex items-center gap-2 ${
                i < step - 1 ? "text-gray-800" : "text-white"
              }`}
            >
              <span className="w-6 inline-block">
                {i < step - 1 ? "✓ " : (i === step - 1 ? (blink ? "▶ " : "  ") : "")}
              </span>
              {l}
            </span>
          </div>
        ))}
      </div>

      {/* Loading progress bar at bottom */}
      <div className="absolute bottom-16 left-16 right-16 h-1 bg-gray-900 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(step / lines.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-p5-red"
        />
      </div>
    </div>
  );
}
