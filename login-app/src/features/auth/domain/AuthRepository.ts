import type { Session } from "./session";

export interface AuthRepository {
	loginUser(email: string, password: string): Promise<Session>;
}
