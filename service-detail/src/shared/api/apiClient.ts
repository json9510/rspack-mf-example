/**
 * API Client para Service Detail App
 * Utiliza el apiClient compartido del Host App a través de Module Federation
 */

// @ts-ignore - Module Federation dynamic import

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let hostApiClient: any = null;

/**
 * Lazy load del apiClient desde el host
 */
const getApiClient = async () => {
	if (hostApiClient) return hostApiClient;

	try {
		// @ts-ignore - Module Federation import
		const { default: apiClient } = await import("host/apiClient");
		hostApiClient = apiClient;
		console.log("✅ API Client cargado desde Host App via Module Federation");
		console.log("🔗 Using Host API configuration");
		return hostApiClient;
	} catch (error) {
		console.error("❌ Error cargando API Client desde Host:", error);
		console.error("🚨 CRITICAL: Module Federation apiClient no disponible");

		// En desarrollo, lanzar error para forzar fix
		if (process.env.NODE_ENV === "development") {
			throw new Error(
				"❌ Host apiClient no disponible. Verifica que host-app esté corriendo en puerto 3000",
			);
		}

		// Solo en producción usar fallback
		const { default: axios } = await import("axios");
		hostApiClient = axios.create({
			baseURL: "https://ops.enerbit.me/",
			timeout: 10000,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Accept: "application/json",
			},
		});

		console.log("⚠️ Usando API Client fallback (solo producción)");
		return hostApiClient;
	}
};

/**
 * Wrapper para hacer requests con el apiClient del host
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const apiRequest = async (config: { method: any; url: any }) => {
	const client = await getApiClient();
	console.log(
		"🌐 Making API request via Host client:",
		config.method || "GET",
		config.url,
	);
	return client(config);
};

/**
 * Métodos de conveniencia para diferentes tipos de requests
 */
export const api = {
	get: async (url: string, config = {}) => {
		const client = await getApiClient();
		console.log("🌐 GET request via Host client:", url);
		return client.get(url, config);
	},

	post: async (url: string, data = {}, config = {}) => {
		const client = await getApiClient();
		console.log("🌐 POST request via Host client:", url);
		return client.post(url, data, config);
	},

	put: async (url: string, data = {}, config = {}) => {
		const client = await getApiClient();
		console.log("🌐 PUT request via Host client:", url);
		return client.put(url, data, config);
	},

	delete: async (url: string, config = {}) => {
		const client = await getApiClient();
		console.log("🌐 DELETE request via Host client:", url);
		return client.delete(url, config);
	},

	patch: async (url: string, data = {}, config = {}) => {
		const client = await getApiClient();
		console.log("🌐 PATCH request via Host client:", url);
		return client.patch(url, data, config);
	},
};

// Debug helper para verificar qué cliente se está usando
export const debugApiClient = async () => {
	const client = await getApiClient();
	console.log("🔍 Current API Client config:", {
		baseURL: client.defaults?.baseURL,
		timeout: client.defaults?.timeout,
		headers: client.defaults?.headers,
	});
	return client;
};

export default api;
