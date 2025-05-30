/**
 * Service Information Store
 * Manages service data and status following Clean Architecture
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
	ServiceData,
	ServiceStatus,
} from "../domain/repositories/ServiceRepository";

interface ServiceStatusError {
	message?: string;
}

interface InformationState {
	// State
	service: ServiceData | null;
	serviceStatus: ServiceStatus;
	serviceStatusError: ServiceStatusError | null;
	serviceList: any[];
	isLoadingService: boolean;
	isLoadingServiceStatus: boolean;
	isLoadingServiceList: boolean;
	serviceError: string | null;
	serviceListError: string | null;
	isSuccessCregSubscriberPatch: boolean;

	// Store Port Implementation (for use cases)
	setLoading: (key: string, loading: boolean) => void;
	setService: (service: ServiceData) => void;
	setServiceStatus: (status: ServiceStatus) => void;
	setError: (key: string, error: string | null) => void;

	// Additional setters
	setServiceStatusError: (error: ServiceStatusError | null) => void;
	setServiceList: (list: any[]) => void;

	// Legacy actions (for backward compatibility)
	fetchServiceInfo: (serviceId: string) => Promise<void>;
	fetchServiceStatus: (serviceId: string) => Promise<void>;
	fetchServiceList: (serviceId: string) => Promise<void>;
	resetState: () => void;
}

const initialState = {
	service: null,
	serviceStatus: {} as ServiceStatus,
	serviceStatusError: null,
	serviceList: [],
	isLoadingService: false,
	isLoadingServiceStatus: false,
	isLoadingServiceList: false,
	serviceError: null,
	serviceListError: null,
	isSuccessCregSubscriberPatch: false,
};

export const useInformationStore = create<InformationState>()(
	devtools(
		(set, get) => ({
			...initialState,

			// Store Port Implementation (for use cases)
			setLoading: (key, loading) => set({ [key]: loading } as any),
			setService: (service) => set({ service }),
			setServiceStatus: (serviceStatus) => set({ serviceStatus }),
			setError: (key, error) => set({ [key]: error } as any),

			// Additional setters
			setServiceStatusError: (serviceStatusError) =>
				set({ serviceStatusError }),
			setServiceList: (serviceList) => set({ serviceList }),

			// Legacy actions (for backward compatibility - will be deprecated)
			fetchServiceInfo: async (serviceId: string) => {
				console.warn(
					"⚠️ fetchServiceInfo is deprecated. Use GetServiceInfoUseCase instead.",
				);
				// Implementation delegated to use case
			},

			fetchServiceStatus: async (serviceId: string) => {
				console.warn(
					"⚠️ fetchServiceStatus is deprecated. Use GetServiceStatusUseCase instead.",
				);
				// Implementation delegated to use case
			},

			fetchServiceList: async (serviceId: string) => {
				console.warn(
					"⚠️ fetchServiceList is deprecated. Use appropriate use case instead.",
				);
				// Implementation delegated to use case
			},

			resetState: () => set(initialState),
		}),
		{ name: "information-store" },
	),
);
