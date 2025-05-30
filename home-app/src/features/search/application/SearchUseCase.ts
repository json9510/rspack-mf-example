import type { ResultsResponse } from "../../results/domain/results";
import type { SearchRepository } from "../domain/searchRepository";

interface SearchStorePort {
	setLoading: (loading: boolean) => void;
}

export class SearchUseCase {
	constructor(
		private searchRepository: SearchRepository,
		private searchStore: SearchStorePort,
	) {}

	async execute(query: string): Promise<void> {
		this.searchStore.setLoading(true);
		try {
			await this.searchRepository.search(query);
		} catch (error) {
			console.error("Error during search in Use Case:", error);
		} finally {
			this.searchStore.setLoading(false);
		}
	}
}
