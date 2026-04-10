import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import resumeData from "./data.json";
import { 
  User, 
  Briefcase, 
  Code2, 
  GraduationCap, 
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  Star,
  Trophy,
  Home,
  Calendar,
  Zap,
  Target
} from "lucide-react";

const SECTIONS = [
  { id: "home", label: "HOME", icon: Home },
  { id: "about", label: "ABOUT", icon: User },
  { id: "experience", label: "EXPERIENCE", icon: Briefcase },
  { id: "projects", label: "PROJECTS", icon: Star },
  { id: "awards", label: "AWARDS", icon: Trophy },
  { id: "skills", label: "SKILLS", icon: Code2 },
  { id: "education", label: "STUDY", icon: GraduationCap },
  { id: "contact", label: "CONTACT", icon: Mail },
];

const TICKER_TEXT = [
  "[INFO] Deploying new ideas...",
  "[SUCCESS] Bug fixed after 3 hours",
  "[WARNING] Overthinking detected",
]

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="min-h-screen bg-p5-black text-p5-white selection:bg-p5-red selection:text-white cursor-none scanlines">
      {/* Custom P5 Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 bg-p5-red z-[9999] pointer-events-none mix-blend-difference"
        animate={{ 
          x: mousePos.x - 16, 
          y: mousePos.y - 16,
          rotate: mousePos.x / 10 
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      >
        <Star className="text-white w-full h-full fill-current" />
      </motion.div>

      {/* Background Noise/Stars Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row h-screen overflow-hidden">
        
        {/* Left Side: Navigation & Hero */}
        <aside className="w-full lg:w-1/4 p-12 flex flex-col justify-between bg-p5-black border-r-8 border-white lg:h-full relative overflow-y-auto no-scrollbar">
          {/* Decorative Red Stripe */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-p5-red rotate-45 opacity-50"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-5xl lg:text-6xl leading-[0.8] mb-4 italic font-black p5-text-shadow">
                {resumeData.personalInfo.firstName}<br />
                <span className="text-p5-red bg-white px-3 inline-block transform -skew-x-12 mt-2 p5-text-shadow-white shadow-[8px_8px_0px_#000]">{resumeData.personalInfo.lastName}</span>
              </h1>
              <div className="flex items-center gap-4 mt-6">
                <div className="w-12 h-0.5 bg-p5-red"></div>
                <p className="font-mono text-[10px] tracking-widest opacity-70 uppercase">
                  {resumeData.personalInfo.role}
                </p>
              </div>
            </motion.div>

            <nav className="mt-20 space-y-4">
              {SECTIONS.map((section, idx) => (
                <motion.div
                  key={section.id}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1, type: "spring" }}
                  onClick={() => setActiveSection(section.id)}
                  className={`p5-nav-item flex items-center gap-6 group ${
                    activeSection === section.id 
                      ? "bg-p5-red text-white scale-110 -translate-y-2 shadow-[6px_6px_0px_#fff]" 
                      : "text-p5-white hover:text-p5-red hover:translate-x-4"
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
                  whileHover={{ scale: 1.3, rotate: 12, color: "#D32F2F" }}
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

        {/* Right Side: Content Area */}
        <main className="flex-1 overflow-y-auto p-12 lg:p-24 bg-white text-p5-black relative">
          {/* Dynamic Background Elements */}
          <div className="fixed top-0 right-0 w-1/2 h-full bg-p5-red/5 pointer-events-none transform skew-x-12 translate-x-1/4"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ x: 100, opacity: 0, skewX: 10 }}
              animate={{ x: 0, opacity: 1, skewX: 0 }}
              exit={{ x: -100, opacity: 0, skewX: -10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10 max-w-3xl mx-auto"
            >
              {activeSection === "home" && <HomeSection />}
              {activeSection === "about" && <AboutSection />}
              {activeSection === "experience" && <ExperienceSection />}
              {activeSection === "projects" && <ProjectsSection />}
              {activeSection === "awards" && <AwardsSection />}
              {activeSection === "skills" && <SkillsSection />}
              {activeSection === "education" && <EducationSection />}
              {activeSection === "contact" && <ContactSection />}
            </motion.div>
          </AnimatePresence>

          {/* Floating Decorative Text */}
          <div className="fixed bottom-8 right-8 pointer-events-none select-none opacity-5 font-display text-9xl rotate-90 origin-bottom-right">
            TAKE YOUR HEART
          </div>
        </main>
      </div>

      {/* Ticker tape */}
      <div className="fixed bottom-0 left-0 w-full h-[22px] bg-[#0e0008] border-t border-[#1e0015] overflow-hidden flex items-center z-[100]">
        <div className="whitespace-nowrap animate-ticker font-display font-bold text-[9px] text-p5-red/30 tracking-[4px] flex">
          {[...TICKER_TEXT, ...TICKER_TEXT, ...TICKER_TEXT].map((s, i) => (
            <span key={i} className="flex items-center">
              <span className="mx-4">◈</span>
              <span>{s}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <div className="space-y-16">
      <h2 className="text-6xl lg:text-7xl italic font-black leading-none mb-12">PROJECTS</h2>
      <div className="grid grid-cols-1 gap-12">
        {resumeData.projects.map((project, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 1 : -1 }}
            className="p5-card border-l-[12px] border-p5-black group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl group-hover:text-p5-red transition-colors">{project.title}</h3>
              <div className="bg-p5-black text-white p-2 transform rotate-12">
                <ChevronRight size={20} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="font-mono text-[10px] bg-p5-red text-white px-2 py-0.5 transform -skew-x-12">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-base text-p5-black font-medium leading-relaxed">{project.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="space-y-16">
      <h2 className="text-6xl lg:text-7xl italic font-black leading-none mb-12">CALLING CARD</h2>
      <div className="p5-card bg-p5-black text-white border-none shadow-[12px_12px_0px_var(--color-p5-red)]">
        <div className="space-y-8">
          <p className="text-xl italic">
            "{resumeData.contact.quote}"
          </p>
          <div className="h-0.5 bg-p5-red w-full opacity-50"></div>
          <div className="space-y-6 font-mono">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 bg-p5-red flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform">
                <Mail size={20} />
              </div>
              <span className="text-lg hover:text-p5-red transition-colors">{resumeData.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 bg-white text-p5-black flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                <Linkedin size={20} />
              </div>
              <span className="text-lg hover:text-p5-red transition-colors">{resumeData.personalInfo.linkedin}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-8 border-4 border-p5-black border-dashed transform -rotate-1">
        <p className="text-center font-mono text-xs opacity-50">
          // ENCRYPTION: ACTIVE<br />
          // LOCATION_MASK: ENABLED
        </p>
      </div>
    </div>
  );
}

function HomeSection() {
  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden py-12">
      {/* Central Animation Container */}
      <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
        
        {/* Layer 1: Rotating Outer Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-[16px] border-p5-black/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border-[8px] border-p5-red/10 border-dashed rounded-full"
        />

        {/* Layer 2: Floating Skewed Rectangles (Anime.js style) */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`rect-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.8],
              rotate: [0, 90, 180],
              x: Math.cos(i * 30 * (Math.PI / 180)) * 250,
              y: Math.sin(i * 30 * (Math.PI / 180)) * 250,
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            className="absolute w-12 h-12 bg-p5-black transform -skew-x-12"
          />
        ))}

        {/* Layer 3: Pulsing Halftone Circle */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-64 h-64 rounded-full bg-[radial-gradient(#D32F2F_2px,transparent_2px)] [background-size:12px_12px]"
        />

        {/* Layer 4: The "Core" - Skewed Red Box with Star */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="relative z-10 bg-p5-red p-12 shadow-[15px_15px_0px_#000] group cursor-default"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [-12, -10, -12]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Star size={80} className="text-white fill-current mb-4" />
            <h2 className="text-6xl font-black italic text-white leading-none p5-text-shadow">
              MISSION<br />START
            </h2>
          </motion.div>

          {/* Floating Prompt Text */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-max"
          >
            <div className="bg-p5-black text-white px-6 py-2 font-display font-black italic tracking-widest transform -skew-x-12 shadow-[4px_4px_0px_#FFD700]">
              SELECT YOUR INFILTRATION POINT
            </div>
          </motion.div>
        </motion.div>

        {/* Layer 5: Decorative Floating Text */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/4 left-0 font-display text-4xl font-black italic opacity-10 -rotate-12"
          >
            WELCOME
          </motion.div>
          <motion.div
            animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-1/4 right-0 font-display text-4xl font-black italic opacity-10 rotate-12"
          >
            STEAL YOUR HEART
          </motion.div>
        </div>

        {/* Layer 6: Exploding Stars (snappy anime.js style) */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`star-pop-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: (Math.random() - 0.5) * 600,
              y: (Math.random() - 0.5) * 600,
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "circOut"
            }}
            className="absolute text-p5-gold"
          >
            <Star size={24} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Bottom Status Bar */}
      <div className="mt-24 w-full max-w-4xl flex justify-between items-end border-b-4 border-p5-black pb-4">
        <div className="flex gap-8">
          <div>
            <p className="font-mono text-[10px] opacity-50 uppercase">System Status</p>
            <p className="font-display font-black italic text-p5-red">OPTIMIZED</p>
          </div>
          <div>
            <p className="font-mono text-[10px] opacity-50 uppercase">Cognitive Load</p>
            <p className="font-display font-black italic text-p5-red">LOW</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] opacity-50 uppercase">Current Date</p>
          <p className="font-display font-black italic text-2xl">APRIL 10</p>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="space-y-16">
      <div className="relative">
        <h2 className="text-6xl lg:text-7xl italic font-black leading-none mb-4">ABOUT ME</h2>
        <div className="absolute -top-4 -left-4 w-full h-full border-4 border-p5-red -z-10 transform -rotate-1"></div>
      </div>
      
      <div className="p5-card border-l-[12px] border-p5-red">
        <p className="text-lg lg:text-xl leading-relaxed font-medium whitespace-pre-wrap">
          {resumeData.about.summary.split(resumeData.personalInfo.role)[0]}
          {resumeData.about.summary.includes(resumeData.personalInfo.role) && (
            <span className="bg-p5-black text-white px-2 italic">{resumeData.personalInfo.role}</span>
          )}
          {resumeData.about.summary.split(resumeData.personalInfo.role)[1]}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          whileHover={{ scale: 1.02, rotate: -1 }}
          className="bg-p5-black text-white p-6 transform -skew-x-3 shadow-[8px_8px_0px_var(--color-p5-red)]"
        >
          <h3 className="text-xl mb-4 border-b-2 border-p5-red inline-block">LOCATION</h3>
          <p className="font-mono text-base">{resumeData.personalInfo.location}</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02, rotate: 1 }}
          className="bg-p5-red text-white p-6 transform skew-x-3 shadow-[8px_8px_0px_#000]"
        >
          <h3 className="text-xl mb-4 border-b-2 border-white inline-block">STATUS</h3>
          <p className="font-mono text-base uppercase tracking-tighter">{resumeData.personalInfo.status}</p>
        </motion.div>
      </div>
    </div>
  );
}

function ExperienceSection() {
  const [activeExp, setActiveExp] = useState(0);
  const experiences = resumeData.experience;
  const job = experiences[activeExp];

  return (
    <div className="flex flex-col h-full space-y-12">
      <div className="relative">
        <h2 className="text-6xl lg:text-7xl italic font-black leading-none mb-12">EXPERIENCE</h2>
        <div className="absolute -bottom-2 left-0 w-32 h-2 bg-p5-red transform -skew-x-12"></div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-0 flex-1 min-h-0">
        {/* Company selector — slanted tabs */}
        <div className="w-full md:w-[180px] flex-shrink-0 flex md:flex-col gap-3 p-2 md:pr-6 overflow-x-auto md:overflow-x-visible no-scrollbar">
          {experiences.map((exp, idx) => (
            <button
              key={idx}
              onClick={() => setActiveExp(idx)}
              className={`px-6 py-4 transition-all relative cursor-pointer transform -skew-x-12 border-l-8 text-left group ${
                activeExp === idx 
                  ? "bg-p5-red border-white shadow-[8px_8px_0px_#000] z-10" 
                  : "bg-p5-black border-p5-red/30 opacity-60 hover:opacity-100"
              }`}
            >
              {activeExp === idx && (
                <motion.div 
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" 
                />
              )}
              <div className={`font-display text-base font-black tracking-tighter transform skew-x-12 leading-none transition-colors ${activeExp === idx ? "text-white" : "text-p5-red"}`}>
                {exp.company}
              </div>
              <div className={`font-mono text-[9px] mt-2 transform skew-x-12 font-bold ${activeExp === idx ? "text-p5-gold" : "text-gray-600"}`}>
                {exp.period}
              </div>
              
              {/* Decorative star for active tab */}
              {activeExp === idx && (
                <div className="absolute -right-2 -top-2 bg-p5-gold p-1 transform rotate-12 shadow-sm">
                  <Star size={10} className="fill-p5-black text-p5-black" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="flex-1 md:pl-8 mt-8 md:mt-0 overflow-y-auto no-scrollbar relative">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-p5-red/5 -z-10 transform rotate-12 translate-x-32 -translate-y-16"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="bg-p5-black text-white px-4 py-1 font-display text-xs font-black tracking-widest transform -skew-x-12 border-b-4 border-p5-red shadow-[4px_4px_0px_rgba(211,47,47,0.3)]">
                  {job.location || ""}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-p5-red to-transparent"></div>
              </div>

              <div className="relative">
                <h3 className="text-4xl lg:text-5xl font-black italic transform -skew-x-6 p5-text-shadow leading-tight mb-2">
                  {job.role}
                </h3>
                <div className="inline-block bg-p5-black text-p5-gold px-4 py-1 transform -skew-x-12 font-display text-lg font-black tracking-widest shadow-[4px_4px_0px_#D32F2F]">
                  {job.company}
                </div>
              </div>

              <div className="font-mono text-sm text-p5-red font-bold tracking-widest flex items-center gap-3">
                <div className="w-8 h-0.5 bg-p5-red"></div>
                {job.period}
              </div>

              <div className="space-y-4 bg-white/5 p-6 border-l-4 border-p5-red relative overflow-hidden">
                {/* Halftone-like decorative pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D32F2F_1px,transparent_1px)] [background-size:8px_8px]"></div>
                
                {job.bullets.map((bullet, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="mt-1.5 flex-shrink-0">
                      <div className="w-3 h-3 bg-p5-red transform rotate-45"></div>
                    </div>
                    <p className="font-mono text-sm text-p5-black font-bold leading-relaxed bg-p5-white/90 p-2 transform -skew-x-1 shadow-[4px_4px_0px_#000] w-full">
                      {bullet}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                {job.tags.map((tag, i) => (
                  <motion.span 
                    key={tag} 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="font-display text-xs font-black text-white bg-p5-black px-4 py-2 transform -skew-x-12 tracking-widest hover:bg-p5-red transition-colors cursor-default shadow-[4px_4px_0px_#FFD700]"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function AwardsSection() {
  return (
    <div className="space-y-16">
      <h2 className="text-6xl lg:text-7xl italic font-black leading-none mb-12">AWARDS & ACHIEVEMENTS</h2>
      <div className="grid grid-cols-1 gap-8">
        {resumeData.awards.map((award, idx) => (
          <motion.div 
            key={idx}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
            className="p5-card border-r-[12px] border-p5-red group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl lg:text-2xl group-hover:text-p5-red transition-colors leading-tight">{award.title}</h3>
              {/*
                <span className="font-mono text-[10px] bg-p5-black text-white px-2 py-0.5 transform -skew-x-12 ml-4 flex-shrink-0">
                  {award.year}
                </span>
              */}

              <div className="absolute -right-2 -top-2 bg-p5-gold p-1 transform rotate-12 shadow-sm font-display font-black text-xs">
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

function SkillsSection() {
  return (
    <div className="space-y-16">
      <h2 className="text-6xl lg:text-7xl italic font-black leading-none mb-12">SKILLS</h2>
      <div className="flex flex-wrap gap-4">
        {resumeData.skills.languages.map((skill, idx) => (
          <motion.div
            key={skill}
            whileHover={{ 
              scale: 1.1, 
              rotate: idx % 2 === 0 ? 5 : -5,
              backgroundColor: "#D32F2F",
              color: "#fff"
            }}
            className="bg-p5-black text-white px-6 py-3 text-lg font-display transform -skew-x-12 border-b-4 border-p5-red cursor-default transition-colors"
          >
            {skill}
          </motion.div>
        ))}
      </div>
      
      <div className="mt-24 relative">
        <div className="absolute inset-0 bg-p5-black transform -skew-y-1 -z-10"></div>
        <div className="p-12 text-white">
          <h3 className="text-4xl mb-8 italic underline decoration-p5-red underline-offset-8">SPECIALTIES</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm">
            {resumeData.skills.specialties.map((s, i) => (
              <li key={i} className="flex items-center gap-4 group">
                <Star size={14} className="text-p5-red group-hover:rotate-180 transition-transform" />
                <span className="group-hover:text-p5-red transition-colors">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function EducationSection() {
  return (
    <div className="space-y-16">
      <h2 className="text-6xl lg:text-7xl italic font-black leading-none mb-12">STUDY</h2>
      <motion.div 
        whileHover={{ skewY: -0.5 }}
        className="p5-card border-r-[12px] border-p5-black relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-p5-red rotate-45 translate-x-12 -translate-y-12"></div>
        <div className="relative z-10 space-y-8 p-4">
          <div>
            <h3 className="text-3xl lg:text-4xl">{resumeData.education.degree}</h3>
            <p className="text-xl font-black text-p5-red mt-2">{resumeData.education.school}</p>
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

function useBlink(ms: number) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setShow(s => !s), ms);
    return () => clearInterval(interval);
  }, [ms]);
  return show;
}

function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const blink = useBlink(400);
  const lines = [
    "PERSONA SYSTEM v5.0 AESTHETIC",
    "COFFEE CUP FILLED",
    "METAVERSE CALIBRATED",
    "COGNITIVE SCAN OK",
    "VELVET ROOM ONLINE"
  ];

    useEffect(() => {
      const timings = [0, 350, 700, 1050, 1400];
      timings.forEach((ms, i) => {
        setTimeout(() => setStep(i + 1), ms);
      });
      
      // Complete boot after all lines + a small delay
      setTimeout(onComplete, 2500);

  // useEffect(() => {
  //   const timings = [0, 350, 700, 1050, 1400];
  //   const timers = timings.map((ms, i) => {
  //     return setTimeout(() => setStep(i + 1), ms);
  //   });
    
  //   const finalTimer = setTimeout(onComplete, 2500);
    
  //   return () => {
  //     timers.forEach(clearTimeout);
  //     clearTimeout(finalTimer);
  //   };
  }, [onComplete]);

  return (
    <div className="bg-black h-screen flex flex-col justify-center px-16 lg:px-32 relative overflow-hidden">
      {/* Background glitch effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none scanlines"></div>
      
      <div className="relative z-10 space-y-4">
        {lines.map((l, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-6 transition-opacity duration-300 ${i < step ? "opacity-100" : "opacity-0"}`}
          >
            <div 
              className={`w-1 h-6 transform -skew-x-12 transition-colors duration-300 ${
                i < step - 1 ? "bg-gray-800" : "bg-p5-red"
              }`} 
            />
            <span 
              className={`font-display font-bold text-sm lg:text-lg tracking-[0.2em] transform -skew-x-6 transition-colors duration-300 flex items-center gap-2 ${
                i < step - 1 ? "text-gray-800" : "text-white"
              }`}
            >
              <span className="w-6 inline-block">
                {i < step - 1 ? "✓ " : (i === step - 1 ? (blink ? "▶ " : "  ") : "")}
              </span>
              {l}
            </span>
          </div>
        ))}
      </div>

      {/* Loading progress bar at bottom */}
      <div className="absolute bottom-16 left-16 right-16 h-1 bg-gray-900 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "linear" }}
          className="h-full bg-p5-red"
        />
      </div>
    </div>
  );
}
