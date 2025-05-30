/**
 * Service Info Feature Composition Root
 * Combina use cases, repositories y stores siguiendo Clean Architecture
 */

import { GetServiceInfoUseCase } from "../application/use-cases/GetServiceInfoUseCase";
import { GetServiceStatusUseCase } from "../application/use-cases/GetServiceStatusUseCase";
import {
	GetServiceAccountRelationshipsUseCase,
	GetEnerbitFrontiersUseCase,
	GetSpecificAppUserUseCase,
} from "../application/use-cases/GetAccountUseCase";

import { ServiceRepositoryImpl } from "../infrastructure/repositories/ServiceRepositoryImpl";
import {
	AccountRepositoryImpl,
	AssigneesRepositoryImpl,
} from "../infrastructure/repositories/AccountRepositoryImpl";

import { useInformationStore } from "../model/information-store";
import { useAccountStore } from "../model/account-store";
import { useAssigneesStore } from "../model/assignees-store";

/**
 * Hook que expone todos los use cases configurados con sus dependencias
 * Sigue el patrón de Composition Root para Dependency Injection
 */
export const useServiceInfoUseCases = () => {
	// Stores
	const informationStore = useInformationStore();
	const accountStore = useAccountStore();
	const assigneesStore = useAssigneesStore();

	// Repository instances
	const serviceRepository = new ServiceRepositoryImpl();
	const accountRepository = new AccountRepositoryImpl();
	const assigneesRepository = new AssigneesRepositoryImpl();

	// Use case instances with injected dependencies
	const getServiceInfo = new GetServiceInfoUseCase(
		serviceRepository,
		informationStore,
	);

	const getServiceStatus = new GetServiceStatusUseCase(
		serviceRepository,
		informationStore,
	);

	const getServiceAccountRelationships =
		new GetServiceAccountRelationshipsUseCase(
			accountRepository,
			accountStore,
		);

	const getSpecificAppUser = new GetSpecificAppUserUseCase(
		accountRepository,
		accountStore,
	);

	const getEnerbitFrontiers = new GetEnerbitFrontiersUseCase(
		assigneesRepository,
		assigneesStore,
	);

	return {
	// Service Use Cases
	getServiceInfo,
	getServiceStatus,

	// Account Use Cases
	getServiceAccountRelationships,
	getSpecificAppUser,
			getEnerbitFrontiers,

	// Direct store access (for backward compatibility)
	stores: {
	information: informationStore,
	account: {
	...accountStore,
	// Expose additional methods for UserSelector
	appUsers: accountStore.appUsers,
	 setSelectedUser: accountStore.setSelectedUser,
	},
	 assignees: assigneesStore,
	 },
		};
};

/**
 * Export individual stores for direct usage when needed
 */
export { useInformationStore, useAccountStore, useAssigneesStore };

/**
 * Export use cases types for TypeScript
 */
export type ServiceInfoUseCases = ReturnType<typeof useServiceInfoUseCases>;
