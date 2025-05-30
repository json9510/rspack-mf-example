import { create } from "zustand";
import type { Entities, ResultsResponse } from "../../results/domain/results";
import { ALLOWED_ENTITIES } from "../../results/domain/config/constants";

interface SearchState {
	results: ResultsResponse[];
	query: string;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	setQuery: (query: string) => void;
	setResults: (result: ResultsResponse) => void;
	clearResults: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
	results: [],
	query: "",
	loading: false,
	setLoading: (loading) => set({ loading }),
	setQuery: (query) => set({ query }),
	setResults: (payload) =>
		set((state) => {
			const newResults = [...state.results, payload];
			const filteredResults = newResults.filter((el) =>
				ALLOWED_ENTITIES.includes(el.entity as Entities),
			);
			return { results: filteredResults };
		}),
	clearResults: () => set({ results: [] }),
}));
