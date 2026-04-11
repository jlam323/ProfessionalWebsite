import { motion } from "motion/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function PhantomAnimation() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.div
      key="phantom-anim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
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

      {/* Layer 2: Floating Skewed Rectangles */}
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
          className={isDesktop ? "absolute w-12 h-12 bg-p5-black transform -skew-x-12" : "absolute w-6 h-6 bg-p5-black transform -skew-x-12"}
        />
      ))}
    </motion.div>
  );
}
