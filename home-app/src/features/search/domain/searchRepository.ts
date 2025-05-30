import type { ResultsResponse } from "../../results/domain/results";

export interface SearchRepository {
	search(query: string): Promise<ResultsResponse[]>;
}
