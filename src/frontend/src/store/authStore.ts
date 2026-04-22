import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile, UserRole } from "../types/wejha";

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userId: string | null;
  userProfile: UserProfile | null;
  setAuth: (userId: string, role: UserRole) => void;
  setRole: (role: UserRole) => void;
  setProfile: (profile: UserProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userRole: null,
      userId: null,
      userProfile: null,
      setAuth: (userId, role) =>
        set({ isAuthenticated: true, userId, userRole: role }),
      setRole: (role) => set({ userRole: role }),
      setProfile: (profile) => set({ userProfile: profile }),
      logout: () =>
        set({
          isAuthenticated: false,
          userRole: null,
          userId: null,
          userProfile: null,
        }),
    }),
    { name: "wejha-auth" },
  ),
);
