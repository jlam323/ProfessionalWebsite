import { motion } from "motion/react";
import { Star } from "lucide-react";

export function ConfidantAnimation() {
  return (
    <motion.div
      key="confidant-anim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Layer 1: Sepia Overlay */}
      <div className="absolute inset-0 bg-amber-900/5" />
      
      {/* Layer 2: Floating Rank Stars */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`rank-star-${i}`}
          animate={{ 
            y: [0, -500],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            delay: i * 0.5 
          }}
          className="absolute text-amber-400"
          style={{ left: `${i * 10}%`, bottom: "-10%" }}
        >
          <Star size={32} fill="currentColor" />
        </motion.div>
      ))}

      {/* Layer 3: Warm Glow */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-t from-amber-600/10 to-transparent"
      />
    </motion.div>
  );
}
