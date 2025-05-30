/**
 * Service Repository Implementation - Infrastructure Layer
 * Implementa ServiceRepository usando APIs reales
 */

import { api } from "../../../../shared/api/apiClient";
import type {
	ServiceRepository,
	ServiceData,
	ServiceStatus,
} from "../../domain/repositories/ServiceRepository";
import {
	handleApiError,
	type ServiceFilters,
	type ServiceListResponse,
} from "../types/common";

export class ServiceRepositoryImpl implements ServiceRepository {
	async getServiceInfo(serviceId: string): Promise<ServiceData> {
		try {
			console.log("🔄 Fetching service info...", serviceId);

			const response = await api.get(
				`/electricity-supply-service/manager/electricty-supply-services/${serviceId}`,
			);

			console.log("✅ Service info fetched:", response.data);
			return response.data;
		} catch (error: unknown) {
			console.error("❌ Error fetching service info:", error);
			handleApiError(error, "Error obteniendo información del servicio");
		}
	}

	async getServiceStatus(serviceId: string): Promise<ServiceStatus> {
		try {
			console.log("🔄 Fetching service status...", serviceId);

			const response = await api.get(`/ess/${serviceId}/status`);

			console.log("✅ Service status fetched:", response.data);
			return response.data;
		} catch (error: unknown) {
			console.error("❌ Error fetching service status:", error);
			handleApiError(error, "Error obteniendo estado del servicio");
		}
	}

	async getServiceList(filters: ServiceFilters = {}): Promise<ServiceData[]> {
		try {
			console.log("🔄 Fetching service list...", filters);

			const response = await api.get("/services", {
				params: filters,
			});

			console.log("✅ Service list fetched:", response.data);
			const serviceListResponse = response.data as ServiceListResponse;
			return (serviceListResponse.items as ServiceData[]) || [];
		} catch (error: unknown) {
			console.error("❌ Error fetching service list:", error);
			handleApiError(error, "Error obteniendo lista de servicios");
		}
	}

	async updateServiceInfo(
		serviceId: string,
		updateData: Partial<ServiceData>,
	): Promise<ServiceData> {
		try {
			console.log("🔄 Updating service info...", serviceId, updateData);

			const response = await api.patch(`/ess/${serviceId}`, updateData);

			console.log("✅ Service info updated:", response.data);
			return response.data;
		} catch (error: unknown) {
			console.error("❌ Error updating service info:", error);
			handleApiError(error, "Error actualizando información del servicio");
		}
	}
}
