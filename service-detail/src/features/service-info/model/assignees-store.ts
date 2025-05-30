/**
 * Assignees Store
 * Manages assignees and frontiers data following Clean Architecture
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { EnerbitFrontier } from "../domain/repositories/AccountRepository";

interface AssigneesState {
	// State
	enerbitFrontiers: EnerbitFrontier[] | null;
	enerbitFrontiersError: string | null;
	isLoadingFrontiers: boolean;

	// Store Port Implementation (for use cases)
	setEnerbitFrontiers: (frontiers: EnerbitFrontier[]) => void;
	setLoading: (key: string, loading: boolean) => void;
	setError: (key: string, error: string | null) => void;

	// Legacy actions (for backward compatibility)
	fetchFrontiers: (measurementPointId: string) => Promise<void>;
	resetState: () => void;
}

const initialAssigneesState = {
	enerbitFrontiers: null,
	enerbitFrontiersError: null,
	isLoadingFrontiers: false,
};

export const useAssigneesStore = create<AssigneesState>()(
	devtools(
		(set, get) => ({
			...initialAssigneesState,

			// Store Port Implementation (for use cases)
			setEnerbitFrontiers: (enerbitFrontiers) => set({ enerbitFrontiers }),
			setLoading: (key, loading) => set({ [key]: loading } as any),
			setError: (key, error) => set({ [key]: error } as any),

			// Legacy actions (for backward compatibility - will be deprecated)
			fetchFrontiers: async (measurementPointId: string) => {
				console.warn(
					"⚠️ fetchFrontiers is deprecated. Use GetEnerbitFrontiersUseCase instead.",
				);
				// Implementation delegated to use case
			},

			resetState: () => set(initialAssigneesState),
		}),
		{ name: "assignees-store" },
	),
);
