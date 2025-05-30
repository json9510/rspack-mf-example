/**
 * Account Repository Interface - Domain Layer
 * Define los contratos para operaciones de cuentas y usuarios
 */

// Enums para frontier types
export const ImportExportStatus = {
	ExportFrontier: "EXPORT_FRONTIER" as const,
	ImportFrontier: "IMPORT_FRONTIER" as const
} as const;

// Type aliases para mejor claridad
export type ExportFrontier = typeof ImportExportStatus.ExportFrontier;
export type ImportFrontier = typeof ImportExportStatus.ImportFrontier;
export type FrontierType = ExportFrontier | ImportFrontier;

// Interfaces para la estructura real de AppUser
export interface Phone {
	phone: string;
	priority: number;
	id: string;
	personal_information_id: string;
	is_verified: boolean;
	created_at: string;
	updated_at: string | null;
}

export interface Email {
	email: string;
	priority: number;
	id: string;
	personal_information_id: string;
	is_verified: boolean;
	created_at: string;
	updated_at: string | null;
}

export interface PersonalInformation {
	names: string;
	last_names: string;
	legal_id_type: string;
	legal_id_code: string;
	verification_code: string | null;
	billing_estate_id: string | null;
	app_user_id: string;
	birth_date: string | null;
	id: string;
	created_at: string;
	phones: Phone[];
	emails: Email[];
}

export interface AppUser {
	username: string;
	loggable: boolean;
	id: string;
	created_at: string;
	is_first_time: boolean;
	pii: PersonalInformation;
	
	// Legacy compatibility - computed properties
	user_id?: string; // Maps to id
	rol?: string; // Will need to be determined from service relationship
	name?: string; // Maps to pii.names + pii.last_names
	email?: string; // Maps to primary email from pii.emails
	phone?: string; // Maps to primary phone from pii.phones
	document_type?: string; // Maps to pii.legal_id_type
	document_number?: string; // Maps to pii.legal_id_code
}

// Tipo específico para relaciones de cuenta de servicio
export interface ServiceAccountRelationship {
	user_id?: string;
	service_account_id?: string;
	relationship_type?: string;
	status?: string;
	created_at?: string;
	updated_at?: string;
	[key: string]: unknown; // Para propiedades adicionales
}

export interface UsersServiceAccount {
	items?: ServiceAccountRelationship[];
	total?: number;
}

// Estructura real de Frontier
export interface EnerbitFrontier {
	frontier_xm_code: string;
	frontier_xm_registered_from: Date | string | null;
	lead_id: string;
	frontier_type: FrontierType;
	measurement_point_id: string;
	id: string;
	created_at: Date | string;
	updated_at: Date | string;
	
	// Legacy compatibility - computed properties
	name?: string; // Maps to frontier_xm_code
	type?: string; // Maps to frontier_type
	status?: string; // Computed from frontier_type or other logic
}

export interface AccountRepository {
	getServiceAccountRelationships(
		serviceAccountId: string,
	): Promise<UsersServiceAccount>;
	getAppUsers(userIds: string[]): Promise<AppUser[]>;
	getAppUser(userId: string): Promise<AppUser>; // New method for single user
	getCurrentUser(): Promise<AppUser>;
}

export interface AssigneesRepository {
	getEnerbitFrontiers(measurementPointId: string): Promise<EnerbitFrontier[]>;
}
