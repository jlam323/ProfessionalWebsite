import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import resumeData from "../data.json";
import { SECTIONS } from "../constants";
import { ThemeColors, Section } from "../types";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  currentTheme: ThemeColors;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

export function Sidebar({ activeSection, setActiveSection, currentTheme, isCollapsed, setIsCollapsed }: SidebarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.aside 
      animate={{ 
        width: isDesktop ? (isCollapsed ? "80px" : "25%") : "100%",
        height: isDesktop ? "100%" : (isCollapsed ? "80px" : "auto")
      }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`w-full lg:w-1/4 ${isCollapsed && isDesktop ? 'p-4' : 'p-6 lg:p-12'} flex flex-col justify-between bg-p5-black border-b-8 lg:border-b-0 lg:border-r-8 border-white relative overflow-hidden no-scrollbar transition-colors duration-1000 z-50`}
    >
      {/* Collapse Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex absolute top-4 right-4 lg:top-10 lg:-right-5 z-[60] bg-white text-p5-black p-3 transform -skew-x-12 shadow-[6px_6px_0px_#000] border-2 border-black cursor-pointer items-center justify-center group"
        style={{ backgroundColor: currentTheme.accent }}
      >
        <div className="relative">
          {isCollapsed ? <PanelLeftOpen size={24} /> : <PanelLeftClose size={24} />}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 20 }}
            className="absolute left-full ml-4 bg-black text-white px-2 py-1 text-[10px] font-black italic whitespace-nowrap pointer-events-none border border-white"
          >
            {isCollapsed ? "EXPAND SYSTEM" : "COLLAPSE SYSTEM"}
          </motion.div>
        </div>
      </motion.button>
      {/* Decorative Red Stripe */}
      <motion.div 
        animate={{ backgroundColor: currentTheme.primary }}
        className="absolute -bottom-20 -left-20 w-64 h-64 rotate-45 opacity-50"
      ></motion.div>
      
      
      <div className="relative z-10">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl lg:text-5xl leading-[0.8] mb-4 italic font-black p5-text-shadow">
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
          )}
        </AnimatePresence>

        <nav className={`mt-8 lg:mt-20 flex lg:flex-col flex-wrap gap-4 lg:gap-0 lg:space-y-8 ${isCollapsed ? 'items-center' : ''}`}>
          {!isCollapsed && SECTIONS.map((section: Section, idx: number) => (
            <motion.div
              key={section.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1,
                backgroundColor: activeSection === section.id ? currentTheme.primary : "transparent",
                display: isCollapsed && !isDesktop ? "none" : "flex"
              }}
              style={{
                width: isCollapsed && isDesktop ? "50px" : "auto",
                justifyContent: isCollapsed && isDesktop ? "center" : "flex-start"
              }}
              transition={{ delay: 0.2 + idx * 0.1, type: "spring" }}
              onClick={() => {
                setActiveSection(section.id);
                if (!isDesktop) setIsCollapsed(true);
              }}
              className={`p5-nav-item flex items-center gap-3 lg:gap-6 group ${
                activeSection === section.id 
                  ? "text-white scale-110 -translate-y-2 shadow-[6px_6px_0px_#fff]" 
                  : "text-p5-white hover:p5-red-text hover:translate-x-4"
              } ${isCollapsed && isDesktop ? 'px-0 py-3' : ''}`}
            >
              <section.icon size={28} className={`transform skew-x-12 transition-transform duration-500 lg:size-[28px] ${activeSection === section.id ? 'rotate-[360deg]' : 'group-hover:rotate-12'}`} />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0, x: -10 }}
                    animate={{ opacity: 1, width: "auto", x: 0 }}
                    exit={{ opacity: 0, width: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`overflow-hidden whitespace-nowrap pr-4 ${isDesktop ? "tracking-tighter italic" : "tracking-tighter italic text-sm lg:text-base"}`}
                  >
                    {section.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 lg:mt-12 pt-8 border-t border-white/10 relative z-10"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
