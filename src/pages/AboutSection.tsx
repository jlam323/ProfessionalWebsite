import { motion } from "motion/react";
import resumeData from "../data.json";
import { ThemeColors } from "../types";

export function AboutSection({ currentTheme }: { currentTheme: ThemeColors }) {
  return (
    <div className="space-y-16">
      <div className="relative">
        <h2 className="text-6xl lg:text-7xl italic font-black leading-none mb-4 uppercase">ABOUT ME</h2>
        <motion.div 
          animate={{ borderColor: currentTheme.primary }}
          className="absolute -top-4 -left-4 w-full h-full border-4 -z-10 transform -rotate-1"
        ></motion.div>
      </div>
      
      <motion.div 
        animate={{ borderLeftColor: currentTheme.primary }}
        className="p5-card border-l-[12px]"
      >
        <p className="text-lg lg:text-xl leading-relaxed font-medium whitespace-pre-wrap">
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
          whileHover={{ scale: 1.02, rotate: -1 }}
          animate={{ boxShadow: `8px 8px 0px ${currentTheme.primary}` }}
          className="bg-p5-black text-white p-6 transform -skew-x-3"
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
          whileHover={{ scale: 1.02, rotate: 1 }}
          animate={{ backgroundColor: currentTheme.primary }}
          className="text-white p-6 transform skew-x-3 shadow-[8px_8px_0px_#000]"
        >
          <h3 className="text-xl mb-4 border-b-2 border-white inline-block">STATUS</h3>
          <p className="font-mono text-base uppercase tracking-tighter">{resumeData.personalInfo.status}</p>
        </motion.div>
      </div>
    </div>
  );
}
