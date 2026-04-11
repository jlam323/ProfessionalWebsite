import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import resumeData from "../data.json";
import { SECTIONS } from "../constants";
import { ThemeColors, Section } from "../types";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  currentTheme: ThemeColors;
}

export function Sidebar({ activeSection, setActiveSection, currentTheme }: SidebarProps) {
  return (
    <aside className="w-full lg:w-1/4 p-12 flex flex-col justify-between bg-p5-black border-r-8 border-white lg:h-full relative overflow-y-auto no-scrollbar transition-colors duration-1000">
      {/* Decorative Red Stripe */}
      <motion.div 
        animate={{ backgroundColor: currentTheme.primary }}
        className="absolute -bottom-20 -left-20 w-64 h-64 rotate-45 opacity-50"
      ></motion.div>
      
      <div className="relative z-10">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-5xl lg:text-6xl leading-[0.8] mb-4 italic font-black p5-text-shadow">
            {resumeData.personalInfo.firstName}<br />
            <motion.span 
              animate={{ color: currentTheme.primary }}
              className="bg-white px-3 inline-block transform -skew-x-12 mt-2 p5-text-shadow-white shadow-[8px_8px_0px_#000]"
            >
              {resumeData.personalInfo.lastName}
            </motion.span>
          </h1>
          <div className="flex items-center gap-4 mt-6">
            <motion.div 
              animate={{ backgroundColor: currentTheme.primary }}
              className="w-12 h-0.5"
            ></motion.div>
            <p className="font-mono text-[10px] tracking-widest opacity-70 uppercase">
              {resumeData.personalInfo.role}
            </p>
          </div>
        </motion.div>

        <nav className="mt-20 space-y-4">
          {SECTIONS.map((section: Section, idx: number) => (
            <motion.div
              key={section.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1,
                backgroundColor: activeSection === section.id ? currentTheme.primary : "transparent"
              }}
              transition={{ delay: 0.2 + idx * 0.1, type: "spring" }}
              onClick={() => setActiveSection(section.id)}
              className={`p5-nav-item flex items-center gap-6 group ${
                activeSection === section.id 
                  ? "text-white scale-110 -translate-y-2 shadow-[6px_6px_0px_#fff]" 
                  : "text-p5-white hover:p5-red-text hover:translate-x-4"
              }`}
            >
              <section.icon size={28} className={`transform skew-x-12 transition-transform duration-500 ${activeSection === section.id ? 'rotate-[360deg]' : 'group-hover:rotate-12'}`} />
              <span className="tracking-tighter italic">{section.label}</span>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
        <div className="flex gap-6">
          {[
            { Icon: Github, href: resumeData.personalInfo.github },
            { Icon: Linkedin, href: resumeData.personalInfo.linkedin },
            { Icon: Mail, href: `mailto:${resumeData.personalInfo.email}` }
          ].map(({ Icon, href }, i) => (
            <motion.a 
              key={i}
              href={href} 
              whileHover={{ scale: 1.3, rotate: 12, color: currentTheme.primary }}
              className="text-white transition-colors"
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </div>
        <p className="font-mono text-[8px] mt-4 opacity-30 tracking-widest">
          SYSTEM_ID: PHANTOM_THIEF_01
        </p>
      </div>
    </aside>
  );
}
