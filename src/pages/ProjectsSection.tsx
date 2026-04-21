import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import resumeData from "../data.json";
import { ThemeColors } from "../types";

function ProjectThumbnail({ images, currentTheme }: { images?: string[], currentTheme: ThemeColors }) {
  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-video lg:w-80 flex-shrink-0 overflow-hidden bg-p5-black border-2 border-p5-black group-hover:border-white transition-colors">
        <img 
          src={images[0]} 
          alt="Project sample" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 p5-halftone opacity-20"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video lg:w-80 flex-shrink-0 overflow-hidden bg-p5-black border-2 border-p5-black group-hover:border-white transition-colors">
      <div className="absolute inset-0">
        <img 
          src={images[0]} 
          alt="Project sample 1" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          referrerPolicy="no-referrer"
        />
        <img 
          src={images[1]} 
          alt="Project sample 2" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
          referrerPolicy="no-referrer"
        />
      </div>
      {/* Visual separator line */}
      <div 
        className="absolute inset-0 pointer-events-none border-r-2 border-white transform origin-top-left -rotate-45 scale-150"
        style={{ borderColor: currentTheme.primary }}
      ></div>
      <div className="absolute inset-0 p5-halftone opacity-20 pointer-events-none"></div>
    </div>
  );
}

export function ProjectsSection({ currentTheme }: { currentTheme: ThemeColors }) {
  return (
    <div className="space-y-16">
      <h2 className="text-3xl lg:text-6xl italic font-black leading-none mb-12 uppercase">SIDE PROJECTS</h2>
      <div className="grid grid-cols-1 gap-12">
        {resumeData.projects.map((project: any, idx) => {
          const CardComponent = project.link ? motion.a : motion.div;
          const extraProps = project.link ? { 
            href: project.link, 
            target: "_blank", 
            rel: "noopener noreferrer",
            className: "p5-card border-l-8 lg:border-l-[12px] group cursor-pointer p-0 overflow-hidden block no-underline"
          } : {
            className: "p5-card border-l-8 lg:border-l-[12px] group cursor-pointer p-0 overflow-hidden"
          };

          return (
            <CardComponent 
              key={idx}
              whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
              animate={{ borderLeftColor: currentTheme.primary }}
              {...extraProps as any}
            >
              <div className="flex flex-col lg:flex-row h-full">
                {/* Thumbnail Section */}
                <ProjectThumbnail images={project.images} currentTheme={currentTheme} />
                
                {/* Content Section */}
                <div className="flex-1 p-6 lg:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <motion.h3 
                      whileHover={{ color: currentTheme.primary }}
                      className="text-2xl lg:text-3xl font-black italic transform -skew-x-6 text-p5-black"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.div 
                      animate={{ backgroundColor: currentTheme.secondary === "#000000" ? "#000" : currentTheme.primary }}
                      className="text-white p-2 transform rotate-12 shadow-[2px_2px_0px_#000]"
                    >
                      <ChevronRight size={20} />
                    </motion.div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <motion.span 
                        key={tag} 
                        animate={{ backgroundColor: currentTheme.primary }}
                        className="font-mono text-[10px] font-bold text-white px-3 py-1 transform -skew-x-12 shadow-[2px_2px_0px_#000]"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  <p className="text-sm lg:text-base text-p5-black font-bold leading-relaxed border-l-2 pl-4 transform skew-x-1" style={{ borderColor: currentTheme.primary }}>
                    {project.desc}
                  </p>
                </div>
              </div>
            </CardComponent>
          );
        })}
      </div>
    </div>
  );
}
