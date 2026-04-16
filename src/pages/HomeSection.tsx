import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";
import { AnimStyle, ThemeColors } from "../types";
import { PhantomAnimation } from "../components/animations/PhantomAnimation";
import { VelvetAnimation } from "../components/animations/VelvetAnimation";
import { MementosAnimation } from "../components/animations/MementosAnimation";
import { RebellionAnimation } from "../components/animations/RebellionAnimation";
import { ConfidantAnimation } from "../components/animations/ConfidantAnimation";
import { CognitiveAnimation } from "../components/animations/CognitiveAnimation";
import { ShowtimeAnimation } from "../components/animations/ShowtimeAnimation";
import { HOME_ANIMATIONS } from "../constants";

interface HomeSectionProps {
  animStyle: AnimStyle;
  setAnimStyle: (s: AnimStyle) => void;
  currentTheme: ThemeColors;
}

export function HomeSection({ animStyle, setAnimStyle, currentTheme }: HomeSectionProps) {
  const [isHoveringPrompt, setIsHoveringPrompt] = useState(false);

  const currentDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric'
  }).format(new Date()).toUpperCase();

  return (
    <div className="h-full flex flex-col items-center justify-center relative py-12">
      {/* Style Switcher */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex flex-wrap justify-center gap-4 max-w-4xl">
        {HOME_ANIMATIONS.map((style) => (
          <button
            key={style.id}
            onClick={() => setAnimStyle(style.id as AnimStyle)}
            className={`px-3 py-1 font-display font-black italic text-[9px] tracking-widest transform -skew-x-12 transition-all border-2 ${
              animStyle === style.id 
                ? "text-white border-white scale-110 shadow-[4px_4px_0px_#000]" 
                : "bg-white text-p5-black border-p5-black hover:bg-gray-100"
            }`}
            style={{ backgroundColor: animStyle === style.id ? style.color : undefined }}
          >
            {style.label}
          </button>
        ))}
      </div>

      {/* Central Animation Container */}
      <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
        
        <AnimatePresence mode="wait">
          {animStyle === "phantom" && <PhantomAnimation />}
          {animStyle === "velvet" && <VelvetAnimation />}
          {animStyle === "mementos" && <MementosAnimation />}
          {animStyle === "rebellion" && <RebellionAnimation />}
          {animStyle === "confidant" && <ConfidantAnimation />}
          {animStyle === "cognitive" && <CognitiveAnimation />}
          {animStyle === "showtime" && <ShowtimeAnimation />}
        </AnimatePresence>

        {/* The "Core" - Always visible but reacts to style */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          onMouseEnter={() => setIsHoveringPrompt(true)}
          onMouseLeave={() => setIsHoveringPrompt(false)}
          animate={{ 
            scale: 1, 
            rotate: (animStyle === "velvet" || animStyle === "confidant") ? 0 : -12,
            backgroundColor: currentTheme.primary
          }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="relative z-10 p-12 shadow-[15px_15px_0px_#000] group cursor-default"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: (animStyle === "velvet" || animStyle === "confidant") ? [0, 2, 0] : [-12, -10, -12]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Star className="text-white fill-current mb-4 w-12 h-12 lg:w-20 lg:h-20" />
            <h2 className="text-4xl lg:text-6xl font-black italic text-white leading-none p5-text-shadow uppercase">
              {animStyle === "velvet" ? "VELVET" : 
               animStyle === "mementos" ? "MEMENTOS" :
               animStyle === "rebellion" ? "REBELLION" :
               animStyle === "confidant" ? "CONFIDANT" :
               animStyle === "cognitive" ? "COGNITIVE" :
               "MISSION"}<br />
              {animStyle === "velvet" ? "ROOM" : 
               animStyle === "mementos" ? "DEPTHS" :
               animStyle === "rebellion" ? "AWAKEN" :
               animStyle === "confidant" ? "RANK UP" :
               animStyle === "cognitive" ? "DISTORT" :
               "START"}
            </h2>
          </motion.div>

          {/* Floating Prompt Text */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-max cursor-help"
          >
            <AnimatePresence>
              {isHoveringPrompt && (
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.5 }}
                  className="hidden lg:block absolute -left-48 top-[-280px] pointer-events-none z-50"
                >
                  <div className="relative">
                    <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d="M0 30L40 5V20H100V40H40V55L0 30Z" 
                        fill="black" 
                      />
                      <path 
                        d="M5 30L45 10V25H95V35H45V50L5 30Z" 
                        fill={currentTheme.primary} 
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [-12, -8, -12] }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                      className="absolute -top-6 -left-4 bg-white text-black font-display font-black italic px-2 py-0.5 text-[10px] border-2 border-black shadow-[3px_3px_0px_#000]"
                    >
                      !!!
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`text-white px-4 py-1 lg:px-6 lg:py-2 font-display font-black italic tracking-widest transform -skew-x-12 shadow-[4px_4px_0px_#FFD700] ${
              animStyle === "velvet" ? "bg-blue-800" : 
              animStyle === "mementos" ? "bg-red-950" :
              animStyle === "rebellion" ? "bg-cyan-900" :
              animStyle === "confidant" ? "bg-amber-900" :
              animStyle === "cognitive" ? "bg-purple-900" :
              "bg-p5-black"
            }`}>
              <div className="text-[10px] lg:text-xs">SELECT YOUR INFILTRATION POINT</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Floating Text */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/4 left-0 font-display text-4xl font-black italic opacity-10 -rotate-12"
          >
            WELCOME TO PERSONA
          </motion.div>
          <motion.div
            animate={{ x: [75, -75, 75], y: [75, -75, 75] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-1/4 right-0 font-display text-4xl font-black italic opacity-10 rotate-12"
          >
            READY TO DIVE
          </motion.div>
        </div>

        {/* Exploding Stars */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`star-pop-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: (Math.random() - 0.5) * 600,
              y: (Math.random() - 0.5) * 600,
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "circOut"
            }}
            className={`absolute ${animStyle === "velvet" ? "text-blue-400" : "text-p5-gold"}`}
          >
            <Star size={24} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Bottom Status Bar */}
      <div className={`mt-24 w-full max-w-4xl flex justify-between items-end border-b-4 pb-4 transition-colors duration-500 ${
        animStyle === "velvet" ? "border-blue-600" : 
        animStyle === "mementos" ? "border-red-900" :
        animStyle === "rebellion" ? "border-cyan-500" :
        animStyle === "confidant" ? "border-amber-600" :
        animStyle === "cognitive" ? "border-purple-600" :
        "border-p5-black"
      }`}>
        <div className="flex gap-8">
          <div>
            <p className="font-mono text-[10px] opacity-50 uppercase">System Status</p>
            <p className={`font-display font-black italic ${
              animStyle === "velvet" ? "text-blue-600" : 
              animStyle === "mementos" ? "text-red-600" :
              animStyle === "rebellion" ? "text-cyan-500" :
              animStyle === "confidant" ? "text-amber-600" :
              animStyle === "cognitive" ? "text-purple-600" :
              "text-p5-red"
            }`}>OPTIMIZED</p>
          </div>
          <div>
            <p className="font-mono text-[10px] opacity-50 uppercase">Cognitive Load</p>
            <p className={`font-display font-black italic ${
              animStyle === "velvet" ? "text-blue-600" : 
              animStyle === "mementos" ? "text-red-600" :
              animStyle === "rebellion" ? "text-cyan-500" :
              animStyle === "confidant" ? "text-amber-600" :
              animStyle === "cognitive" ? "text-purple-600" :
              "text-p5-red"
            }`}>LOW</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] opacity-50 uppercase">Current Date</p>
          <p className="font-display font-black italic text-2xl">{currentDate}</p>
        </div>
      </div>
    </div>
  );
}
