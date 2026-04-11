import { motion } from "motion/react";

export function RebellionAnimation() {
  return (
    <motion.div
      key="rebellion-anim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Layer 1: Blue Flames (Enhanced) */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`flame-${i}`}
          initial={{ 
            x: (Math.random() - 0.5) * 400,
            y: 200,
            scale: 1,
            opacity: 0
          }}
          animate={{ 
            y: [200, -300],
            x: (Math.random() - 0.5) * 500,
            scale: [1, 1.5, 0],
            opacity: [0, 1, 0.8, 0],
          }}
          transition={{ 
            duration: 1.5 + Math.random() * 2, 
            repeat: Infinity, 
            delay: Math.random() * 3,
            ease: "easeOut"
          }}
          className={`absolute rounded-full blur-lg ${
            i % 3 === 0 ? "bg-cyan-300 w-12 h-12" : 
            i % 3 === 1 ? "bg-blue-500 w-8 h-8" : 
            "bg-white w-6 h-6"
          }`}
        />
      ))}

      {/* Layer 2: Core Glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />

      {/* Layer 3: Shattering Glass Polygons */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`shard-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            rotate: [0, 360],
            x: (Math.random() - 0.5) * 900,
            y: (Math.random() - 0.5) * 900,
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
          className="absolute w-20 h-20 bg-cyan-100/10 border border-white/20"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        />
      ))}
    </motion.div>
  );
}
