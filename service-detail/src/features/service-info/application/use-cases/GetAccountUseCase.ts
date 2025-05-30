/**
 * Get Service Account Relationships Use Case - Application Layer
 * Orquesta la lógica para obtener relaciones de cuenta de servicio
 */

import type {
	AccountRepository,
	AssigneesRepository,
} from "../../domain/repositories/AccountRepository";

interface AccountStorePort {
	setUsersServiceAccount: (users: any) => void;
	setAppUsers: (users: AppUser[]) => void; // Added missing method
	setSelectedUser: (user: AppUser) => void; // Added missing method
	setLoading: (key: string, loading: boolean) => void;
	setError: (key: string, error: string | null) => void;
	fetchAppUsers: (userIds: string[]) => Promise<void>;
}

interface AssigneesStorePort {
	setEnerbitFrontiers: (frontiers: any[]) => void;
	setLoading: (key: string, loading: boolean) => void;
	setError: (key: string, error: string | null) => void;
}

export class GetServiceAccountRelationshipsUseCase {
	constructor(
		private accountRepository: AccountRepository,
		private accountStore: AccountStorePort,
	) {}

	async execute(serviceAccountId: string): Promise<void> {
		this.accountStore.setLoading("isLoadingUsersServiceAccount", true);
		this.accountStore.setError("hasErrorAppUsers", null);

		try {
			console.log(
				"👥 GetServiceAccountRelationshipsUseCase: Executing for",
				serviceAccountId,
			);

			const usersData =
				await this.accountRepository.getServiceAccountRelationships(
					serviceAccountId,
				);

			this.accountStore.setUsersServiceAccount(usersData);
			console.log(
				"✅ GetServiceAccountRelationshipsUseCase: Relationships loaded successfully",
			);
		} catch (error: any) {
			console.error("❌ GetServiceAccountRelationshipsUseCase: Error:", error);
			this.accountStore.setError("hasErrorAppUsers", error.message);
		} finally {
			this.accountStore.setLoading("isLoadingUsersServiceAccount", false);
		}
	}
}

export class GetSpecificAppUserUseCase {
	constructor(
		private accountRepository: AccountRepository,
		private accountStore: AccountStorePort,
	) {}

	async execute(userId: string): Promise<void> {
		this.accountStore.setLoading("isLoadingAppUsers", true);
		this.accountStore.setError("hasErrorAppUsers", null);

		try {
			console.log("👥 GetSpecificAppUserUseCase: Executing for", userId);

			const userData = await this.accountRepository.getAppUser(userId);

			// Set as both the app users list (single user) and selected user
			this.accountStore.setAppUsers([userData]);
			this.accountStore.setSelectedUser(userData);
			console.log("✅ GetSpecificAppUserUseCase: User loaded successfully");
		} catch (error: any) {
			console.error("❌ GetSpecificAppUserUseCase: Error:", error);
			this.accountStore.setError("hasErrorAppUsers", error.message);
		} finally {
			this.accountStore.setLoading("isLoadingAppUsers", false);
		}
	}
}

export class GetEnerbitFrontiersUseCase {
	constructor(
		private assigneesRepository: AssigneesRepository,
		private assigneesStore: AssigneesStorePort,
	) {}

	async execute(measurementPointId: string): Promise<void> {
		this.assigneesStore.setLoading("isLoadingFrontiers", true);
		this.assigneesStore.setError("enerbitFrontiersError", null);

		try {
			console.log(
				"🔌 GetEnerbitFrontiersUseCase: Executing for",
				measurementPointId,
			);

			const frontiersData =
				await this.assigneesRepository.getEnerbitFrontiers(measurementPointId);

			this.assigneesStore.setEnerbitFrontiers(frontiersData);
			console.log(
				"✅ GetEnerbitFrontiersUseCase: Frontiers loaded successfully",
			);
		} catch (error: any) {
			console.error("❌ GetEnerbitFrontiersUseCase: Error:", error);
			this.assigneesStore.setError("enerbitFrontiersError", error.message);
		} finally {
			this.assigneesStore.setLoading("isLoadingFrontiers", false);
		}
	}
}
