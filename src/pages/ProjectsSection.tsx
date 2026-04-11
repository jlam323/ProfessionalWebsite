import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import resumeData from "../data.json";
import { ThemeColors } from "../types";

export function ProjectsSection({ currentTheme }: { currentTheme: ThemeColors }) {
  return (
    <div className="space-y-16">
      <h2 className="text-6xl lg:text-7xl italic font-black leading-none mb-12 uppercase">PROJECTS</h2>
      <div className="grid grid-cols-1 gap-12">
        {resumeData.projects.map((project, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 1 : -1 }}
            animate={{ borderLeftColor: currentTheme.primary }}
            className="p5-card border-l-[12px] group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <motion.h3 
                whileHover={{ color: currentTheme.primary }}
                className="text-3xl transition-colors"
              >
                {project.title}
              </motion.h3>
              <motion.div 
                animate={{ backgroundColor: currentTheme.secondary === "#000000" ? "#000" : currentTheme.primary }}
                className="text-white p-2 transform rotate-12"
              >
                <ChevronRight size={20} />
              </motion.div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <motion.span 
                  key={tag} 
                  animate={{ backgroundColor: currentTheme.primary }}
                  className="font-mono text-[10px] text-white px-2 py-0.5 transform -skew-x-12"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <p className="text-base text-p5-black font-medium leading-relaxed">{project.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
