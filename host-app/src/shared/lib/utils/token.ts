import apiClient from "../../api/apiClient";
import { getSessionFromStorage } from "./localStorage";

const authInfo = getSessionFromStorage();

export const refreshToken = async (): Promise<string | null> => {
	try {
		const body = {
			refresh_token: authInfo.state.session.refresh_token,
		};
		const headers = {
			Accept: "application/json",
			"Content-Type": "application/json",
		};
		const { data } = await apiClient.post("/auth/token/refresh", body, {
			headers,
		});
		return data.access_token;
	} catch (error) {
		console.error("Error refreshing token:", error);
		return null;
	}
};

export const updateAccessToken = (accessToken: string) => {
	authInfo.state.session.access_token = accessToken;
	localStorage.setItem("auth", JSON.stringify(authInfo));
};

export const validateToken = (token: string): boolean => {
	try {
		const [, payload] = token.split(".");
		const decoded = JSON.parse(atob(payload));
		const exp = decoded.exp * 1000;
		return Date.now() < exp;
	} catch {
		return false;
	}
};
