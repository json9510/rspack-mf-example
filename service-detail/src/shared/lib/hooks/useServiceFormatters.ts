/**
 * Hook para formateo de datos en Service Detail
 */
import { useMemo } from 'react';

export const useServiceFormatters = () => {
  
  // Formatear moneda colombiana
  const formatCurrency = useMemo(() => (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  // Formatear fecha en español
  const formatDate = useMemo(() => (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    });
  }, []);

  // Formatear fecha y hora
  const formatDateTime = useMemo(() => (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  // Formatear estado de conexión
  const formatConnectionStatus = useMemo(() => (status: string) => {
    switch (status?.toUpperCase()) {
      case 'ON':
        return { text: 'Conectado', color: 'success', icon: '✅' };
      case 'OFF':
        return { text: 'Desconectado', color: 'warning', icon: '⚠️' };
      default:
        return { text: 'Desconocido', color: 'error', icon: '❓' };
    }
  }, []);

  // Formatear calidad de señal
  const formatSignalQuality = useMemo(() => (quality?: number) => {
    if (quality === undefined || quality === null) return 'N/A';
    
    if (quality >= 80) return { text: 'Excelente', color: 'success' };
    if (quality >= 60) return { text: 'Buena', color: 'info' };
    if (quality >= 40) return { text: 'Regular', color: 'warning' };
    return { text: 'Mala', color: 'error' };
  }, []);

  // Formatear dirección
  const formatAddress = useMemo(() => (estate: any) => {
    if (!estate) return 'N/A';
    
    const parts = [
      estate.address,
      estate.city,
      estate.state,
    ].filter(Boolean);
    
    return parts.join(', ');
  }, []);

  // Formatear NIU
  const formatNIU = useMemo(() => (niu: string) => {
    if (!niu) return 'N/A';
    // Formatear NIU con guiones para mejor legibilidad
    return niu.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
  }, []);

  // Formatear estado de deuda
  const formatDebtStatus = useMemo(() => (totalOwe?: number) => {
    if (!totalOwe || totalOwe <= 0) {
      return {
        text: 'Al día',
        color: 'success',
        icon: '✅',
        severity: 'success' as const,
      };
    }
    
    if (totalOwe < 100000) {
      return {
        text: 'Deuda menor',
        color: 'warning',
        icon: '⚠️',
        severity: 'warning' as const,
      };
    }
    
    return {
      text: 'Deuda pendiente',
      color: 'error',
      icon: '🚨',
      severity: 'error' as const,
    };
  }, []);

  // Formatear tiempo transcurrido
  const formatTimeAgo = useMemo(() => (date: string | Date) => {
    const now = new Date();
    const past = typeof date === 'string' ? new Date(date) : date;
    const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Hace un momento';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minutos`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `Hace ${diffInDays} días`;
    
    return formatDate(date);
  }, [formatDate]);

  // Formatear número de documento
  const formatDocument = useMemo(() => (type: string, number: string) => {
    if (!type || !number) return 'N/A';
    
    const typeMap: Record<string, string> = {
      'CC': 'C.C.',
      'CE': 'C.E.',
      'TI': 'T.I.',
      'RC': 'R.C.',
      'PA': 'Pasaporte',
      'NIT': 'NIT',
    };
    
    const formattedType = typeMap[type] || type;
    const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return `${formattedType} ${formattedNumber}`;
  }, []);

  return {
    formatCurrency,
    formatDate,
    formatDateTime,
    formatConnectionStatus,
    formatSignalQuality,
    formatAddress,
    formatNIU,
    formatDebtStatus,
    formatTimeAgo,
    formatDocument,
  };
};

export default useServiceFormatters;
