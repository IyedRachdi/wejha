import { useAccessibilityStore } from "@/store/accessibilityStore";
import { useAuthStore } from "@/store/authStore";
import type { Booking, Mission, ProviderSummary } from "@/types/wejha";

export function useAccessibility() {
  const { textSize, highContrast, setTextSize, toggleHighContrast } =
    useAccessibilityStore();
  return { textSize, highContrast, setTextSize, toggleHighContrast };
}

export function useAuth() {
  return useAuthStore();
}

export function useMockBookings(): Booking[] {
  return [
    {
      id: "b-001",
      pmrId: "u-001",
      clientName: "Salma Bouzid",
      providerId: "u-010",
      serviceType: "medical",
      description:
        "Accompagnement au rendez-vous médical à la clinique El Manar",
      status: "confirmed",
      scheduledAt: Date.now() + 2 * 60 * 60 * 1000,
      createdAt: Date.now() - 30 * 60 * 1000,
      address: "12 Rue Ibn Khaldoun, Tunis",
      estimatedDuration: 90,
      price: 25,
      providerName: "Amira Ben Salah",
      providerRating: 4.8,
    },
    {
      id: "b-002",
      pmrId: "u-001",
      clientName: "Salma Bouzid",
      providerId: "u-011",
      serviceType: "shopping",
      description: "Courses alimentaires au Monoprix du Lac",
      status: "completed",
      scheduledAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
      createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
      address: "Lac 1, Tunis",
      estimatedDuration: 60,
      price: 15,
      providerName: "Yassine Cherif",
      providerRating: 4.6,
    },
    {
      id: "b-003",
      pmrId: "u-001",
      clientName: "Salma Bouzid",
      serviceType: "transport",
      description: "Transport fauteuil roulant vers le CNAM",
      status: "requested",
      createdAt: Date.now() - 10 * 60 * 1000,
      address: "Centre Urba Nord, Tunis",
      estimatedDuration: 45,
      price: 20,
    },
  ];
}

export function useMockMissions(): Mission[] {
  return [
    {
      id: "m-001",
      category: "medical",
      description:
        "Accompagner Mme Fatma Khalfallah à sa séance de kiné à La Marsa",
      pointsReward: 120,
      durationMinutes: 90,
      payoutAmount: 30,
      address: "15 Avenue Habib Bourguiba, La Marsa",
      scheduledAt: Date.now() + 3 * 60 * 60 * 1000,
      isUrgent: false,
    },
    {
      id: "m-002",
      category: "shopping",
      description:
        "Achats hebdomadaires pour M. Kamel Trabelsi au Carrefour Mégrine",
      pointsReward: 80,
      durationMinutes: 60,
      payoutAmount: 20,
      address: "Zone Commerciale Mégrine, Ben Arous",
      scheduledAt: Date.now() + 24 * 60 * 60 * 1000,
      isUrgent: false,
    },
    {
      id: "m-003",
      category: "homeHelp",
      description: "Aide ménagère légère pour Mme Leila Bouzid à El Menzah",
      pointsReward: 100,
      durationMinutes: 120,
      payoutAmount: 35,
      address: "El Menzah 6, Tunis",
      isUrgent: false,
    },
    {
      id: "m-004",
      category: "transport",
      description:
        "Transport urgent — fauteuil roulant vers les urgences de Charles Nicolle",
      pointsReward: 200,
      durationMinutes: 45,
      payoutAmount: 50,
      address: "Boulevard du 9 Avril, Tunis",
      scheduledAt: Date.now() + 30 * 60 * 1000,
      isUrgent: true,
    },
    {
      id: "m-005",
      category: "medical",
      description:
        "Prise de médicaments à la pharmacie et livraison à domicile",
      pointsReward: 60,
      durationMinutes: 30,
      payoutAmount: 15,
      address: "Cité El Khadra, Tunis",
      isUrgent: false,
    },
    {
      id: "m-006",
      category: "other",
      description: "Aide administrative — démarches à la mairie de Sfax",
      pointsReward: 90,
      durationMinutes: 75,
      payoutAmount: 25,
      address: "Avenue Hedi Chaker, Sfax",
      isUrgent: false,
    },
  ];
}

export function useMockProviders(): ProviderSummary[] {
  return [
    {
      id: "p-001",
      name: "Amira Ben Salah",
      role: "student",
      rating: 4.9,
      reviewCount: 47,
      serviceTypes: ["medical", "homeHelp"],
      isVerified: true,
      badge: "gold",
      isAvailable: true,
      completedMissions: 89,
      bio: "Étudiante en médecine, spécialisée dans l'accompagnement des personnes âgées.",
    },
    {
      id: "p-002",
      name: "Yassine Cherif",
      role: "student",
      rating: 4.6,
      reviewCount: 31,
      serviceTypes: ["shopping", "transport", "other"],
      isVerified: true,
      badge: "silver",
      isAvailable: true,
      completedMissions: 52,
      bio: "Étudiant ingénieur, disponible le soir et le week-end.",
    },
    {
      id: "p-003",
      name: "Sonia Mansouri",
      role: "student",
      rating: 4.7,
      reviewCount: 23,
      serviceTypes: ["homeHelp", "medical", "shopping"],
      isVerified: true,
      badge: "silver",
      isAvailable: false,
      completedMissions: 38,
      bio: "Étudiante en soins infirmiers, formation en accompagnement PMR.",
    },
    {
      id: "p-004",
      name: "Riadh Hamdi",
      role: "driver",
      rating: 4.8,
      reviewCount: 112,
      serviceTypes: ["transport"],
      isVerified: true,
      isAvailable: true,
      completedMissions: 210,
      bio: "Chauffeur certifié PMR, véhicule adapté fauteuil roulant. 5 ans d'expérience.",
    },
    {
      id: "p-005",
      name: "Nadia Khelifi",
      role: "student",
      rating: 4.5,
      reviewCount: 18,
      serviceTypes: ["medical", "other"],
      isVerified: false,
      badge: "bronze",
      isAvailable: true,
      completedMissions: 22,
      bio: "Étudiante en pharmacie, aide aux démarches médicales.",
    },
  ];
}
