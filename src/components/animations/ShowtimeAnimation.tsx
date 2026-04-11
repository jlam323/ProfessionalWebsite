import { motion } from "motion/react";

export function ShowtimeAnimation() {
  return (
    <motion.div
      key="showtime-anim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Layer 1: Action Zoom Lines */}
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={`zoom-${i}`}
          animate={{ 
            scaleX: [0, 1.5],
            opacity: [0, 1, 0],
          }}
          transition={{ 
            duration: 0.5, 
            repeat: Infinity, 
            delay: i * 0.05,
            ease: "easeOut"
          }}
          className="absolute w-full h-0.5 bg-p5-red origin-center"
          style={{ rotate: `${i * 15}deg` }}
        />
      ))}

      {/* Layer 2: Halftone Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(211,47,47,0.1)_2px,transparent_2px)] [background-size:16px_16px]" />

      {/* Layer 3: Comic Bursts */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`burst-${i}`}
          animate={{ 
            scale: [0, 1.2, 0],
            rotate: (Math.random() - 0.5) * 40,
          }}
          transition={{ 
            duration: 0.3, 
            repeat: Infinity, 
            repeatDelay: 2,
            delay: i * 0.5 
          }}
          className="absolute w-48 h-48 bg-p5-black flex items-center justify-center transform -skew-x-12"
          style={{ 
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`
          }}
        >
          <span className="text-white font-display font-black text-2xl italic">BANG!</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
