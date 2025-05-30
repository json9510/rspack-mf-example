import type { AuthRepository } from "../domain/AuthRepository";
import type { Session } from "../domain/session";

export const loginUser = async (
	repo: AuthRepository,
	email: string,
	password: string,
): Promise<Session> => {
	return await repo.loginUser(email, password);
};

export function logoutUseCase() {
	localStorage.removeItem("token");
}
