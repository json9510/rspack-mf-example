import apiClient from "../../../shared/api/apiClient";

export const loginRequest = async (email: string, password: string) => {
	try {
		const response = await apiClient.post("/auth/token/", {
			username: email,
			password: password,
		});
		return response.data;
	} catch (error) {
		throw new Error("Login failed");
	}
};
