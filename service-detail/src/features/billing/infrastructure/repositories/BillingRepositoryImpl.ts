/**
 * Billing Repository Implementation - Infrastructure Layer
 * Implementa BillingRepository usando APIs reales
 */

import { api } from "../../../../shared/api/apiClient";
import type {
	BillingRepository,
	Billing,
	TotalOwe,
	BillingApiParams,
	TotalOwedParams,
} from "../../domain/repositories/BillingRepository";
import { handleApiError } from "../types/common";

export class BillingRepositoryImpl implements BillingRepository {
	async getInvoices(params: BillingApiParams): Promise<Billing> {
		try {
			console.log("🔄 Fetching invoices...", params);

			const response = await api.get(
				`/electricity-supply-service/billing/billing/${params.ess_id}`,
				{
					params: {
						page: params.page || 1,
						month_filter: params.month_filter || "",
					},
				},
			);

			console.log("✅ Invoices fetched:", response.data);
			return response.data;
		} catch (error: unknown) {
			console.error("❌ Error fetching invoices:", error);
			handleApiError(error, "Error obteniendo facturas");
		}
	}

	async getTotalOwed(params: TotalOwedParams): Promise<TotalOwe> {
		try {
			console.log("🔄 Fetching total owed...", params);

			const response = await api.get(
				`/electricity-supply-service/billing/billing/total_owe/${params.ess_id}`,
			);

			console.log("✅ Total owed fetched:", response.data);
			return response.data;
		} catch (error: unknown) {
			console.error("❌ Error fetching total owed:", error);
			handleApiError(error, "Error obteniendo deuda total");
		}
	}

	async downloadInvoiceGroup(documentIds: string[]): Promise<Blob> {
		try {
			console.log("🔄 Downloading invoices...", documentIds);

			const response = await api.post(
				"/documents/download-group",
				{
					document_ids: documentIds,
				},
				{
					responseType: "blob",
					headers: {
						Accept: "application/pdf",
					},
				},
			);

			console.log("✅ Invoices downloaded");
			return response.data;
		} catch (error: unknown) {
			console.error("❌ Error downloading invoices:", error);
			handleApiError(error, "Error descargando facturas");
		}
	}
}
