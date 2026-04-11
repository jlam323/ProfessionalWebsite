import { motion } from "motion/react";
import { Mail, Linkedin } from "lucide-react";
import resumeData from "../data.json";
import { ThemeColors } from "../types";

export function ContactSection({ currentTheme }: { currentTheme: ThemeColors }) {
  return (
    <div className="space-y-16">
      <h2 className="text-3xl lg:text-6xl italic font-black leading-none mb-12 uppercase">CALLING CARD</h2>
      <motion.div 
        animate={{ boxShadow: `12px 12px 0px ${currentTheme.primary}` }}
        className="p5-card bg-p5-black text-white border-none"
      >
        <div className="space-y-8">
          <p className="text-xl italic">
            "{resumeData.contact.quote}"
          </p>
          <motion.div 
            animate={{ backgroundColor: currentTheme.primary }}
            className="h-0.5 w-full opacity-50"
          ></motion.div>
          <div className="space-y-6 font-mono">
            <div className="flex items-center gap-4 group cursor-pointer">
              <motion.div 
                animate={{ backgroundColor: currentTheme.primary }}
                className="w-10 h-10 flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform"
              >
                <Mail size={20} />
              </motion.div>
              <motion.span 
                whileHover={{ color: currentTheme.primary }}
                className="text-lg transition-colors"
              >
                {resumeData.personalInfo.email}
              </motion.span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 bg-white text-p5-black flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                <Linkedin size={20} />
              </div>
              <motion.span 
                whileHover={{ color: currentTheme.primary }}
                className="text-lg transition-colors"
              >
                {resumeData.personalInfo.linkedin}
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 p-4 lg:p-8 border-4 border-p5-black border-dashed transform -rotate-1">
        <p className="text-center font-mono text-xs opacity-50">
          // ENCRYPTION: ACTIVE<br />
          // LOCATION_MASK: ENABLED
        </p>
      </div>
    </div>
  );
}
