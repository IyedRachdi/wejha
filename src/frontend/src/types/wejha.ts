export type UserRole = "pmr" | "student" | "driver";
export type StudentBadge = "bronze" | "silver" | "gold";
export type ServiceType =
  | "medical"
  | "transport"
  | "shopping"
  | "homeHelp"
  | "other";
export type BookingStatus =
  | "requested"
  | "confirmed"
  | "enRoute"
  | "arrived"
  | "completed"
  | "cancelled";

export interface FamilyMember {
  name: string;
  phone: string;
  relation: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  verifiedBadge: boolean;
  trustScore: number;
  profilePhotoKey?: string;
  createdAt: number;
  isPremium: boolean;
  familyMembers: FamilyMember[];
  points: number;
  badge?: StudentBadge;
  totalEarnings: number;
  completedMissions: number;
  isAvailable?: boolean;
}

export interface Booking {
  id: string;
  pmrId: string;
  providerId?: string;
  serviceType: ServiceType;
  description: string;
  status: BookingStatus;
  scheduledAt?: number;
  createdAt: number;
  address: string;
  estimatedDuration: number;
  price: number;
  providerName?: string;
  providerPhoto?: string;
  providerRating?: number;
}

export interface Mission {
  id: string;
  category: ServiceType;
  description: string;
  pointsReward: number;
  durationMinutes: number;
  payoutAmount: number;
  address: string;
  scheduledAt?: number;
  isUrgent: boolean;
}

export interface Review {
  id: string;
  bookingId: string;
  reviewerId: string;
  revieweeId: string;
  stars: number;
  text: string;
  createdAt: number;
}

export interface StudentDashboard {
  profile: UserProfile;
  activeMissions: Mission[];
  completedCount: number;
  totalEarnings: number;
  points: number;
  badge?: StudentBadge;
  nextBadgePoints: number;
  weeklyEarnings: number;
  pendingPayout: number;
}

export interface ProviderSummary {
  id: string;
  name: string;
  role: UserRole;
  rating: number;
  reviewCount: number;
  serviceTypes: ServiceType[];
  isVerified: boolean;
  badge?: StudentBadge;
  isAvailable: boolean;
  profilePhotoKey?: string;
  completedMissions: number;
  bio: string;
}
