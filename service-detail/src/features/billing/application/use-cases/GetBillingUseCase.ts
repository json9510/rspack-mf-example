/**
 * Billing Use Cases - Application Layer
 * Orquestran la lógica para operaciones de facturación
 */

import type {
	BillingRepository,
	BillingApiParams,
	TotalOwedParams,
	Billing,
	TotalOwe,
} from "../../domain/repositories/BillingRepository";
import { handleApiError } from "../../infrastructure/types/common";

interface BillingStorePort {
	setBilling: (billing: Billing) => void;
	setTotalOwed: (total: TotalOwe) => void;
	setLoading: (key: string, loading: boolean) => void;
	setError: (key: string, error: string | null) => void;
	setShowSnackbar: (message: string | null) => void;
}

export class GetBillingInvoicesUseCase {
	constructor(
		private billingRepository: BillingRepository,
		private billingStore: BillingStorePort,
	) {}

	async execute(params: BillingApiParams): Promise<void> {
		this.billingStore.setLoading("isLoadingInvoices", true);
		this.billingStore.setBilling({});
		this.billingStore.setError("errorInvoices", null);

		try {
			console.log("📄 GetBillingInvoicesUseCase: Executing for", params);

			const billingData = await this.billingRepository.getInvoices(params);

			this.billingStore.setBilling(billingData);
			console.log("✅ GetBillingInvoicesUseCase: Invoices loaded successfully");
		} catch (error: unknown) {
			console.error("❌ GetBillingInvoicesUseCase: Error:", error);
			const errorMessage = error instanceof Error ? error.message : "Error desconocido";
			this.billingStore.setError("errorInvoices", errorMessage);
			this.billingStore.setShowSnackbar(
				`❌ Error cargando facturas: ${errorMessage}`,
			);
		} finally {
			this.billingStore.setLoading("isLoadingInvoices", false);
		}
	}
}

export class GetTotalOwedUseCase {
	constructor(
		private billingRepository: BillingRepository,
		private billingStore: BillingStorePort,
	) {}

	async execute(params: TotalOwedParams): Promise<void> {
		this.billingStore.setLoading("isLoadingTotalOwed", true);
		this.billingStore.setError("errorTotalOwed", null);

		try {
			console.log("💰 GetTotalOwedUseCase: Executing for", params);

			const totalOwedData = await this.billingRepository.getTotalOwed(params);

			this.billingStore.setTotalOwed(totalOwedData);
			console.log("✅ GetTotalOwedUseCase: Total owed loaded successfully");
		} catch (error: unknown) {
			console.error("❌ GetTotalOwedUseCase: Error:", error);
			const errorMessage = error instanceof Error ? error.message : "Error desconocido";
			this.billingStore.setError("errorTotalOwed", errorMessage);
		} finally {
			this.billingStore.setLoading("isLoadingTotalOwed", false);
		}
	}
}

export class DownloadInvoiceGroupUseCase {
	constructor(
		private billingRepository: BillingRepository,
		private billingStore: BillingStorePort,
	) {}

	async execute(invoiceIds: string[]): Promise<void> {
		this.billingStore.setLoading("isLoadingDocumentGroupDownloaded", true);
		this.billingStore.setError("errorTotalOwedDownload", null);

		try {
			console.log("📄 DownloadInvoiceGroupUseCase: Executing for", invoiceIds);

			const blob = await this.billingRepository.downloadInvoiceGroup(
				invoiceIds,
			);

			// Create automatic download
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `facturas-${Date.now()}.pdf`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);

			this.billingStore.setShowSnackbar("✅ Descarga completada exitosamente");
			console.log("✅ DownloadInvoiceGroupUseCase: Download completed");
		} catch (error: unknown) {
			console.error("❌ DownloadInvoiceGroupUseCase: Error:", error);
			const errorMessage = error instanceof Error ? error.message : "Error desconocido";
			this.billingStore.setError("errorTotalOwedDownload", errorMessage);
			this.billingStore.setShowSnackbar(
				`❌ Error en la descarga: ${errorMessage}`,
			);
		} finally {
			this.billingStore.setLoading("isLoadingDocumentGroupDownloaded", false);
		}
	}
}
