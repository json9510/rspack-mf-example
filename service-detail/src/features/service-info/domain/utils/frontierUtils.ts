/**
 * EnerbitFrontier Utilities
 * Funciones para transformar y trabajar con datos de EnerbitFrontier
 */

import type { EnerbitFrontier, FrontierType } from "../repositories/AccountRepository";

// Definir constantes localmente para evitar imports circulares
const FRONTIER_TYPES = {
	EXPORT_FRONTIER: "EXPORT_FRONTIER" as const,
	IMPORT_FRONTIER: "IMPORT_FRONTIER" as const
} as const;

/**
 * Traducciones para tipos de frontera
 */
export const frontierTypeTranslations: Record<string, string> = {
	[FRONTIER_TYPES.EXPORT_FRONTIER]: "Frontera de Exportación",
	[FRONTIER_TYPES.IMPORT_FRONTIER]: "Frontera de Importación",
	"EXPORT_FRONTIER": "Frontera de Exportación",
	"IMPORT_FRONTIER": "Frontera de Importación"
};

/**
 * Transforma EnerbitFrontier de la estructura de API a formato legacy compatible
 * Esto mantiene la compatibilidad con componentes existentes
 */
export const transformEnerbitFrontier = (rawFrontier: EnerbitFrontier): EnerbitFrontier => {
  // Determinar status basado en el tipo y otras propiedades
  const status = getStatusFromFrontierType(rawFrontier.frontier_type);
  
  // Determinar name como frontier_xm_code o fallback
  const name = rawFrontier.frontier_xm_code || `Frontera ${rawFrontier.id}`;
  
  return {
    ...rawFrontier,
    
    // Legacy compatibility properties
    name,
    type: rawFrontier.frontier_type,
    status,
    
    // Keep original structure intact
    frontier_xm_code: rawFrontier.frontier_xm_code,
    frontier_xm_registered_from: rawFrontier.frontier_xm_registered_from,
    lead_id: rawFrontier.lead_id,
    frontier_type: rawFrontier.frontier_type,
    measurement_point_id: rawFrontier.measurement_point_id,
    id: rawFrontier.id,
    created_at: rawFrontier.created_at,
    updated_at: rawFrontier.updated_at
  };
};

/**
 * Determina el status basado en el tipo de frontera
 */
export const getStatusFromFrontierType = (frontierType: FrontierType): string => {
  switch (frontierType) {
    case FRONTIER_TYPES.EXPORT_FRONTIER:
      return "Activa - Exportación";
    case FRONTIER_TYPES.IMPORT_FRONTIER:
      return "Activa - Importación";
    default:
      return "Desconocido";
  }
};

/**
 * Obtiene el nombre legible del tipo de frontera
 */
export const getFrontierTypeName = (frontierType: FrontierType): string => {
  return frontierTypeTranslations[frontierType] || frontierType;
};

/**
 * Obtiene el código XM de la frontera
 */
export const getFrontierXMCode = (frontier: EnerbitFrontier): string => {
  return frontier.frontier_xm_code || `F-${frontier.id.slice(0, 8)}`;
};

/**
 * Verifica si la frontera está registrada en XM
 */
export const isFrontierRegisteredInXM = (frontier: EnerbitFrontier): boolean => {
  return !!frontier.frontier_xm_registered_from;
};

/**
 * Obtiene la fecha de registro en XM formateada
 */
export const getXMRegistrationDate = (frontier: EnerbitFrontier): string | null => {
  if (!frontier.frontier_xm_registered_from) return null;
  
  const date = typeof frontier.frontier_xm_registered_from === 'string' 
    ? new Date(frontier.frontier_xm_registered_from)
    : frontier.frontier_xm_registered_from;
    
  return date.toLocaleDateString('es-CO');
};

/**
 * Obtiene el color para el tipo de frontera en la UI
 */
export const getFrontierTypeColor = (frontierType: FrontierType): "primary" | "secondary" | "success" | "warning" => {
  switch (frontierType) {
    case FRONTIER_TYPES.EXPORT_FRONTIER:
      return "success";
    case FRONTIER_TYPES.IMPORT_FRONTIER:
      return "primary";
    default:
      return "warning";
  }
};

/**
 * Formatea la información de la frontera para mostrar en UI
 */
export const formatFrontierDisplayInfo = (frontier: EnerbitFrontier): {
  displayName: string;
  typeInfo: string;
  statusInfo: string;
  xmInfo: string;
  registrationInfo: string | null;
} => {
  const displayName = getFrontierXMCode(frontier);
  const typeInfo = getFrontierTypeName(frontier.frontier_type);
  const statusInfo = getStatusFromFrontierType(frontier.frontier_type);
  const xmInfo = `Lead ID: ${frontier.lead_id}`;
  const registrationInfo = getXMRegistrationDate(frontier);

  return {
    displayName,
    typeInfo,
    statusInfo,
    xmInfo,
    registrationInfo
  };
};

/**
 * Transforma una lista de EnerbitFrontier para compatibilidad legacy
 */
export const transformEnerbitFrontierList = (rawFrontiers: EnerbitFrontier[]): EnerbitFrontier[] => {
  return rawFrontiers.map(transformEnerbitFrontier);
};

/**
 * Filtra frontiers por tipo
 */
export const filterFrontiersByType = (
  frontiers: EnerbitFrontier[], 
  type: FrontierType
): EnerbitFrontier[] => {
  return frontiers.filter(frontier => frontier.frontier_type === type);
};

/**
 * Obtiene estadísticas de frontiers
 */
export const getFrontierStats = (frontiers: EnerbitFrontier[]): {
  total: number;
  exportFrontiers: number;
  importFrontiers: number;
  registeredInXM: number;
} => {
  const stats = {
    total: frontiers.length,
    exportFrontiers: 0,
    importFrontiers: 0,
    registeredInXM: 0
  };

  frontiers.forEach(frontier => {
    if (frontier.frontier_type === FRONTIER_TYPES.EXPORT_FRONTIER) {
      stats.exportFrontiers++;
    } else if (frontier.frontier_type === FRONTIER_TYPES.IMPORT_FRONTIER) {
      stats.importFrontiers++;
    }
    
    if (isFrontierRegisteredInXM(frontier)) {
      stats.registeredInXM++;
    }
  });

  return stats;
};
