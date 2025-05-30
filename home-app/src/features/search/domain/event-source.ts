import type { EventSourceListener } from "react-native-sse";

export type EsCustomEvents = "search" | "end";

export interface SearchEvent {
	type: "search";
	data: string;
}

export interface ErrorEvent {
	type: "error";
	xhrStatus?: number;
	message: string;
}

export interface EndEvent {
	type: "end";
}

interface ExceptionEvent {
	type: "exception";
	message: string;
	error: EventSourceListener<"error">;
}

export type SSEEvent = SearchEvent | ErrorEvent | EndEvent | ExceptionEvent;
