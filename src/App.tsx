import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { AnimStyle } from "./types";
import { THEME_COLORS } from "./constants";

// Components
import { BootScreen } from "./components/BootScreen";
import { Sidebar } from "./navigation/Sidebar";
import { CustomCursor } from "./components/CustomCursor";
import { TickerTape } from "./components/TickerTape";

// Sections
import { HomeSection } from "./pages/HomeSection";
import { AboutSection } from "./pages/AboutSection";
import { ExperienceSection } from "./pages/ExperienceSection";
import { ProjectsSection } from "./pages/ProjectsSection";
import { AwardsSection } from "./pages/AwardsSection";
import { SkillsSection } from "./pages/SkillsSection";
import { ContactSection } from "./pages/ContactSection";

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animStyle, setAnimStyle] = useState<AnimStyle>("phantom");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const currentTheme = THEME_COLORS[animStyle];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  if (isBooting) {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  return (
    <div 
      className="min-h-screen bg-p5-black text-p5-white selection:text-white cursor-none scanlines transition-colors duration-1000"
      style={{ 
        ["--selection-bg" as any]: currentTheme.primary,
        ["--color-p5-red" as any]: currentTheme.primary,
        ["--color-p5-gold" as any]: currentTheme.accent,
        ["--theme-primary" as any]: currentTheme.primary,
        ["--theme-secondary" as any]: currentTheme.secondary,
        ["--theme-accent" as any]: currentTheme.accent,
      } as any}
    >
      <style>{`
        ::selection {
          background-color: ${currentTheme.primary};
          color: white;
        }
        .p5-nav-item.active {
          background-color: ${currentTheme.primary} !important;
        }
        .p5-red-text {
          color: ${currentTheme.primary} !important;
        }
        .p5-red-bg {
          background-color: ${currentTheme.primary} !important;
        }
        .p5-border-red {
          border-color: ${currentTheme.primary} !important;
        }
      `}</style>
      
      <CustomCursor mousePos={mousePos} currentTheme={currentTheme} />

      {/* Background Noise/Stars Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row h-screen overflow-hidden">
        
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          currentTheme={currentTheme} 
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* Right Side: Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-24 bg-white text-p5-black relative">
          {/* Dynamic Background Elements */}
          <motion.div 
            animate={{ backgroundColor: currentTheme.primary }}
            className="hidden lg:block fixed top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none transform skew-x-12 translate-x-1/4"
          ></motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ x: 100, opacity: 0, skewX: 10 }}
              animate={{ x: 0, opacity: 1, skewX: 0 }}
              exit={{ x: -100, opacity: 0, skewX: -10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10 max-w-5xl mx-auto"
            >
              {activeSection === "home" && <HomeSection animStyle={animStyle} setAnimStyle={setAnimStyle} currentTheme={currentTheme} />}
              {activeSection === "about" && <AboutSection currentTheme={currentTheme} />}
              {activeSection === "experience" && <ExperienceSection currentTheme={currentTheme} />}
              {activeSection === "projects" && <ProjectsSection currentTheme={currentTheme} />}
              {activeSection === "awards" && <AwardsSection currentTheme={currentTheme} />}
              {activeSection === "skills" && <SkillsSection currentTheme={currentTheme} />}
              {activeSection === "contact" && <ContactSection currentTheme={currentTheme} />}
            </motion.div>
          </AnimatePresence>

          {/* Floating Decorative Text */}
          <div className="hidden lg:block fixed bottom-8 right-8 pointer-events-none select-none opacity-5 font-display text-9xl rotate-90 origin-bottom-right">
            TAKE YOUR HEART
          </div>
        </main>
      </div>

      <TickerTape currentTheme={currentTheme} />
    </div>
  );
}
