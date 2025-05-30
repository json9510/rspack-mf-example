import axios, {
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";
import { getSessionFromStorage } from "../lib/utils/localStorage";
import { refreshToken, updateAccessToken } from "../lib/utils/token";

const apiClient = axios.create({
	baseURL: "https://ops.enerbit.me/",
	timeout: 10000,
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		Accept: "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const session = getSessionFromStorage();
		const token = session?.access_token;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const accessToken = await refreshToken();
			updateAccessToken(accessToken || "");
			apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
			return apiClient(originalRequest);
		}

		return Promise.reject(error);
	},
);

export default apiClient;
