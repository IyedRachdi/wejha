import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Mission {
    id: MissionId;
    createdAt: Timestamp;
    description: string;
    isActive: boolean;
    durationMinutes: bigint;
    category: ServiceType;
    payoutAmount: bigint;
    pointsReward: bigint;
}
export type BookingId = bigint;
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: UserId;
} | {
    __kind__: "err";
    err: string;
};
export interface ProviderSummary {
    id: UserId;
    name: string;
    role: UserRole;
    trustScore: bigint;
    isAvailable: boolean;
    verifiedBadge: boolean;
    badge: StudentBadge;
    profilePhotoKey?: string;
}
export interface BookingRequest {
    serviceType: ServiceType;
    isPriority: boolean;
    notes: string;
    locationText: string;
    dateTime: Timestamp;
}
export interface StudentDashboard {
    activeBookings: Array<BookingId>;
    recentMissions: Array<MissionId>;
    profile: UserProfile;
}
export type Result_1 = {
    __kind__: "ok";
    ok: BookingId;
} | {
    __kind__: "err";
    err: string;
};
export type Result_4 = {
    __kind__: "ok";
    ok: StudentProgress;
} | {
    __kind__: "err";
    err: string;
};
export type UserId = Principal;
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type Result_3 = {
    __kind__: "ok";
    ok: UserProfile;
} | {
    __kind__: "err";
    err: string;
};
export interface StudentProgress {
    completedMissions: bigint;
    badge: Variant_bronze_gold_silver;
    totalEarnings: bigint;
    points: bigint;
}
export interface Booking {
    id: BookingId;
    status: BookingStatus;
    serviceType: ServiceType;
    isPriority: boolean;
    createdAt: Timestamp;
    pmrUserId: UserId;
    notes: string;
    missionId?: MissionId;
    locationText: string;
    dateTime: Timestamp;
    providerId?: UserId;
}
export type MissionId = bigint;
export interface UserProfile {
    id: UserId;
    isPremium: boolean;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    driverLicense?: string;
    trustScore: bigint;
    pmrLabel: boolean;
    isAvailable: boolean;
    totalEarningsStudent: bigint;
    completedMissions: bigint;
    familyMembers: Array<UserId>;
    verifiedBadge: boolean;
    badge: StudentBadge;
    profilePhotoKey?: string;
    phone: string;
    totalEarningsDriver: bigint;
    points: bigint;
}
export enum BookingStatus {
    requested = "requested",
    cancelled = "cancelled",
    arrived = "arrived",
    completed = "completed",
    confirmed = "confirmed",
    enRoute = "enRoute"
}
export enum ServiceType {
    homeHelp = "homeHelp",
    other = "other",
    transport = "transport",
    shopping = "shopping",
    medical = "medical"
}
export enum UserRole {
    pmr = "pmr",
    student = "student",
    driver = "driver"
}
export enum Variant_bronze_gold_silver {
    bronze = "bronze",
    gold = "gold",
    silver = "silver"
}
export enum Variant_student_driver {
    student = "student",
    driver = "driver"
}
export interface backendInterface {
    acceptMission(missionId: MissionId): Promise<Result_1>;
    addFamilyMember(member: UserId): Promise<Result>;
    completeMission(bookingId: BookingId): Promise<Result_4>;
    getAvailableMissions(): Promise<Array<Mission>>;
    getDriverQueue(): Promise<Array<Booking>>;
    getMyBookings(): Promise<Array<Booking>>;
    getMyProfile(): Promise<Result_3>;
    getMyStudentDashboard(): Promise<StudentDashboard>;
    getPublicProviders(serviceType: Variant_student_driver, minRating: bigint): Promise<Array<ProviderSummary>>;
    registerUser(role: UserRole, name: string, phone: string): Promise<Result_2>;
    removeFamilyMember(member: UserId): Promise<Result>;
    requestBooking(req: BookingRequest): Promise<Result_1>;
    submitReview(bookingId: BookingId, stars: bigint, text: string): Promise<Result>;
    subscribePremium(): Promise<Result>;
    toggleDriverAvailability(isAvailable: boolean): Promise<Result>;
    updateBookingStatus(bookingId: BookingId, newStatus: BookingStatus): Promise<Result>;
    updateProfile(name: string, phone: string, profilePhotoKey: string | null): Promise<Result>;
    uploadVerificationDoc(role: UserRole, assetKey: string): Promise<Result>;
}
