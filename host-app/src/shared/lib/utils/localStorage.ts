export const getSessionFromStorage = () => {
	try {
		const stored = localStorage.getItem("auth");
		const parsed = stored ? JSON.parse(stored) : null;
		return parsed ?? null;
	} catch {
		return null;
	}
};

export const clearSessionStorage = () => {
	localStorage.removeItem("auth");
};
