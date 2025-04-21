import { useBrandingStore } from "./brandingStore";

export const useLogo = () => useBrandingStore((state) => state.logoUrl);