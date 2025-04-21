import apiClient from "../../../shared/api/apiClient";

export async function loginUser(email: string, password: string) {
	try {
		const response = await apiClient.post("/auth/token/", { username: email, password: password });
		return response.data;
	}
	catch (error) {
		console.error("Error during login:", error);
		throw new Error("Login failed");
	}
}
