import { create } from "zustand";
import { clients, type ClientKey } from "./clientConfig";

export type BrandingStore = {
	currentClient: ClientKey;
	primaryColor: string;
	secondaryColor: string;
	logoUrl: string;
	setClient: (clientKey: ClientKey) => void;
};

export const useBrandingStore = create<BrandingStore>((set) => {
	const defaultClient: ClientKey = "enerBit";
	const cfg = clients[defaultClient];

	return {
		currentClient: defaultClient,
		primaryColor: cfg.primaryColor,
		secondaryColor: cfg.secondaryColor,
		logoUrl: cfg.logoUrl,
		setClient: (clientKey) => {
			const clientConfig = clients[clientKey];
			set({
				currentClient: clientKey,
				primaryColor: clientConfig.primaryColor,
				secondaryColor: clientConfig.secondaryColor,
				logoUrl: clientConfig.logoUrl,
			});
		},
	};
});
