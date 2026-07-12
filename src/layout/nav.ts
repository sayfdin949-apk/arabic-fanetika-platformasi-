import {
  Home,
  GraduationCap,
  Calendar,
  User,
  ClipboardCheck,
  Users,
  BarChart2,
  Gamepad2,
  AlertTriangle,
  Award,
  BookMarked,
  LayersIcon,
  MessageCircleWarning,
  UserCog,
  CalendarClock,
  ScanLine,
  BookOpenText,
  MessageCircle,
  ShoppingBag,
  CreditCard,
  PlayCircle,
  Library,
  ClipboardList,
  Sparkles,
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

const ALL: Role[] = ["ceo", "teacher", "assistant", "student"];

export const NAV: NavItem[] = [
  { to: "/", label: "Bosh sahifa", icon: Home, roles: ALL, bottom: true },
  { to: "/dars", label: "Dars", icon: GraduationCap, roles: ALL, bottom: true },
  { to: "/dastur", label: "Dastur", icon: Calendar, roles: ALL, bottom: true },
  { to: "/statistika", label: "Statistika", icon: BarChart2, roles: ALL, bottom: true },
  { to: "/profil", label: "Profil", icon: User, roles: ALL, bottom: false },
  { to: "/oyun", label: "O'yin", icon: Gamepad2, roles: ALL, bottom: false },
  { to: "/xatolar", label: "Xatolar", icon: AlertTriangle, roles: ALL, bottom: false },
  { to: "/juftlar", label: "Minimal juftlar", icon: BookMarked, roles: ALL, bottom: false },
  { to: "/sertifikat", label: "Sertifikat", icon: Award, roles: ALL, bottom: false },
  { to: "/davomat", label: "Davomat", icon: ClipboardCheck, roles: ["ceo", "teacher", "assistant", "student"], bottom: false },
  { to: "/shikoyat", label: "Shikoyat", icon: MessageCircleWarning, roles: ALL, bottom: false },
  { to: "/oquvchilar", label: "O'quvchilar", icon: Users, roles: ["ceo", "teacher"], bottom: false },
  { to: "/guruhlar", label: "Guruhlar", icon: LayersIcon, roles: ["ceo", "teacher"], bottom: false },
  { to: "/ustozlar", label: "O'qituvchilar", icon: UserCog, roles: ["ceo"], bottom: false },
  { to: "/yordamchi-ustoz", label: "Yordamchi ustoz", icon: CalendarClock, roles: ["student"], bottom: false },
  { to: "/skaner", label: "Skaner", icon: ScanLine, roles: ["assistant"], bottom: false },
  { to: "/grammatika", label: "Grammatika", icon: BookOpenText, roles: ALL, bottom: false },
  { to: "/chat", label: "Guruh chat", icon: MessageCircle, roles: ALL, bottom: false },
  { to: "/market", label: "Market", icon: ShoppingBag, roles: ALL, bottom: false },
  { to: "/tolov", label: "To'lov", icon: CreditCard, roles: ["student"], bottom: false },
  { to: "/video", label: "Video darslar", icon: PlayCircle, roles: ALL, bottom: false },
  { to: "/kitobxona", label: "Kitobxona", icon: Library, roles: ALL, bottom: false },
  { to: "/mocktest", label: "Mock test", icon: ClipboardList, roles: ALL, bottom: false },
  { to: "/matn-tahlil", label: "Matn tahlili", icon: Sparkles, roles: ALL, bottom: false },
];

export const navForRole = (role: Role) => NAV.filter((n) => n.roles.includes(role));
