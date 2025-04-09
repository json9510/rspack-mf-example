import type { User } from "../domain/User";

export async function loginApi(email: string, password: string): Promise<User> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (email === "admin@enerbit.co" && password === "123456") {
				resolve({
					id: "1",
					email: email,
					token: "fake-token",
				});
			} else {
				reject(new Error("Invalid credentials"));
			}
		}, 3000);
	});
}
