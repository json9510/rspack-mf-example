/**
 * Service Repository Interface - Domain Layer
 * Define los contratos para obtener información de servicios
 */

// Tipos específicos para ServiceData
export interface ServiceTag {
	id?: string;
	name?: string;
	value?: string;
	type?: string;
}

export interface EnerbitElectricitySupplyService {
	id?: string;
	status?: string;
	service_type?: string;
	contract_power?: number;
	current_power?: number;
	[key: string]: unknown; // Para propiedades adicionales
}

export interface ServiceData {
	id: string;
	measurement_point_id?: string;
	service_account_id?: string;
	owner_id?: string;
	started_at?: string;
	ended_at?: string;
	tags?: ServiceTag[];
	m_counter?: string;
	meter?: {
		id?: string;
		serial?: string;
	};
	creg_subscriber?: {
		niu?: string;
		voltage_level?: { sui_code?: string };
		asset_ownership?: { sui_code?: string };
		sui_social_stratum?: { sui_code?: string; description?: string };
	};
	service_agreement?: { contribution_flag?: boolean };
	estate?: {
		id: string;
		address?: string;
		state?: string;
		city?: string;
	};
	enerbit_electricity_supply_service?: EnerbitElectricitySupplyService;
}

export interface ServiceStatus {
	relay_status?: "ON" | "OFF";
	last_communication?: string;
	signal_quality?: number;
}

// Import for ServiceFilters type
import type { ServiceFilters } from "../../infrastructure/types/common";

export interface ServiceRepository {
	getServiceInfo(serviceId: string): Promise<ServiceData>;
	getServiceStatus(serviceId: string): Promise<ServiceStatus>;
	getServiceList(filters?: ServiceFilters): Promise<ServiceData[]>;
	updateServiceInfo(
		serviceId: string,
		updateData: Partial<ServiceData>,
	): Promise<ServiceData>;
}
