import axios from "axios";
import { useAuthStore } from "../../features/auth/model/auth-store";

const apiClient = axios.create({
	baseURL: "https://ops.enerbit.dev/",
	timeout: 10000,
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		Accept: "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().user?.access_token;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

export default apiClient;
