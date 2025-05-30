export interface ObjectKeyValue {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any;
}

export interface Results {
	icon: Icon;
	name: string;
	mainColor: string;
	labels: Labels[];
	url: Url;
}

export interface Icon {
	icon: React.ReactNode;
	bgcolor: string;
}

export interface Labels {
	name: string;
	key: string;
	isMain?: boolean;
	icon?: React.ReactNode;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	formatFn?: (o: ObjectKeyValue) => any;
}

export interface Url {
	base: string;
	pathParams?: string[]; // Keys de la meta_data para extraer la información
	queryParams?: { key: string; name: string }[];
}

export interface ResultsResponse {
	id: string;
	entity: string;
	meta_data: ObjectKeyValue;
	tag_name?: string[];
}

export enum Entities {
	METER = "METER",
	SMARTBIT = "SMB",
	APP_USER = "APP_USER",
	FRT = "FRT",
	ESS = "ESS",
	ESTATE = "ESTATES",
}
