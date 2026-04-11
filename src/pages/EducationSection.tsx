import { motion } from "motion/react";
import resumeData from "../data.json";
import { ThemeColors } from "../types";

export function EducationSection({ currentTheme }: { currentTheme: ThemeColors }) {
  return (
    <div className="space-y-16">
      <h2 className="text-6xl lg:text-7xl italic font-black leading-none mb-12 uppercase">STUDY</h2>
      <motion.div 
        whileHover={{ skewY: -0.5 }}
        animate={{ borderRightColor: currentTheme.primary }}
        className="p5-card border-r-[12px] relative overflow-hidden"
      >
        <motion.div 
          animate={{ backgroundColor: currentTheme.primary }}
          className="absolute top-0 right-0 w-24 h-24 rotate-45 translate-x-12 -translate-y-12"
        ></motion.div>
        <div className="relative z-10 space-y-8 p-4">
          <div>
            <h3 className="text-3xl lg:text-4xl">{resumeData.education.degree}</h3>
            <motion.p animate={{ color: currentTheme.primary }} className="text-xl font-black mt-2">{resumeData.education.school}</motion.p>
            <div className="flex flex-wrap gap-2 mt-1">
              <p className="font-mono text-sm bg-p5-black text-white inline-block px-3">{resumeData.education.class}</p>
              <p className="font-mono text-sm border-2 border-p5-black text-p5-black inline-block px-3 italic">{resumeData.education.location}</p>
            </div>
          </div>
          <div className="h-0.5 bg-p5-black/10 w-full"></div>
          <p className="text-base italic text-p5-black font-medium leading-relaxed max-w-xl">
            {resumeData.education.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
