import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/wejha";
import { CheckCircle } from "lucide-react";

interface RoleSelectorProps {
  selectedRole: UserRole | null;
  onSelectRole: (role: UserRole) => void;
}

const roles: {
  role: UserRole;
  icon: string;
  label: string;
  sublabel: string;
}[] = [
  {
    role: "pmr",
    icon: "♿",
    label: "Je suis une personne à mobilité réduite (PMR)",
    sublabel: "Accédez à des services d'aide et de transport adaptés",
  },
  {
    role: "student",
    icon: "🎓",
    label: "Je suis étudiant prestataire",
    sublabel: "Aidez des personnes PMR et gagnez des points + revenus",
  },
  {
    role: "driver",
    icon: "🚗",
    label: "Je suis chauffeur avec label PMR",
    sublabel: "Effectuez des courses adaptées avec votre véhicule équipé",
  },
];

export function RoleSelector({
  selectedRole,
  onSelectRole,
}: RoleSelectorProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {roles.map(({ role, icon, label, sublabel }) => {
        const isSelected = selectedRole === role;
        return (
          <label
            key={role}
            htmlFor={`role-${role}`}
            className={cn(
              "w-full min-h-[80px] flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left cursor-pointer",
              "transition-all duration-200",
              isSelected
                ? "border-primary bg-primary/10 shadow-md scale-[1.01]"
                : "border-border bg-card hover:border-primary/40 hover:bg-primary/5",
            )}
          >
            <input
              id={`role-${role}`}
              type="radio"
              name="wejha-role"
              value={role}
              checked={isSelected}
              onChange={() => onSelectRole(role)}
              data-ocid={`onboarding.role_${role}.card`}
              className="sr-only focus-visible:ring-2"
            />
            <span className="text-3xl flex-shrink-0" aria-hidden="true">
              {icon}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "font-semibold text-sm leading-snug",
                  isSelected ? "text-primary" : "text-foreground",
                )}
              >
                {label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {sublabel}
              </p>
            </div>
            {isSelected && (
              <CheckCircle
                className="w-5 h-5 text-primary flex-shrink-0"
                aria-hidden="true"
              />
            )}
          </label>
        );
      })}
    </div>
  );
}
