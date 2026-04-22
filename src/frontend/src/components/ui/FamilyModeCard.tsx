import { cn } from "@/lib/utils";
import type { FamilyMember } from "@/types/wejha";
import { UserPlus, X } from "lucide-react";
import { useState } from "react";

interface FamilyModeCardProps {
  members: FamilyMember[];
  onAddMember?: () => void;
  onRemoveMember?: (index: number) => void;
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function FamilyModeCard({
  members,
  onAddMember,
  onRemoveMember,
  className,
}: FamilyModeCardProps) {
  const [removingIdx, setRemovingIdx] = useState<number | null>(null);
  const visible = members.slice(0, 5);

  function handleRemove(idx: number) {
    setRemovingIdx(idx);
    setTimeout(() => {
      onRemoveMember?.(idx);
      setRemovingIdx(null);
    }, 200);
  }

  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 space-y-4",
        className,
      )}
      data-ocid="family_mode.card"
    >
      {/* Header */}
      <div>
        <h3 className="font-bold text-base text-foreground flex items-center gap-2">
          <span aria-hidden="true">👨‍👩‍👧</span> Mode Famille
        </h3>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Un proche peut gérer vos réservations à votre place
        </p>
      </div>

      {/* Member chips */}
      {visible.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Membres de la famille">
          {visible.map((member, idx) => (
            <li
              key={`member-${member.phone}-${idx}`}
              data-ocid={`family_mode.member.${idx + 1}`}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border transition-all duration-200",
                removingIdx === idx
                  ? "opacity-0 scale-90"
                  : "opacity-100 scale-100",
              )}
            >
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground text-[10px] font-bold">
                  {getInitials(member.name)}
                </span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {member.name}
              </span>
              {onRemoveMember && (
                <button
                  type="button"
                  data-ocid={`family_mode.remove_member.${idx + 1}`}
                  onClick={() => handleRemove(idx)}
                  className="w-5 h-5 rounded-full hover:bg-destructive/20 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive"
                  aria-label={`Retirer ${member.name}`}
                >
                  <X
                    className="w-3 h-3 text-muted-foreground"
                    aria-hidden="true"
                  />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Empty state */}
      {visible.length === 0 && (
        <p
          className="text-sm text-muted-foreground italic"
          data-ocid="family_mode.empty_state"
        >
          Aucun proche ajouté pour le moment
        </p>
      )}

      {/* Add button */}
      {members.length < 5 && (
        <button
          type="button"
          data-ocid="family_mode.add_button"
          onClick={onAddMember}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-primary/40",
            "text-primary text-sm font-semibold hover:bg-primary/10 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]",
          )}
        >
          <UserPlus className="w-4 h-4" aria-hidden="true" />
          Ajouter un proche +
        </button>
      )}
    </div>
  );
}
