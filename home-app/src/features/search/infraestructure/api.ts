import EventSource from "react-native-sse";
import type { EventSourceListener } from "react-native-sse";
// features/search/infrastructure/sseSearchClient.ts
import type { ResultsResponse } from "../../results/domain/results";
import type { SSEEvent } from "../domain/event-source";
import { useSearchStore } from "../model/search-store";

// @ts-ignore
const { refreshToken } = await import("host/token");

const BASE_URL = "https://ops.enerbit.me";
let es: EventSource<string> | null = null;

export const initializeEventSource = async (token: string, query: string) => {
	const setResults = useSearchStore.getState().setResults;
	const url = new URL("/search/lookfor", BASE_URL);
	url.searchParams.append("query", query);

	const connectEventSource = (token: string) => {
		es = new EventSource(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	};

	if (es) {
		es.close();
		es = null;
	}

	connectEventSource(token);

	let items = [] as ResultsResponse[];

	const itemsPromise = new Promise<ResultsResponse[]>((resolve, reject) => {
		const listener = async (event: SSEEvent) => {
			switch (event.type) {
				case "search": {
					const data = JSON.parse(event.data);
					items = [...items, data];
					setResults(data);
					break;
				}
				case "error":
					if (event.xhrStatus === 401) {
						es?.close();
						const newToken = await refreshToken();
						connectEventSource(newToken);
						es?.addEventListener(
							"search",
							listener as EventSourceListener<"search">,
						);
						es?.addEventListener("end", listener);
						es?.addEventListener(
							"error",
							listener as EventSourceListener<"error">,
						);
					} else {
						reject(event.message);
					}
					break;
				case "exception":
					reject(event.message);
					break;
				case "end":
					es?.close();
					resolve(items);
					break;
			}
		};

		es?.addEventListener("search", listener as EventSourceListener<"search">);
		es?.addEventListener("end", listener);
		es?.addEventListener("error", listener as EventSourceListener<"error">);
	});

	return await itemsPromise;
};
