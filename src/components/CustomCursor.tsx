import { motion } from "motion/react";
import { Star } from "lucide-react";
import { ThemeColors } from "../types";

interface CustomCursorProps {
  mousePos: { x: number; y: number };
  currentTheme: ThemeColors;
}

export function CustomCursor({ mousePos, currentTheme }: CustomCursorProps) {
  return (
    <motion.div 
      className="fixed top-0 left-0 w-8 h-8 z-[9999] pointer-events-none mix-blend-difference"
      style={{ backgroundColor: currentTheme.primary }}
      animate={{ 
        x: mousePos.x - 16, 
        y: mousePos.y - 16,
        rotate: mousePos.x / 10 
      }}
      transition={{ type: "tween", ease: "linear", duration: 0 }}
    >
      <Star className="text-white w-full h-full fill-current" />
    </motion.div>
  );
}
