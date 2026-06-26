import {
  Home,
  BookOpen,
  FlaskConical,
  Calendar,
  User,
  ClipboardCheck,
  MessageCircle,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "../auth/types";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  roles: Role[];
  /** Mobil pastki panelда ko'rinadimi (aks holda "Ko'proq" menyusida) */
  bottom: boolean;
}

const ALL: Role[] = ["teacher", "student"];

export const NAV: NavItem[] = [
  { to: "/", label: "Bosh sahifa", icon: Home, roles: ALL, bottom: true },
  { to: "/nazariy", label: "Nazariy", icon: BookOpen, roles: ALL, bottom: true },
  { to: "/amaliy", label: "Amaliy", icon: FlaskConical, roles: ALL, bottom: true },
  { to: "/dastur", label: "Dastur", icon: Calendar, roles: ALL, bottom: false },
  { to: "/profil", label: "Profil", icon: User, roles: ALL, bottom: true },
  { to: "/chat", label: "Chat", icon: MessageCircle, roles: ALL, bottom: false },
  { to: "/davomat", label: "Davomat", icon: ClipboardCheck, roles: ["teacher"], bottom: false },
  { to: "/oquvchilar", label: "O'quvchilar", icon: Users, roles: ["teacher"], bottom: false },
];

export const navForRole = (role: Role) => NAV.filter((n) => n.roles.includes(role));
