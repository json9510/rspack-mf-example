/**
 * Billing Store
 * Manages billing data following the home-app architecture pattern
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Billing, TotalOwe } from "../domain/repositories/BillingRepository";

interface BillingState {
	// State
	billing: Billing;
	totalOWed: TotalOwe | undefined;
	essId: string;
	yearFilter: string;
	isLoadingInvoices: boolean;
	isLoadingTotalOwed: boolean;
	isLoadingDocumentGroupDownloaded: boolean;
	errorTotalOwed: string | null;
	errorInvoices: string | null;
	errorTotalOwedDownload: boolean;
	showSnackbar: string | null;

	// Store Port Implementation (for use cases)
	setLoadingInvoices: (loading: boolean) => void;
	setLoadingTotalOwed: (loading: boolean) => void;
	setBilling: (billing: Billing) => void;
	setTotalOwed: (total: TotalOwe) => void;
	setError: (key: string, error: string | null) => void;
	setShowSnackbar: (message: string | null) => void;
	setLoading: (key: string, loading: boolean) => void; // Generic loading method for use cases

	// Additional setters
	setEssId: (id: string) => void;
	setYearFilter: (year: string) => void;
	setLoadingDocumentGroupDownloaded: (loading: boolean) => void;
	setErrorTotalOwedDownload: (error: boolean) => void;

	// Actions
	resetState: () => void;
}

const initialBillingState = {
	billing: {} as Billing,
	totalOWed: undefined,
	essId: "",
	yearFilter: "",
	isLoadingInvoices: false,
	isLoadingTotalOwed: false,
	isLoadingDocumentGroupDownloaded: false,
	errorTotalOwed: null,
	errorInvoices: null,
	errorTotalOwedDownload: false,
	showSnackbar: null,
};

export const useBillingStore = create<BillingState>()(
	devtools(
		(set) => ({
			...initialBillingState,

			// Store Port Implementation
			setLoadingInvoices: (isLoadingInvoices) => set({ isLoadingInvoices }),
			setLoadingTotalOwed: (isLoadingTotalOwed) => set({ isLoadingTotalOwed }),
			setBilling: (billing) => set({ billing }),
			setTotalOwed: (totalOWed) => set({ totalOWed }),
			setError: (key: string, error: string | null) => 
				set({ [key]: error } as Partial<BillingState>),
			setShowSnackbar: (showSnackbar) => set({ showSnackbar }),
			setLoading: (key: string, loading: boolean) => 
				set({ [key]: loading } as Partial<BillingState>),

			// Additional setters
			setEssId: (essId) => set({ essId }),
			setYearFilter: (yearFilter) => set({ yearFilter }),
			setLoadingDocumentGroupDownloaded: (isLoadingDocumentGroupDownloaded) =>
				set({ isLoadingDocumentGroupDownloaded }),
			setErrorTotalOwedDownload: (errorTotalOwedDownload) =>
				set({ errorTotalOwedDownload }),

			// Actions
			resetState: () => set(initialBillingState),
		}),
		{ name: "billing-store" },
	),
);
