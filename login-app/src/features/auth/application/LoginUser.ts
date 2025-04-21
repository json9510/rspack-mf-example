import { loginUser } from "../infraestructure/api";

export async function loginUseCase(email: string, password: string) {
	const response = await loginUser(email, password);
	return response;
}

export function logoutUseCase() {
	localStorage.removeItem("token");
}
