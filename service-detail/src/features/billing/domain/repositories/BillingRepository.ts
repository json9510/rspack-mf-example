/**
 * Billing Repository Interface - Domain Layer
 * Define los contratos para operaciones de facturación
 */

export interface BillingInvoice {
	document_id?: string;
	document_type?: string;
	issued_at?: string;
	legal_payable_amount?: number;
	payment_status?: string;
	service_type_name?: string;
}

export interface BillingDetail {
	issued_at?: string;
	items?: BillingInvoice[];
	total_owe_amount?: number;
	total_payable_amount?: number;
}

export interface Billing {
	items?: BillingDetail[];
	next_pages?: number;
	page?: number;
	size?: number;
}

export interface TotalOweDue {
	TotalOwe: number;
	UnpaidDocuments: string[];
}

export interface TotalOwe {
	total_owe: TotalOweDue;
}

export interface BillingApiParams {
	ess_id: string;
	page?: number;
	month_filter?: string;
	size?: number;
}

export interface TotalOwedParams {
	ess_id: string;
	month_filter?: string;
}

export interface BillingRepository {
	getInvoices(params: BillingApiParams): Promise<Billing>;
	getTotalOwed(params: TotalOwedParams): Promise<TotalOwe>;
	downloadInvoiceGroup(documentIds: string[]): Promise<Blob>;
}
