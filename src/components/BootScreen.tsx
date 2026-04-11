import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useBlink } from "../hooks/useBlink";
import p5Background from "../assets/p5 background.png";

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const blink = useBlink(400);
  const lines = [
    "COFFEE CUP FILLED",
    "COGNITIVE SCAN OK",
    "METAVERSE CALIBRATED",
    "PERSONA SYSTEM v5.0 LOADED",
    "ONLINE - BEGINNING DIVE..."
  ];

  useEffect(() => {
    const timings = [0, 350, 700, 1050, 1400];
    const timers = timings.map((ms, i) => {
      return setTimeout(() => setStep(i + 1), ms);
    });
    
    const finalTimer = setTimeout(onComplete, 2500);
    
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
  }, [onComplete]);

  return (
    <div className="bg-black h-screen flex flex-col justify-center px-16 lg:px-32 relative overflow-hidden">
      {/* Background image fade-in */}
      <motion.img 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        src={p5Background} 
        alt="" 
        className="absolute top-0 right-0 h-full w-auto object-cover pointer-events-none z-0 "
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
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "linear" }}
          className="h-full bg-p5-red"
        />
      </div>
    </div>
  );
}
