import { LucideIcon } from "lucide-react";

export type AnimStyle = "phantom" | "velvet" | "mementos" | "rebellion" | "confidant" | "cognitive" | "showtime";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface Section {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface HomeAnimation {
  id: string;
  label: string;
  color: string;
}
