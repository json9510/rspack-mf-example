/**
 * Get Service Status Use Case - Application Layer
 * Orquesta la lógica para obtener el estado de un servicio
 */

import type { ServiceRepository } from "../../domain/repositories/ServiceRepository";

interface ServiceStorePort {
	setServiceStatus: (status: any) => void;
	setServiceStatusError: (error: any) => void;
	setLoading: (key: string, loading: boolean) => void;
}

export class GetServiceStatusUseCase {
	constructor(
		private serviceRepository: ServiceRepository,
		private serviceStore: ServiceStorePort,
	) {}

	async execute(serviceId: string): Promise<void> {
		this.serviceStore.setLoading("isLoadingServiceStatus", true);
		this.serviceStore.setServiceStatusError(null);

		try {
			console.log("⚡ GetServiceStatusUseCase: Executing for", serviceId);

			const statusData = await this.serviceRepository.getServiceStatus(
				serviceId,
			);

			this.serviceStore.setServiceStatus(statusData);
			console.log("✅ GetServiceStatusUseCase: Service status loaded successfully");
		} catch (error: any) {
			console.error("❌ GetServiceStatusUseCase: Error:", error);
			this.serviceStore.setServiceStatusError({ message: error.message });
		} finally {
			this.serviceStore.setLoading("isLoadingServiceStatus", false);
		}
	}
}
