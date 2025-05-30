// src/features/auth/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session } from "../domain/session";

interface AuthState {
	session: Session | null;
	isAuthenticated: boolean;
	isRequestingLogin: boolean;
	setRequestingLogin: (isRequestingLogin: boolean) => void;
	setSession: (session: Session) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			session: null,
			token: null,
			isAuthenticated: false,
			isRequestingLogin: false,
			setSession: (session) => set({ session }),
			setRequestingLogin: (isRequestingLogin) => set({ isRequestingLogin }),
		}),
		{
			name: "auth",
			partialize: (state) => ({
				session: state.session,
			}),
		},
	),
);
