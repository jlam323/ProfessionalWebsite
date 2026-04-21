import { motion } from "motion/react";
import { useState } from "react";
import resumeData from "../data.json";
import { ThemeColors } from "../types";

export function AboutSection({ currentTheme }: { currentTheme: ThemeColors }) {
  const [isBugged, setIsBugged] = useState(false);

  return (
    <div className="space-y-16">
      <motion.div 
        animate={isBugged ? { 
          x: [-2, 5, -3, 2], 
          y: [-1, 2, 4, -5],
          rotate: [0, -2, 3, -1],
          transition: { repeat: Infinity, duration: 1 } 
        } : { x: 0, y: 0, rotate: 0 }}
        className="relative"
      >
        <h2 className="text-3xl lg:text-6xl italic font-black leading-none mb-4 uppercase">ABOUT ME</h2>
        <motion.div 
          animate={{ borderColor: currentTheme.primary }}
          className="absolute -top-4 -left-4 w-full h-full border-4 -z-10 transform -rotate-1"
        ></motion.div>
      </motion.div>
      
      <motion.div 
        animate={isBugged ? { 
          rotate: [0, 75, 30, 65, 40, 55, 50],
          y: [0, 0, 0, 0, 0, 200, 1000],
          opacity: [1, 1, 1, 1, 1, 0.8, 0],
          transition: { 
            duration: 2, 
            times: [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2], 
          } 
        } : { 
          borderLeftColor: currentTheme.primary,
          x: 0, skewX: 0, rotate: 0, filter: "none", y: 0, opacity: 1
        }}
        style={{ transformOrigin: "top left" }}
        className="p5-card border-l-[12px]"
      >
        <p className="text-sm lg:text-base leading-relaxed font-medium whitespace-pre-wrap">
          {resumeData.about.summary.split(resumeData.personalInfo.role)[0]}
          {resumeData.about.summary.includes(resumeData.personalInfo.role) && (
            <motion.span 
              animate={{ backgroundColor: currentTheme.secondary === "#000000" ? "#000" : currentTheme.primary }}
              className="text-white px-2 italic"
            >
              {resumeData.personalInfo.role}
            </motion.span>
          )}
          {resumeData.about.summary.split(resumeData.personalInfo.role)[1]}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          animate={isBugged ? { 
            x: -20, 
            y: 50, 
            rotate: 15,
            transition: { type: "spring", stiffness: 500 } 
          } : { 
            boxShadow: `8px 8px 0px ${currentTheme.primary}`,
            x: 0, y: 0, rotate: -1
          }}
          whileHover={!isBugged ? { scale: 1.02, rotate: -1 } : {}}
          className="bg-p5-black text-white p-4 lg:p-6 transform"
        >
          <motion.h3 
            animate={{ borderBottomColor: currentTheme.primary }}
            className="text-xl mb-4 border-b-2 inline-block"
          >
            LOCATION
          </motion.h3>
          <p className="font-mono text-base">{resumeData.personalInfo.location}</p>
        </motion.div>
        <motion.div 
          onMouseEnter={() => setIsBugged(true)}
          onMouseLeave={() => setIsBugged(false)}
          whileHover={{ scale: 1.05, rotate: 2 }}
          animate={{ 
            backgroundColor: currentTheme.primary,
            scale: isBugged ? 1.1 : 1
          }}
          className="text-white p-4 lg:p-6 transform skew-x-3 shadow-[8px_8px_0px_#000] cursor-help z-50 relative"
        >
          <h3 className="text-xl mb-4 border-b-2 border-white inline-block">STATUS</h3>
          <p className="font-mono text-base uppercase tracking-tighter">{resumeData.personalInfo.status}</p>
          {!isBugged && (
            <div className="absolute bottom-2 right-4 text-[12px] opacity-60 font-mono italic">
              [HOVER TO DEBUG]
            </div>
          )}
          {isBugged && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-8 left-0 text-[10px] bg-red-600 text-white px-1 font-mono animate-pulse"
            >
              FATAL ERROR [0X5DE_P5]
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="relative">
        <motion.div 
          animate={isBugged ? { 
            y: -100, 
            x: 40,
            rotate: -10,
            transition: { duration: 0.2 } 
          } : { 
            borderRightColor: currentTheme.primary,
            y: 0, x: 0, rotate: 0
          }}
          whileHover={!isBugged ? { skewY: -0.5 } : {}}
          className="p5-card border-r-[12px] relative overflow-hidden"
        >
          <motion.div 
            animate={{ backgroundColor: currentTheme.primary }}
            className="absolute top-0 right-0 w-24 h-24 rotate-45 translate-x-12 -translate-y-12"
          ></motion.div>
          <div className="relative z-10 space-y-8 p-4">
            <div>
              <h3 className="text-2xl lg:text-3xl">EDUCATION - {resumeData.education.degree}</h3>
              <motion.p animate={{ color: currentTheme.primary }} className="text-lg font-black mt-2">{resumeData.education.school}</motion.p>
              <div className="flex flex-wrap gap-2 mt-1">
                <p className="font-mono text-xs bg-p5-black text-white inline-block px-3">{resumeData.education.class}</p>
                <p className="font-mono text-xs border-2 border-p5-black text-p5-black inline-block px-3 italic">{resumeData.education.location}</p>
              </div>
            </div>
            <div className="h-0.5 bg-p5-black/10 w-full"></div>
            <p className="text-sm italic text-p5-black font-medium leading-relaxed max-w-xl">
              {resumeData.education.desc}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
