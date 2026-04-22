import { AppLayout } from "@/components/layout/AppLayout";
import { ProviderCard } from "@/components/ui/ProviderCard";
import { WejhaButton } from "@/components/ui/WejhaButton";
import { useMockProviders } from "@/hooks/useWejha";
import { cn } from "@/lib/utils";
import type { ProviderSummary, ServiceType } from "@/types/wejha";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

type FilterType = ServiceType | "all";
type SortOption = "rating" | "available" | "premium";

const SERVICE_FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "medical", label: "🏥 Médical" },
  { key: "transport", label: "🚗 Transport" },
  { key: "shopping", label: "🛒 Courses" },
  { key: "homeHelp", label: "🏠 Aide" },
  { key: "other", label: "✨ Autre" },
];

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "rating", label: "Mieux notés" },
  { key: "available", label: "Disponibles" },
  { key: "premium", label: "Premium" },
];

function filterProviders(
  providers: ProviderSummary[],
  filter: FilterType,
  sort: SortOption,
  query: string,
): ProviderSummary[] {
  let result = providers.filter((p) => {
    if (filter !== "all" && !p.serviceTypes.includes(filter as ServiceType))
      return false;
    if (query && !p.name.toLowerCase().includes(query.toLowerCase()))
      return false;
    return true;
  });
  if (sort === "available") result = result.filter((p) => p.isAvailable);
  if (sort === "rating")
    result = [...result].sort((a, b) => b.rating - a.rating);
  if (sort === "premium")
    result = result.filter((p) => p.badge === "gold" || p.isVerified);
  return result;
}

export default function SearchPage() {
  const navigate = useNavigate();
  const providers = useMockProviders();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activeSort, setActiveSort] = useState<SortOption>("rating");
  const [query, setQuery] = useState("");

  const filtered = filterProviders(providers, activeFilter, activeSort, query);

  function handleTabChange(_key: string, route: string) {
    navigate({ to: route as "/" });
  }

  return (
    <AppLayout
      activeTab="search"
      onTabChange={handleTabChange}
      title="Recherche"
      userRole="pmr"
    >
      <div className="px-4 pt-5 pb-6 space-y-4">
        {/* Title */}
        <div>
          <h1 className="font-display font-bold text-xl text-foreground">
            Rechercher un service
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Trouvez le prestataire idéal pour vous
          </p>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Rechercher par nom..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-ocid="search.search_input"
            className={cn(
              "w-full pl-10 pr-4 min-h-[48px] rounded-xl border border-input bg-card",
              "text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200",
            )}
            aria-label="Rechercher un prestataire par nom"
          />
        </div>

        {/* Service filter chips — horizontal scroll */}
        <fieldset
          className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 border-0 p-0 m-0"
          aria-label="Filtres par type de service"
          data-ocid="search.filter.section"
          style={{ scrollbarWidth: "none" }}
        >
          {SERVICE_FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              data-ocid={`search.filter_${filter.key}.tab`}
              onClick={() => setActiveFilter(filter.key)}
              aria-pressed={activeFilter === filter.key}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold min-h-[40px] border",
                "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                activeFilter === filter.key
                  ? "text-white border-transparent"
                  : "bg-card border-border text-foreground hover:bg-muted",
              )}
              style={
                activeFilter === filter.key
                  ? {
                      background: "oklch(0.55 0.22 310)",
                      borderColor: "oklch(0.55 0.22 310)",
                    }
                  : {}
              }
            >
              {filter.label}
            </button>
          ))}
        </fieldset>

        {/* Sort toggle chips */}
        <fieldset
          className="flex gap-2 border-0 p-0 m-0"
          aria-label="Options de tri"
          data-ocid="search.sort.section"
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              data-ocid={`search.sort_${option.key}.toggle`}
              onClick={() => setActiveSort(option.key)}
              aria-pressed={activeSort === option.key}
              className={cn(
                "flex-1 px-3 py-2 rounded-xl text-xs font-semibold min-h-[40px] border",
                "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                activeSort === option.key
                  ? "text-white border-transparent"
                  : "bg-card border-border text-muted-foreground hover:bg-muted",
              )}
              style={
                activeSort === option.key
                  ? {
                      background: "oklch(0.65 0.18 210)",
                      borderColor: "oklch(0.65 0.18 210)",
                    }
                  : {}
              }
            >
              {option.label}
            </button>
          ))}
        </fieldset>

        {/* Results count */}
        <p
          className="text-xs text-muted-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          {filtered.length === 0
            ? "Aucun résultat"
            : `${filtered.length} prestataire${filtered.length > 1 ? "s" : ""} trouvé${filtered.length > 1 ? "s" : ""}`}
        </p>

        {/* Provider list or empty state */}
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 rounded-2xl bg-muted/30 border border-border"
            data-ocid="search.providers.empty_state"
          >
            <span
              className="text-5xl mb-4"
              style={{ color: "oklch(0.65 0.18 210)" }}
              aria-hidden="true"
            >
              🔍
            </span>
            <p className="font-semibold text-foreground text-base">
              Aucun prestataire disponible
            </p>
            <p className="text-sm text-muted-foreground mt-1 text-center max-w-[220px]">
              Essayez d'autres filtres ou revenez plus tard
            </p>
            <WejhaButton
              variant="ghost"
              size="sm"
              onClick={() => {
                setActiveFilter("all");
                setActiveSort("rating");
                setQuery("");
              }}
              data-ocid="search.reset.button"
              className="mt-4"
            >
              Réinitialiser les filtres
            </WejhaButton>
          </div>
        ) : (
          <div className="space-y-3" data-ocid="search.providers.list">
            {filtered.map((provider, idx) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onSelect={() => navigate({ to: "/bookings" as "/" })}
                data-ocid={`search.provider.item.${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        type="button"
        data-ocid="search.new_booking.button"
        onClick={() => navigate({ to: "/bookings" as "/" })}
        className={cn(
          "fixed bottom-24 right-4 z-40",
          "flex items-center gap-2 px-5 min-h-[52px] rounded-full",
          "font-semibold text-sm text-white shadow-xl",
          "hover:opacity-90 active:scale-95 transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        )}
        style={{ background: "oklch(0.55 0.22 310)" }}
        aria-label="Nouvelle réservation"
      >
        <Plus className="w-5 h-5" aria-hidden="true" />
        Nouvelle réservation
      </button>
    </AppLayout>
  );
}
