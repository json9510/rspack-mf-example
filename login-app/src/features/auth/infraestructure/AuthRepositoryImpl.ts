import type { AuthRepository } from "../domain/AuthRepository";
import type { Session } from "../domain/session";
import { loginRequest } from "./api";

export class AuthRepositoryImpl implements AuthRepository {
	async loginUser(email: string, password: string): Promise<Session> {
		const data = await loginRequest(email, password);
		return {
			access_token: data.access_token,
			refresh_token: data.refresh_token,
			email: email,
		};
	}
}
