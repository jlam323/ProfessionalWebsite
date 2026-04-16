import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";
import resumeData from "../data.json";
import { ThemeColors } from "../types";

export function ExperienceSection({ currentTheme }: { currentTheme: ThemeColors }) {
  const [activeExp, setActiveExp] = useState(0);
  const experiences = resumeData.experience;
  const job = experiences[activeExp];

  return (
    <div className="flex flex-col h-full space-y-12">
      <div className="relative">
        <h2 className="text-3xl lg:text-6xl italic font-black leading-none mb-12 uppercase">EXPERIENCE</h2>
        <motion.div 
          animate={{ backgroundColor: currentTheme.primary }}
          className="absolute -bottom-2 left-0 w-32 h-2 transform -skew-x-12"
        ></motion.div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-0 flex-1 min-h-0">
        {/* Role selector — slanted tabs */}
        <div className="w-full md:w-[220px] flex-shrink-0 flex md:flex-col gap-3 p-2 md:pr-6 overflow-x-auto md:overflow-x-visible no-scrollbar">
          {experiences.map((exp, idx) => (
            <button
              key={idx}
              onClick={() => setActiveExp(idx)}
              className={`px-4 py-3 lg:px-6 lg:py-4 transition-all relative cursor-pointer transform -skew-x-12 border-l-[12px] text-left group ${
                activeExp === idx 
                  ? "border-white shadow-[8px_8px_0px_#000] z-10" 
                  : "bg-p5-black border-p5-gray opacity-60 hover:opacity-100"
              }`}
              style={{ backgroundColor: activeExp === idx ? currentTheme.primary : undefined }}
            >
              {activeExp === idx && (
                <motion.div 
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" 
                />
              )}
              <div className={`font-display text-base font-black tracking-tighter transform skew-x-12 leading-none transition-colors ${activeExp === idx ? "text-white" : "text-gray-500"}`}>
                {exp.company}
              </div>
              <div className={`font-mono text-[11px] mt-2 transform skew-x-12 font-bold ${activeExp === idx ? "text-white" : "text-gray-600"}`}>
                {exp.period}
              </div>
              
              {/* Decorative star for active tab */}
              {activeExp === idx && (
                <div 
                  className="absolute -right-2 -top-2 p-1 transform rotate-12 shadow-sm"
                  style={{ backgroundColor: currentTheme.accent }}
                >
                  <Star size={10} className="fill-p5-black text-p5-black" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="flex-1 md:pl-8 mt-8 md:mt-0 overflow-y-auto no-scrollbar relative">
          {/* Decorative background element */}
          <motion.div 
            animate={{ backgroundColor: currentTheme.primary }}
            className="absolute top-0 right-0 w-64 h-64 opacity-5 -z-10 transform rotate-12 translate-x-32 -translate-y-16"
          ></motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  animate={{ 
                    backgroundColor: currentTheme.secondary === "#000000" ? "#000" : currentTheme.primary, 
                    borderBottomColor: currentTheme.primary,
                    boxShadow: `4px 4px 0px ${currentTheme.primary}4D` // 4D is approx 30% opacity
                  }}
                  className="text-white px-4 py-1 font-display text-xs font-black tracking-widest transform -skew-x-12 border-b-4"
                >
                  {job.location || ""}
                </motion.div>
                <motion.div 
                  animate={{ backgroundImage: `linear-gradient(to right, ${currentTheme.primary}, transparent)` }}
                  className="h-px flex-1"
                ></motion.div>
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl lg:text-4xl font-black italic transform -skew-x-6 p5-text-shadow-tight leading-[0.9] mb-4">
                  {job.org}
                </h3>
                <motion.div 
                  animate={{ 
                    backgroundColor: currentTheme.primary, 
                    color: "white",
                    boxShadow: `4px 4px 0px #000`
                  }}
                  className="inline-block px-4 py-2 transform -skew-x-12 font-display text-sm lg:text-base font-black tracking-tighter"
                >
                  {job.role}
                </motion.div>
              </div>

              <div className="font-mono text-sm font-bold tracking-widest flex items-center gap-3">
                <motion.div 
                  animate={{ backgroundColor: currentTheme.primary }}
                  className="w-8 h-0.5"
                ></motion.div>
                <motion.span animate={{ color: currentTheme.primary }}>{job.period}</motion.span>
              </div>

              <motion.div 
                animate={{ borderLeftColor: currentTheme.primary }}
                className="space-y-4 bg-white/5 p-6 border-l-4 relative overflow-hidden"
              >
                {/* Halftone-like decorative pattern */}
                <motion.div 
                  animate={{ backgroundImage: `radial-gradient(${currentTheme.primary} 1px,transparent 1px)` }}
                  className="absolute inset-0 opacity-5 pointer-events-none [background-size:8px_8px]"
                ></motion.div>
                
                {job.bullets.map((bullet, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <div className="relative">
                        <motion.div 
                          animate={{ backgroundColor: currentTheme.primary }}
                          className="w-6 h-6 transform -skew-x-12 flex items-center justify-center shadow-[3px_3px_0px_#000]"
                        >
                          <Star size={14} className="fill-white text-white" />
                        </motion.div>
                      </div>
                    </div>
                    <p className="font-mono text-sm text-p5-black font-bold leading-relaxed bg-p5-white/90 p-2 transform -skew-x-1 shadow-[4px_4px_0px_#000] w-full">
                      {bullet}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex flex-wrap gap-4 mt-8">
                {job.tags.map((tag, i) => (
                  <motion.span 
                    key={tag} 
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1, 
                      boxShadow: `4px 4px 0px ${currentTheme.accent}`,
                      transition: { delay: 0.5 + i * 0.05 }
                    }}
                    whileHover={{ 
                      backgroundColor: currentTheme.primary,
                      transition: { delay: 0, duration: 0.2 }
                    }}
                    className="font-display text-xs font-black text-white bg-p5-black px-4 py-2 transform -skew-x-12 tracking-widest transition-colors cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
