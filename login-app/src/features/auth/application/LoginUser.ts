import { loginApi } from "../infraestructure/api";
import { useAuthStore } from "../auth-store";

export async function loginUser(email: string, password: string) {
	const user = await loginApi(email, password);
	useAuthStore.getState().setUser(user);
	return user;
}
