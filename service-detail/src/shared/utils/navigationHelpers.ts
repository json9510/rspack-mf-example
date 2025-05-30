/**
 * Navigation Helpers
 * Utilidades para navegación consistente con query parameters
 */

/**
 * Navega al AttentionPage con un serviceId y opcionalmente un userId
 */
export const navigateToAttentionPage = (serviceId: string, userId?: string): string => {
  const basePath = `/attention/${serviceId}`;
  
  if (userId) {
    return `${basePath}?user_id=${encodeURIComponent(userId)}`;
  }
  
  return basePath;
};

/**
 * Actualiza la URL actual manteniendo el serviceId pero cambiando el userId
 */
export const updateUserIdInUrl = (serviceId: string, userId: string): string => {
  return navigateToAttentionPage(serviceId, userId);
};

/**
 * Extrae el user_id de los search params (con fallback a userId para compatibilidad)
 */
export const getUserIdFromParams = (searchParams: URLSearchParams): string | null => {
  return searchParams.get("user_id") || searchParams.get("userId");
};

/**
 * Helper para construir URLs de AtentionPage para casos específicos
 */
export class AttentionPageNavigation {
  /**
   * URL para mostrar servicio con propietario
   */
  static withOwner(serviceId: string, ownerId: string): string {
    return navigateToAttentionPage(serviceId, ownerId);
  }

  /**
   * URL para mostrar servicio con usuario específico
   */
  static withUser(serviceId: string, userId: string): string {
    return navigateToAttentionPage(serviceId, userId);
  }

  /**
   * URL para mostrar servicio sin usuario específico (auto-selección)
   */
  static withAutoSelection(serviceId: string): string {
    return navigateToAttentionPage(serviceId);
  }
}

/**
 * Ejemplos de uso:
 * 
 * // Navegación básica
 * const url1 = navigateToAttentionPage("12345"); 
 * // → "/attention/12345"
 * 
 * const url2 = navigateToAttentionPage("12345", "user-abc-123");
 * // → "/attention/12345?user_id=user-abc-123"
 * 
 * // Con la clase helper
 * const ownerUrl = AttentionPageNavigation.withOwner("12345", "owner-123");
 * // → "/attention/12345?user_id=owner-123"
 * 
 * // En componentes con react-router
 * import { useNavigate } from "react-router-dom";
 * 
 * const navigate = useNavigate();
 * navigate(navigateToAttentionPage(serviceId, userId));
 */
