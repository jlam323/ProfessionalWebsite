import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface CutInAnimationProps {
  imageUrl: string;
  isVisible: boolean;
  onComplete: () => void;
  key?: number | string;
}

export function CutInAnimation({ imageUrl, isVisible, onComplete }: CutInAnimationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center lg:items-end justify-center lg:justify-end overflow-hidden">
          <motion.div
            initial={{ x: "100%", opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            animate={{ x: "0%", opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ 
              clipPath: "inset(0% 100% 0% 0%)",
              opacity: 0,
              transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] }
            }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 250,
              mass: 0.8
            }}
            className="absolute inset-0 flex items-center lg:items-end justify-center lg:justify-end"
          >
            {/* Background Strip */}
            <div
              className="absolute top-1/2 lg:top-auto lg:bottom-[8%] -translate-y-1/2 lg:translate-y-0 left-[-10%] right-[-10%] w-[120%] h-[35%] lg:h-[42%] bg-p5-red shadow-[0_0_50px_rgba(211,47,47,0.5)] border-y-8 border-white rotate-[-5deg]"
              style={{ clipPath: "polygon(0 50%, 100% 3%, 100% 85%, 0 90%)" }}
            />

            {/* Secondary Black Strip */}
            <div
              className="absolute top-1/2 lg:top-auto lg:bottom-[6%] -translate-y-1/2 lg:translate-y-0 left-[-10%] right-[-10%] w-[120%] h-[37%] lg:h-[44%] bg-p5-black border-y-8 border-white rotate-[-5deg]"
              style={{ clipPath: "polygon(0 45%, 100% 8%, 100% 90%, 0 80%)" }}
            />

            {/* Character Image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.2,
                delay: 0.1
              }}
              className="relative mb-0 lg:mb-[3%] lg:mr-[5%] h-[40%] aspect-[2/1] lg:h-[50%]"
            >
              <img 
                src={imageUrl} 
                alt="Cut-in" 
                className="w-full h-full object-contain filter drop-shadow-[10px_10px_0px_rgba(0,0,0,0.5)]"
                referrerPolicy="no-referrer"
              />
              
              {/* Impact Lines Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay opacity-50"
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
