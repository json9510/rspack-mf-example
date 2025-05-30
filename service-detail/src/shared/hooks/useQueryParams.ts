/**
 * Hook personalizado para leer query parameters con debugging
 */
import { useSearchParams, useLocation } from "react-router-dom";

interface UseQueryParamOptions {
  debugKey?: string;
  fallbackValue?: string | null;
}

/**
 * Hook para leer un query parameter específico con debugging mejorado
 */
export const useQueryParam = (
  paramName: string, 
  options: UseQueryParamOptions = {}
): string | null => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { debugKey, fallbackValue = null } = options;
  
  const value = searchParams.get(paramName) || fallbackValue;
  
  // Debug logging si se especifica debugKey
  if (debugKey) {
    console.log(`🔍 [${debugKey}] Query Param Debug:`, {
      paramName,
      value,
      allParams: Object.fromEntries(searchParams.entries()),
      search: location.search,
      pathname: location.pathname,
      fullUrl: window.location.href,
      hash: window.location.hash
    });
  }
  
  return value;
};

/**
 * Hook específico para leer userId con múltiples formatos y debugging
 */
export const useUserIdParam = (debugKey = "useUserIdParam"): string | null => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // Intentar múltiples formatos de userId
  const userId = 
    searchParams.get("user_id") || 
    searchParams.get("userId") || 
    searchParams.get("userID") ||
    searchParams.get("USER_ID") ||
    null;
  
  console.log(`🔍 [${debugKey}] UserId Param Debug:`, {
    foundUserId: userId,
    checkedParams: {
      user_id: searchParams.get("user_id"),
      userId: searchParams.get("userId"), 
      userID: searchParams.get("userID"),
      USER_ID: searchParams.get("USER_ID")
    },
    allParams: Object.fromEntries(searchParams.entries()),
    search: location.search,
    pathname: location.pathname,
    fullUrl: window.location.href,
    hash: window.location.hash,
    // Additional debugging
    urlParsed: new URL(window.location.href),
    searchParamsFromUrl: new URLSearchParams(window.location.search)
  });
  
  return userId;
};

/**
 * Hook para debugging completo de routing
 */
export const useRoutingDebug = (componentName: string) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  const debugInfo = {
    component: componentName,
    timestamp: new Date().toISOString(),
    location: {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: location.state
    },
    searchParams: {
      all: Object.fromEntries(searchParams.entries()),
      size: searchParams.size || Array.from(searchParams.entries()).length
    },
    window: {
      href: window.location.href,
      search: window.location.search,
      hash: window.location.hash,
      pathname: window.location.pathname
    },
    urlConstructor: {
      parsed: new URL(window.location.href),
      searchParams: Object.fromEntries(new URLSearchParams(window.location.search))
    }
  };
  
  console.log(`🔍 [${componentName}] Complete Routing Debug:`, debugInfo);
  
  return debugInfo;
};
