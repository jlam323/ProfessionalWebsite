import { 
  User, 
  Briefcase, 
  Code2, 
  GraduationCap, 
  Star,
  Trophy,
  Home,
  Mail
} from "lucide-react";
import { Section, AnimStyle, ThemeColors } from "../types";

export const SECTIONS: Section[] = [
  { id: "home", label: "HOME", icon: Home },
  { id: "about", label: "ABOUT", icon: User },
  { id: "experience", label: "EXPERIENCE", icon: Briefcase },
  { id: "projects", label: "PROJECTS", icon: Star },
  { id: "awards", label: "AWARDS", icon: Trophy },
  { id: "skills", label: "SKILLS", icon: Code2 },
  { id: "education", label: "STUDY", icon: GraduationCap },
  { id: "contact", label: "CONTACT", icon: Mail },
];

export const TICKER_TEXT = [
  "[INFO] Deploying new ideas...",
  "[SUCCESS] Bug fixed after 3 hours",
  "[WARNING] Overthinking detected"
];

export const THEME_COLORS: Record<AnimStyle, ThemeColors> = {
  phantom: { primary: "#D32F2F", secondary: "#000000", accent: "#FFD700" },
  velvet: { primary: "#2563eb", secondary: "#1e3a8a", accent: "#93c5fd" },
  mementos: { primary: "#7f1d1d", secondary: "#450a0a", accent: "#f87171" },
  rebellion: { primary: "#06b6d4", secondary: "#083344", accent: "#22d3ee" },
  confidant: { primary: "#d97706", secondary: "#451a03", accent: "#fbbf24" },
  cognitive: { primary: "#9333ea", secondary: "#3b0764", accent: "#c084fc" },
  showtime: { primary: "#D32F2F", secondary: "#000000", accent: "#FFD700" },
};
