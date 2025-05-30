/**
 * Billing Feature Exports
 * Following Feature-Sliced Design architecture pattern
 */

// Main composition root
export * from "./lib";

// UI Components
export { BillingTab } from "./ui/organisms/BillingTab";

// Types (re-export from domain)
export type {
	BillingRepository,
	Billing,
	BillingInvoice,
} from "./domain/repositories/BillingRepository";

// Legacy exports (for backward compatibility)
export { useBillingStore } from "./model/billing-store";
