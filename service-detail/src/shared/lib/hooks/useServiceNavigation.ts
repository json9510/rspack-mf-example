/**
 * Hook para navegación dentro del Service Detail Module
 */
import { useCallback } from 'react';

interface NavigationOptions {
  serviceId: string;
  baseUrl?: string;
}

export const useServiceNavigation = ({ serviceId, baseUrl = '/services' }: NavigationOptions) => {
  
  const navigateToTab = useCallback((tabName: string) => {
    const url = `${baseUrl}/attention/${serviceId}?tab=${tabName}`;
    console.log(`🧭 Navigating to: ${url}`);
    // En un entorno real, usarías react-router
    window.history.pushState({}, '', url);
  }, [serviceId, baseUrl]);

  const navigateToSection = useCallback((section: string, params?: Record<string, string>) => {
    let url = `${baseUrl}/${section}/${serviceId}`;
    
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }
    
    console.log(`🧭 Navigating to section: ${url}`);
    window.history.pushState({}, '', url);
  }, [serviceId, baseUrl]);

  const openExternalLink = useCallback((url: string) => {
    console.log(`🌐 Opening external link: ${url}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const navigateToEstate = useCallback((estateId: string) => {
    navigateToSection('estate', { id: estateId });
  }, [navigateToSection]);

  const navigateToMeter = useCallback((meterId: string) => {
    navigateToSection('meter', { id: meterId });
  }, [navigateToSection]);

  const navigateToBilling = useCallback((filters?: Record<string, string>) => {
    navigateToTab('billing');
    // Aquí podrías activar filtros específicos
    if (filters) {
      console.log('🔍 Applied billing filters:', filters);
    }
  }, [navigateToTab]);

  const navigateToConsumption = useCallback((filters?: Record<string, string>) => {
    navigateToTab('consumption');
    if (filters) {
      console.log('📊 Applied consumption filters:', filters);
    }
  }, [navigateToTab]);

  return {
    navigateToTab,
    navigateToSection,
    openExternalLink,
    navigateToEstate,
    navigateToMeter,
    navigateToBilling,
    navigateToConsumption,
  };
};

export default useServiceNavigation;
