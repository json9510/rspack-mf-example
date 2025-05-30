/**
 * Common Types for Infrastructure Layer
 * Tipos comunes para manejar respuestas de API y errores
 */

// Tipo para errores de API
export interface ApiError {
  response?: {
    data?: {
      message?: string;
      code?: string;
    };
    status?: number;
  };
  message?: string;
}

// Type guard para verificar si es un error de API
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('response' in error || 'message' in error)
  );
}

// Tipo para filtros de servicios
export interface ServiceFilters {
  status?: string;
  page?: number;
  size?: number;
  type?: string;
  owner_id?: string;
  measurement_point_id?: string;
}

// Tipo para respuesta de lista de servicios
export interface ServiceListResponse {
  items?: unknown[]; // Puede contener ServiceData[] pero mantenemos unknown[] para flexibilidad
  total?: number;
  page?: number;
  size?: number;
  next_pages?: number;
}

// Función helper para manejar errores de forma consistente
export function handleApiError(error: unknown, defaultMessage: string): never {
  if (isApiError(error)) {
    const errorMessage = error.response?.data?.message || error.message || defaultMessage;
    throw new Error(errorMessage);
  }
  
  throw new Error(defaultMessage);
}
