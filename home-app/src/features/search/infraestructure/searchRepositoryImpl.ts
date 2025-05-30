import type { ResultsResponse } from "../../results/domain/results";
import type { SearchRepository } from "../domain/searchRepository";
import { initializeEventSource } from "./api";

export class SearchRepositoryImpl implements SearchRepository {
	async search(query: string): Promise<ResultsResponse[]> {
		try {
			const authInfo = JSON.parse(localStorage.getItem("auth") ?? "{}");

			const token = authInfo.state.session.access_token;

			if (!token) {
				throw new Error("No access token found in session");
			}

			return await initializeEventSource(token, query);
		} catch (error) {
			console.error("Error en searchStream (SSE):", error);
			return [];
		}
	}
}
