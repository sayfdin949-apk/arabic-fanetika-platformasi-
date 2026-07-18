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
  Mic2,
  Globe,
  Mic,
  Baby,
  Languages,
  Tv2,
  Trophy,
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
  /** Qaysi yo'nalishlarda ko'rinadi; undefined = ikkalasida ham */
  turlar?: ("grammatika" | "fonetika")[];
}

const ALL: Role[] = ["ceo", "teacher", "assistant", "student"];

export const NAV: NavItem[] = [
  { to: "/", label: "Bosh sahifa", icon: Home, roles: ALL, bottom: true },
  { to: "/dars", label: "Dars", icon: GraduationCap, roles: ALL, bottom: true, turlar: ["fonetika"] },
  { to: "/grammatika", label: "Grammatika", icon: BookOpenText, roles: ALL, bottom: true, turlar: ["grammatika"] },
  { to: "/dastur", label: "Dastur", icon: Calendar, roles: ALL, bottom: true, turlar: ["fonetika"] },
  { to: "/statistika", label: "Statistika", icon: BarChart2, roles: ALL, bottom: true },
  { to: "/profil", label: "Profil", icon: User, roles: ALL, bottom: false },
  { to: "/oyun", label: "O'yin", icon: Gamepad2, roles: ALL, bottom: false },
  { to: "/xatolar", label: "Xatolar", icon: AlertTriangle, roles: ALL, bottom: false, turlar: ["fonetika"] },
  { to: "/juftlar", label: "Minimal juftlar", icon: BookMarked, roles: ALL, bottom: false, turlar: ["fonetika"] },
  { to: "/sertifikat", label: "Sertifikat", icon: Award, roles: ALL, bottom: false },
  { to: "/yutuqlar", label: "Yutuqlar", icon: Award, roles: ALL, bottom: false },
  { to: "/reyting", label: "Reyting", icon: Trophy, roles: ALL, bottom: false },
  { to: "/davomat", label: "Davomat", icon: ClipboardCheck, roles: ALL, bottom: false },
  { to: "/shikoyat", label: "Shikoyat", icon: MessageCircleWarning, roles: ALL, bottom: false },
  { to: "/oquvchilar", label: "O'quvchilar", icon: Users, roles: ["ceo", "teacher"], bottom: false },
  { to: "/guruhlar", label: "Guruhlar", icon: LayersIcon, roles: ["ceo", "teacher"], bottom: false },
  { to: "/ustozlar", label: "O'qituvchilar", icon: UserCog, roles: ["ceo"], bottom: false },
  { to: "/yordamchi-ustoz", label: "Yordamchi ustoz", icon: CalendarClock, roles: ["student"], bottom: false },
  { to: "/skaner", label: "Skaner", icon: ScanLine, roles: ["assistant"], bottom: false },
  { to: "/chat", label: "Guruh chat", icon: MessageCircle, roles: ALL, bottom: false },
  { to: "/market", label: "Market", icon: ShoppingBag, roles: ALL, bottom: false },
  { to: "/tolov", label: "To'lov", icon: CreditCard, roles: ["student"], bottom: false },
  { to: "/video", label: "Video darslar", icon: PlayCircle, roles: ALL, bottom: false },
  { to: "/kitobxona", label: "Kitobxona", icon: Library, roles: ALL, bottom: false },
  { to: "/mocktest", label: "Mock test", icon: ClipboardList, roles: ALL, bottom: false, turlar: ["grammatika"] },
  { to: "/matn-tahlil", label: "Matn tahlili", icon: Sparkles, roles: ALL, bottom: false, turlar: ["grammatika"] },
  { to: "/speaking-club", label: "Speaking Club", icon: Mic2, roles: ALL, bottom: false, turlar: ["grammatika"] },
  { to: "/mehmon-ustozlar", label: "Mehmon ustozlar", icon: Globe, roles: ALL, bottom: false, turlar: ["grammatika"] },
  { to: "/ovoz", label: "Ovoz yozish", icon: Mic, roles: ALL, bottom: false, turlar: ["grammatika"] },
  { to: "/tarjimon", label: "Tarjimon", icon: Languages, roles: ALL, bottom: false, turlar: ["grammatika"] },
  { to: "/multfilmlar", label: "Multfilmlar", icon: Tv2, roles: ALL, bottom: false, turlar: ["grammatika"] },
  { to: "/ota-ona", label: "Ota-ona paneli", icon: Baby, roles: ["student"], bottom: false },
];

export const navForRole = (
  role: Role,
  tur?: "grammatika" | "fonetika" | null,
) =>
  NAV.filter((n) => {
    if (!n.roles.includes(role)) return false;
    if (!tur || !n.turlar) return true;
    return n.turlar.includes(tur);
  });

// ── ADMIN PANEL navigatsiyasi (CEO · Teacher · Assistant) ─────────────────
export const ADMIN_NAV: NavItem[] = [
  { to: "/",           label: "Bosh sahifa",    icon: Home,                roles: ["ceo","teacher","assistant"], bottom: true  },
  { to: "/oquvchilar", label: "O'quvchilar",     icon: Users,               roles: ["ceo","teacher"],             bottom: true  },
  { to: "/ustozlar",   label: "O'qituvchilar",   icon: UserCog,             roles: ["ceo"],                       bottom: false },
  { to: "/guruhlar",   label: "Guruhlar",         icon: LayersIcon,          roles: ["ceo","teacher"],             bottom: false },
  { to: "/davomat",    label: "Davomat",          icon: ClipboardCheck,      roles: ["ceo","teacher"],             bottom: false },
  { to: "/statistika", label: "Statistika",       icon: BarChart2,           roles: ["ceo","teacher","assistant"], bottom: true  },
  { to: "/reyting",    label: "Reyting",          icon: Trophy,              roles: ["ceo","teacher"],             bottom: false },
  { to: "/yutuqlar",   label: "Yutuqlar",         icon: Award,               roles: ["ceo","teacher"],             bottom: false },
  { to: "/shikoyat",   label: "Shikoyatlar",      icon: MessageCircleWarning,roles: ["ceo","teacher","assistant"], bottom: false },
  { to: "/skaner",     label: "Skaner",           icon: ScanLine,            roles: ["assistant"],                  bottom: true  },
  { to: "/chat",       label: "Guruh chat",       icon: MessageCircle,       roles: ["ceo","teacher","assistant"], bottom: true  },
  { to: "/video",      label: "Video darslar",    icon: PlayCircle,          roles: ["ceo","teacher"],             bottom: false },
  { to: "/kitobxona",  label: "Kitobxona",        icon: Library,             roles: ["ceo","teacher"],             bottom: false },
  { to: "/dars",       label: "Dars (fonetika)",  icon: GraduationCap,       roles: ["ceo","teacher"],             bottom: false, turlar: ["fonetika"]    },
  { to: "/grammatika", label: "Grammatika",       icon: BookOpenText,        roles: ["ceo","teacher"],             bottom: false, turlar: ["grammatika"]  },
  { to: "/dastur",     label: "Kurs dasturi",     icon: Calendar,            roles: ["ceo","teacher"],             bottom: false, turlar: ["fonetika"]    },
  { to: "/profil",     label: "Profil",           icon: User,                roles: ["ceo","teacher","assistant"], bottom: false },
];

export const adminNavForRole = (
  role: "ceo" | "teacher" | "assistant",
  tur?: "grammatika" | "fonetika" | null,
) =>
  ADMIN_NAV.filter((n) => {
    if (!n.roles.includes(role)) return false;
    if (!tur || !n.turlar) return true;
    return n.turlar.includes(tur);
  });
