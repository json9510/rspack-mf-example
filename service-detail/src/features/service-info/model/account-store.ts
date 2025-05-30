/**
 * Account Store
 * Manages account and user data following Clean Architecture
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
	AppUser,
	UsersServiceAccount,
} from "../domain/repositories/AccountRepository";

interface AccountState {
	// State
	usersServiceAccount: UsersServiceAccount | null;
	appUsers: AppUser[];
	appUser: AppUser | null;
	selectedAppUser: AppUser | null;
	isLoadingUsersServiceAccount: boolean;
	isLoadingAppUsers: boolean;
	hasErrorAppUsers: string | null;

	// Store Port Implementation (for use cases)
	setUsersServiceAccount: (users: UsersServiceAccount) => void;
	setAppUsers: (users: AppUser[]) => void;
	setCurrentUser: (data: { appUsers: AppUser }) => void;
	setSelectedUser: (user: AppUser) => void; // New method for user selection
	setLoading: (key: string, loading: boolean) => void;
	setError: (key: string, error: string | null) => void;

	// Legacy actions (for backward compatibility)
	fetchServiceAccountRelationships: (serviceAccountId: string) => Promise<void>;
	fetchAppUsers: (userIds: string[]) => Promise<void>;
	resetState: () => void;
}

const initialAccountState = {
	usersServiceAccount: null,
	appUsers: [],
	appUser: null,
	selectedAppUser: null,
	isLoadingUsersServiceAccount: false,
	isLoadingAppUsers: false,
	hasErrorAppUsers: null,
};

export const useAccountStore = create<AccountState>()(
	devtools(
		(set, get) => ({
			...initialAccountState,

			// Store Port Implementation (for use cases)
			setUsersServiceAccount: (usersServiceAccount) =>
				set({ usersServiceAccount }),
			setAppUsers: (appUsers) =>
				set({
					appUsers,
					selectedAppUser: appUsers[0] || null,
				}),
			setCurrentUser: ({ appUsers }) => set({ selectedAppUser: appUsers }),
			setSelectedUser: (selectedAppUser) => set({ selectedAppUser }), // New implementation
			setLoading: (key, loading) => set({ [key]: loading } as any),
			setError: (key, error) => set({ [key]: error } as any),

			// Legacy actions (for backward compatibility - will be deprecated)
			fetchServiceAccountRelationships: async (serviceAccountId: string) => {
				console.warn(
					"⚠️ fetchServiceAccountRelationships is deprecated. Use GetServiceAccountRelationshipsUseCase instead.",
				);
				// Implementation delegated to use case
			},

			fetchAppUsers: async (userIds: string[]) => {
				set({ isLoadingAppUsers: true, hasErrorAppUsers: null });
				try {
					// This will still work for auto-fetching from use case
					const { AccountRepositoryImpl } = await import(
						"../infrastructure/repositories/AccountRepositoryImpl"
					);
					const repository = new AccountRepositoryImpl();
					const appUsersData = await repository.getAppUsers(userIds);

					set({
						appUsers: appUsersData,
						selectedAppUser: appUsersData[0] || null,
						isLoadingAppUsers: false,
					});
				} catch (error: any) {
					set({ hasErrorAppUsers: error.message, isLoadingAppUsers: false });
				}
			},

			resetState: () => set(initialAccountState),
		}),
		{ name: "account-store" },
	),
);
