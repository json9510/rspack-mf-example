/**
 * Billing Feature Composition Root
 * Combina use cases, repositories y stores siguiendo Clean Architecture
 */

import {
	GetBillingInvoicesUseCase,
	GetTotalOwedUseCase,
	DownloadInvoiceGroupUseCase,
} from "../application/use-cases/GetBillingUseCase";

import { BillingRepositoryImpl } from "../infrastructure/repositories/BillingRepositoryImpl";

import { useBillingStore } from "../model/billing-store";

/**
 * Hook que expone todos los use cases configurados con sus dependencias
 * Sigue el patrón de Composition Root para Dependency Injection
 */
export const useBillingUseCases = () => {
	// Stores
	const billingStore = useBillingStore();

	// Repository instances
	const billingRepository = new BillingRepositoryImpl();

	// Use case instances with injected dependencies
	const getBillingInvoices = new GetBillingInvoicesUseCase(
		billingRepository,
		billingStore,
	);

	const getTotalOwed = new GetTotalOwedUseCase(
		billingRepository,
		billingStore,
	);

	const downloadInvoiceGroup = new DownloadInvoiceGroupUseCase(
		billingRepository,
		billingStore,
	);

	return {
		// Billing Use Cases
		getBillingInvoices,
		getTotalOwed,
		downloadInvoiceGroup,

		// Direct store access (for backward compatibility)
		stores: {
			billing: billingStore,
		},
	};
};

/**
 * Export individual stores for direct usage when needed
 */
export { useBillingStore };

/**
 * Export use cases types for TypeScript
 */
export type BillingUseCases = ReturnType<typeof useBillingUseCases>;
