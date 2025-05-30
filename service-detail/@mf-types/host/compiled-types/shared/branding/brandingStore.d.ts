import { ClientKey } from "./clientConfig";
export type BrandingStore = {
    currentClient: ClientKey;
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    setClient: (clientKey: ClientKey) => void;
};
export declare const useBrandingStore: import("zustand").UseBoundStore<import("zustand").StoreApi<BrandingStore>>;
