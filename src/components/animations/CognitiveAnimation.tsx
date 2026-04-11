import { motion } from "motion/react";

export function CognitiveAnimation() {
  return (
    <motion.div
      key="cognitive-anim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Layer 1: Shifting Perspective Lines */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          animate={{ 
            skewX: [-20, 20, -20],
            x: [-50, 50, -50],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            delay: i * 0.3,
            ease: "easeInOut"
          }}
          className="absolute w-full h-1 bg-purple-600/10"
          style={{ top: `${i * 8}%` }}
        />
      ))}

      {/* Layer 2: Glitch Blocks */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`glitch-${i}`}
          animate={{ 
            opacity: [0, 0.8, 0],
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 600,
            scaleX: [1, 4, 1],
          }}
          transition={{ 
            duration: 0.2, 
            repeat: Infinity, 
            repeatDelay: Math.random() * 3 
          }}
          className="absolute w-24 h-8 bg-purple-400/30"
        />
      ))}
    </motion.div>
  );
}
