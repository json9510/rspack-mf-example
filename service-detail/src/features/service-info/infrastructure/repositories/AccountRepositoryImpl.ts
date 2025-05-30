/**
 * Account Repository Implementation - Infrastructure Layer
 * Implementa AccountRepository y AssigneesRepository usando APIs reales
 */

import { api } from "../../../../shared/api/apiClient";
import type {
	AccountRepository,
	AssigneesRepository,
	AppUser,
	UsersServiceAccount,
	EnerbitFrontier,
} from "../../domain/repositories/AccountRepository";
import { handleApiError } from "../types/common";
import { transformAppUser, transformAppUserList } from "../../domain/utils/appUserUtils";
import { transformEnerbitFrontier, transformEnerbitFrontierList } from "../../domain/utils/frontierUtils";

export class AccountRepositoryImpl implements AccountRepository {
	async getServiceAccountRelationships(
		serviceAccountId: string,
	): Promise<UsersServiceAccount> {
		try {
			console.log(
				"🔄 Fetching service account relationships...",
				serviceAccountId,
			);

			const response = await api.get(
				`/accounts/service-accounts-relationships/?service_account_id=${serviceAccountId}`,
			);

			console.log("✅ Service account relationships fetched:", response.data);
			return response.data;
		} catch (error: unknown) {
			console.error("❌ Error fetching service account relationships:", error);
			handleApiError(error, "Error obteniendo relaciones de cuenta");
		}
	}

	async getAppUsers(userIds: string[]): Promise<AppUser[]> {
		try {
			console.log("🔄 Fetching app users...", userIds);

			const response = await api.get("/app-users", {
				params: {
					user_ids: userIds.join(","),
				},
			});

			console.log("✅ App users fetched (raw):", response.data);
			
			// Get the users array from response
			const rawUsers = response.data.items || response.data;
			
			// Transform to legacy compatible format
			const transformedUsers = transformAppUserList(rawUsers);
			console.log("✅ App users transformed:", transformedUsers);
			
			return transformedUsers;
		} catch (error: unknown) {
			console.error("❌ Error fetching app users:", error);
			handleApiError(error, "Error obteniendo información de usuarios");
		}
	}

	async getAppUser(userId: string): Promise<AppUser> {
		try {
			console.log("🔄 Fetching single app user...", userId);

			const response = await api.get(`/users/app-users/${userId}`);

			console.log("✅ Single app user fetched (raw):", response.data);
			
			// Transform to legacy compatible format
			const transformedUser = transformAppUser(response.data);
			console.log("✅ Single app user transformed:", transformedUser);
			
			return transformedUser;
		} catch (error: unknown) {
			console.error("❌ Error fetching single app user:", error);
			handleApiError(error, "Error obteniendo información del usuario");
		}
	}

	async getCurrentUser(): Promise<AppUser> {
		try {
			console.log("🔄 Fetching current user...");

			const response = await api.get("/app-users/me");

			console.log("✅ Current user fetched (raw):", response.data);
			
			// Transform to legacy compatible format
			const transformedUser = transformAppUser(response.data);
			console.log("✅ Current user transformed:", transformedUser);
			
			return transformedUser;
		} catch (error: unknown) {
			console.error("❌ Error fetching current user:", error);
			handleApiError(error, "Error obteniendo usuario actual");
		}
	}
}

export class AssigneesRepositoryImpl implements AssigneesRepository {
	async getEnerbitFrontiers(
		measurementPointId: string,
	): Promise<EnerbitFrontier[]> {
		try {
			console.log("🔄 Fetching enerbit frontiers...", measurementPointId);

			const response = await api.get(
				`/assignees/frontiers?measurement_point_id=${measurementPointId}`,
			);

			console.log("✅ Enerbit frontiers fetched (raw):", response.data);
			
			// Get the frontiers array from response
			const rawFrontiers = response.data.items || response.data;
			
			// Transform to legacy compatible format
			const transformedFrontiers = transformEnerbitFrontierList(rawFrontiers);
			console.log("✅ Enerbit frontiers transformed:", transformedFrontiers);
			
			return transformedFrontiers;
		} catch (error: unknown) {
			console.error("❌ Error fetching enerbit frontiers:", error);
			handleApiError(error, "Error obteniendo fronteras");
		}
	}
}
