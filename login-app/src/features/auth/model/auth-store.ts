// src/features/auth/auth-store.ts
import { create } from "zustand";
import { loginUseCase } from "../application/LoginUser";
import type { User } from "../domain/user";

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isRequestingLogin: boolean;
	setRequestingLogin: (isRequestingLogin: boolean) => void;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	token: null,
	isAuthenticated: false,
	isRequestingLogin: false,
	setRequestingLogin: (isRequestingLogin) => set({ isRequestingLogin }),
	login: async (email, password) => {
		
		const user = await loginUseCase(email, password);
		set({
			user,
			isAuthenticated: true,
			isRequestingLogin: false,
		});
	},
	logout: () => {
		set({
			user: null,
			isAuthenticated: false,
		});
	},
}));
