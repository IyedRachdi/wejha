import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/wejha";
import {
  BookOpen,
  Calendar,
  Car,
  Home,
  Search,
  TrendingUp,
  User,
} from "lucide-react";

interface TabItem {
  key: string;
  label: string;
  icon: React.ElementType;
  route: string;
}

const pmrTabs: TabItem[] = [
  { key: "home", label: "Accueil", icon: Home, route: "/home" },
  { key: "search", label: "Rechercher", icon: Search, route: "/search" },
  {
    key: "bookings",
    label: "Réservations",
    icon: Calendar,
    route: "/bookings",
  },
  { key: "profile", label: "Profil", icon: User, route: "/profile" },
];

const studentTabs: TabItem[] = [
  { key: "home", label: "Accueil", icon: Home, route: "/home" },
  {
    key: "missions",
    label: "Missions",
    icon: BookOpen,
    route: "/student/dashboard",
  },
  {
    key: "earnings",
    label: "Gains",
    icon: TrendingUp,
    route: "/student/dashboard",
  },
  { key: "profile", label: "Profil", icon: User, route: "/profile" },
];

const driverTabs: TabItem[] = [
  { key: "home", label: "Accueil", icon: Home, route: "/home" },
  { key: "rides", label: "Courses", icon: Car, route: "/driver/dashboard" },
  {
    key: "earnings",
    label: "Gains",
    icon: TrendingUp,
    route: "/driver/dashboard",
  },
  { key: "profile", label: "Profil", icon: User, route: "/profile" },
];

const tabsByRole: Record<UserRole, TabItem[]> = {
  pmr: pmrTabs,
  student: studentTabs,
  driver: driverTabs,
};

interface TabBarProps {
  role: UserRole;
  activeTab: string;
  onTabChange: (key: string, route: string) => void;
}

export function TabBar({ role, activeTab, onTabChange }: TabBarProps) {
  const tabs = tabsByRole[role];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Navigation principale"
    >
      <div className="flex items-stretch max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              data-ocid={`tabbar.${tab.key}.tab`}
              onClick={() => onTabChange(tab.key, tab.route)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 py-2 min-h-[64px]",
                "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isActive && "scale-110",
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "text-[10px] font-medium leading-none",
                  isActive && "font-semibold",
                )}
              >
                {tab.label}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-0 w-6 h-0.5 bg-primary rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
