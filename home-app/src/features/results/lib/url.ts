import type { ObjectKeyValue, Url } from "../domain/results";

export const buildUrl = (metaData: ObjectKeyValue, url: Url) => {
	const { pathParams, queryParams, base } = url;

	const params = pathParams ? pathParams.map((key) => metaData[key]) : [];
	const queries = queryParams
		? queryParams.reduce(
				(acc, q) => {
					acc[q.name] = metaData[q.key];
					return acc;
				},
				{} as Record<string, string>,
			)
		: {};

	const urlWithPathParams = `${base}${params.length > 0 ? `/${params.join("/")}` : ""}`;

	const urlSearchParams = new URLSearchParams(queries);

	const fullUrl = urlSearchParams.toString()
		? `${urlWithPathParams}?${urlSearchParams.toString()}`
		: urlWithPathParams;

	return fullUrl;
};
