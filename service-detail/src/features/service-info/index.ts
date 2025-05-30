/**
 * Service Info Feature Exports
 * Following Feature-Sliced Design architecture pattern
 */

// Main composition root
export * from "./lib";

// UI Components
export { LeftMenuOrganism } from "./ui/organisms/LeftMenuOrganism";
export { UserSelector } from "./ui/molecules/UserSelector";

// Domain Utils
export {
  transformAppUser,
  transformAppUserList,
  getFullName,
  getPrimaryEmail,
  getPrimaryPhone,
  getDocumentInfo,
  isEmailVerified,
  isPhoneVerified,
  formatUserDisplayInfo,
} from "./domain/utils/appUserUtils";

export {
  transformEnerbitFrontier,
  transformEnerbitFrontierList,
  formatFrontierDisplayInfo,
  getFrontierTypeColor,
  getFrontierTypeName,
  getFrontierXMCode,
  isFrontierRegisteredInXM,
  getXMRegistrationDate,
  getStatusFromFrontierType,
  filterFrontiersByType,
  getFrontierStats,
} from "./domain/utils/frontierUtils";

// Types (re-export from domain)
export type {
	ServiceData,
	ServiceStatus,
	ServiceRepository,
} from "./domain/repositories/ServiceRepository";

export type {
	AccountRepository,
	AssigneesRepository,
	AppUser,
	Phone,
	Email,
	PersonalInformation,
	EnerbitFrontier,
	ImportExportStatus,
	ExportFrontier,
	ImportFrontier,
	FrontierType,
} from "./domain/repositories/AccountRepository";

// Legacy exports (for backward compatibility)
export { useInformationStore } from "./model/information-store";
export { useAccountStore } from "./model/account-store";
export { useAssigneesStore } from "./model/assignees-store";
