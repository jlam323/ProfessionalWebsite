import { motion } from "motion/react";
import { Star } from "lucide-react";
import resumeData from "../data.json";
import { ThemeColors } from "../types";

export function AwardsSection({ currentTheme }: { currentTheme: ThemeColors }) {
  return (
    <div className="space-y-16">
      <h2 className="text-6xl lg:text-7xl italic font-black leading-none mb-12 uppercase">AWARDS & ACHIEVEMENTS</h2>
      <div className="grid grid-cols-1 gap-8">
        {resumeData.awards.map((award, idx) => (
          <motion.div 
            key={idx}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1, borderRightColor: currentTheme.primary }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
            className="p5-card border-r-[12px] group"
          >
            <div className="flex justify-between items-start mb-2">
              <motion.h3 
                whileHover={{ color: currentTheme.primary }}
                className="text-xl lg:text-2xl transition-colors leading-tight"
              >
                {award.title}
              </motion.h3>

              <div 
                className="absolute -right-2 -top-2 p-1 transform rotate-12 shadow-sm font-display font-black text-xs"
                style={{ backgroundColor: currentTheme.accent }}
              >
                {award.year}
              </div>
            </div>
            <p className="text-sm text-p5-black font-medium leading-relaxed opacity-80">{award.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
