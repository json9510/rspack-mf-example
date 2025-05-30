/**
 * Get Service Information Use Case - Application Layer
 * Orquesta la lógica para obtener información de un servicio
 */

import type { ServiceRepository } from "../../domain/repositories/ServiceRepository";

interface ServiceStorePort {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	setService: (service: any) => void;
	setLoading: (key: string, loading: boolean) => void;
	setError: (key: string, error: string | null) => void;
}

export class GetServiceInfoUseCase {
	constructor(
		private serviceRepository: ServiceRepository,
		private serviceStore: ServiceStorePort,
	) {}

	async execute(serviceId: string): Promise<void> {
		this.serviceStore.setLoading("isLoadingService", true);
		this.serviceStore.setError("serviceError", null);

		try {
			console.log("🏠 GetServiceInfoUseCase: Executing for", serviceId);

			const serviceData =
				await this.serviceRepository.getServiceInfo(serviceId);

			this.serviceStore.setService(serviceData);
			console.log("✅ GetServiceInfoUseCase: Service info loaded successfully");
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			console.error("❌ GetServiceInfoUseCase: Error:", error);
			this.serviceStore.setError("serviceError", error.message);
		} finally {
			this.serviceStore.setLoading("isLoadingService", false);
		}
	}
}
