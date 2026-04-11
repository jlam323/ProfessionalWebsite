import { motion } from "motion/react";
import { TICKER_TEXT } from "../constants";
import { ThemeColors } from "../types";

export function TickerTape({ currentTheme }: { currentTheme: ThemeColors }) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[22px] bg-[#0e0008] border-t border-[#1e0015] overflow-hidden flex items-center z-[100]">
      <div className="whitespace-nowrap animate-ticker font-display font-bold text-[9px] tracking-[4px] flex">
        {[...TICKER_TEXT, ...TICKER_TEXT, ...TICKER_TEXT].map((s, i) => (
          <motion.span 
            key={i} 
            animate={{ color: currentTheme.primary }}
            className="flex items-center opacity-30"
          >
            <span className="mx-4">◈</span>
            <span>{s}</span>
          </motion.span>
        ))}
      </div>
    </div>
  );
}
