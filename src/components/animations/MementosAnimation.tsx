import { motion } from "motion/react";

export function MementosAnimation() {
  return (
    <motion.div
      key="mementos-anim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Layer 1: Scrolling Subway Tracks */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`track-${i}`}
          animate={{ 
            y: [-1000, 1000],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: i * 0.2,
            ease: "linear"
          }}
          className="absolute w-1 h-64 bg-red-900/20"
          style={{ left: `${i * 10}%` }}
        />
      ))}
      
      {/* Layer 2: Pulsing Heartbeat */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute w-[800px] h-[800px] rounded-full bg-red-600/10 blur-3xl"
      />

      {/* Layer 3: Industrial Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(153,27,27,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(153,27,27,0.05)_1px,transparent_1px)] [background-size:40px_40px]" />
    </motion.div>
  );
}
