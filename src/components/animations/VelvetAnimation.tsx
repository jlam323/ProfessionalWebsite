import { motion } from "motion/react";
import { Star } from "lucide-react";

export function VelvetAnimation() {
  return (
    <motion.div
      key="velvet-anim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Layer 1: Ethereal Blue Glow */}
      <div className="absolute inset-0 bg-blue-600/5 rounded-full blur-[100px]" />
      
      {/* Layer 2: Floating "Cards" */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`card-${i}`}
          animate={{ 
            rotate: [i * 45, i * 45 + 10, i * 45],
            x: Math.cos(i * 45 * (Math.PI / 180)) * 200,
            y: Math.sin(i * 45 * (Math.PI / 180)) * 200,
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            delay: i * 0.5 - 3,
            ease: "easeInOut"
          }}
          className="absolute w-16 h-24 bg-white border-2 border-blue-600 shadow-[4px_4px_0px_rgba(37,99,235,0.3)] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-50 opacity-20" />
          <Star size={24} className="text-blue-600 fill-current" />
        </motion.div>
      ))}

      {/* Layer 3: Butterfly-like Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: (Math.random() - 0.5) * 500,
            y: (Math.random() - 0.5) * 500,
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
          className="absolute w-2 h-2 bg-blue-400 rotate-45"
        />
      ))}
    </motion.div>
  );
}
