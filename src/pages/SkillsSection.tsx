import { motion } from "motion/react";
import { 
  Star, 
  Cloud, 
  Coffee, 
  Atom, 
  Smartphone, 
  Shield, 
  Terminal, 
  Cpu, 
  Hash, 
  Database, 
  Layers, 
  Globe 
} from "lucide-react";
import resumeData from "../data.json";
import { ThemeColors } from "../types";

const iconMap: Record<string, any> = {
  "AWS": Cloud,
  "JAVA": Coffee,
  "REACT JS": Atom,
  "REACT NATIVE": Smartphone,
  "ANGULAR": Shield,
  "PYTHON": Terminal,
  "C++": Terminal,
  "C#": Terminal,
  "SQL/NOSQL": Database,
  "AZURE": Cloud,
  "GOOGLE CLOUD": Cloud
};

export function SkillsSection({ currentTheme }: { currentTheme: ThemeColors }) {
  return (
    <div className="space-y-16">
      <h2 className="text-3xl lg:text-6xl italic font-black leading-none mb-12 uppercase">SKILLS</h2>
      <div className="flex flex-wrap gap-4">
        {resumeData.skills.languages.map((skill, idx) => {
          const Icon = iconMap[skill] || Star;
          return (
            <motion.div
              key={skill}
              animate={{ borderBottomColor: currentTheme.primary }}
              whileHover={{ 
                scale: 1.1, 
                rotate: idx % 2 === 0 ? 5 : -5,
                backgroundColor: currentTheme.primary,
                color: "#fff"
              }}
              className="bg-p5-black text-white px-6 py-3 text-base font-display transform -skew-x-12 border-b-4 cursor-default transition-colors flex items-center gap-3"
            >
              <Icon size={20} />
              {skill}
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-24 relative">
        <div className="absolute inset-0 bg-p5-black transform -skew-y-1 -z-10"></div>
        <div className="p-6 lg:p-12 text-white">
          <motion.h3 
            animate={{ decorationColor: currentTheme.primary }}
            className="text-4xl mb-8 italic underline underline-offset-8"
          >
            SPECIALTIES
          </motion.h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm">
            {resumeData.skills.specialties.map((s, i) => (
              <li key={i} className="flex items-center gap-4 group">
                <Star size={14} style={{ color: currentTheme.primary }} className="group-hover:rotate-180 transition-transform" />
                <motion.span whileHover={{ color: currentTheme.primary }} className="transition-colors">{s}</motion.span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
