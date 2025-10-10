import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: null | { email: string; token: string, name: string };
  setUser: (user: { email: string; token: string, name: string }) => void;
  logout: () => void;
  hydrated: boolean; // new
  setHydrated: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(); // called when state is restored
      },
    }
  )
);