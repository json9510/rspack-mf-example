import { create } from "zustand";
import type { User } from "../auth/domain/User";

type AuthState = {
	user: User | null;
	setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
