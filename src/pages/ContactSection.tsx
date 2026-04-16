import { motion } from "motion/react";
import { Mail, Linkedin, Send } from "lucide-react";
import resumeData from "../data.json";
import { ThemeColors } from "../types";

export function ContactSection({ currentTheme }: { currentTheme: ThemeColors }) {
  return (
    <div className="space-y-16">
      <h2 className="text-3xl lg:text-6xl italic font-black leading-none mb-12 uppercase">CALLING CARD</h2>
      
      {/*
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
      */}

      <motion.div 
        initial={{ rotate: 5, scale: 0.9, opacity: 0 }}
        animate={{ rotate: -2, scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 10 }}
        className="relative max-w-4xl mx-auto"
      >
        {/* The Card Background */}
        <motion.div 
          animate={{ backgroundColor: currentTheme.primary }}
          className="p-8 lg:p-16 shadow-[20px_20px_0px_#000] relative overflow-hidden p5-jagged"
        >
          {/* Halftone Pattern Overlay */}
          <div className="absolute inset-0 p5-halftone opacity-20 pointer-events-none"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rotate-45 translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-48 h-12 bg-p5-black/20 -skew-x-12 -translate-x-12 translate-y-6"></div>

          <div className="relative z-10 space-y-12">
            <div className="flex items-start gap-6">
              <div className="bg-p5-black text-white p-4 transform -rotate-12 shadow-[4px_4px_0px_#fff]">
                <Send size={28} />
              </div>
              <div className="flex-1">
                <p className="text-lg lg:text-xl font-black italic text-white leading-tight p5-text-shadow uppercase">
                  "{resumeData.contact.quote}"
                </p>
                <div className="mt-4 h-1 w-32 bg-white transform -skew-x-12"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.a
                href={`mailto:${resumeData.personalInfo.email}`}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-6 group bg-p5-black p-6 transform -skew-x-6 border-2 border-transparent hover:border-white transition-all"
              >
                <div className="w-12 h-12 bg-white text-p5-black flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                  <Mail size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Direct Line</span>
                  <span className="text-white font-display font-black italic text-sm lg:text-base break-all">
                    {resumeData.personalInfo.email}
                  </span>
                </div>
              </motion.a>

              <motion.a
                href={resumeData.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-6 group bg-white p-6 transform skew-x-6 border-2 border-transparent hover:border-p5-black transition-all"
              >
                <div className="w-12 h-12 bg-p5-black text-white flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform">
                  <Linkedin size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-p5-black/50 uppercase tracking-widest">Network Link</span>
                  <span className="text-p5-black font-display font-black italic text-lg lg:text-xl break-all">
                    LinkedIn Profile
                  </span>
                </div>
              </motion.a>
            </div>

            <div className="pt-6 flex justify-end items-end">
              <div className="font-display font-black italic text-white/30 text-2xl lg:text-3xl select-none">
                SEE YOU SPACE COWBOY...
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative "Tape" elements */}
        <div className="absolute -top-4 left-1/4 w-32 h-8 bg-white/20 backdrop-blur-sm transform -rotate-12 -z-10"></div>
        <div className="absolute -bottom-4 right-1/4 w-40 h-10 bg-p5-black/10 transform rotate-6 -z-10"></div>
      </motion.div>

      <div className="mt-4 p-4 lg:p-8 border-4 border-p5-gray border-dashed transform -rotate-1 opacity-75">
        <p className="text-center font-mono text-xs opacity-50">
          // ENCRYPTION: ACTIVE<br />
          // LOCATION_MASK: ENABLED
        </p>
      </div>
    </div>
  );
}
