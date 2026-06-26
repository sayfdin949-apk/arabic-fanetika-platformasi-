import {
  Home,
  GraduationCap,
  Calendar,
  User,
  ClipboardCheck,
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
  { to: "/dars", label: "Dars", icon: GraduationCap, roles: ALL, bottom: true },
  { to: "/dastur", label: "Dastur", icon: Calendar, roles: ALL, bottom: true },
  { to: "/profil", label: "Profil", icon: User, roles: ALL, bottom: true },
  { to: "/davomat", label: "Davomat", icon: ClipboardCheck, roles: ["teacher"], bottom: false },
  { to: "/oquvchilar", label: "O'quvchilar", icon: Users, roles: ["teacher"], bottom: false },
];

export const navForRole = (role: Role) => NAV.filter((n) => n.roles.includes(role));
