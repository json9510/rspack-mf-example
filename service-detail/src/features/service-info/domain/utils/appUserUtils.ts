/**
 * AppUser Utilities
 * Funciones para transformar y trabajar con datos de AppUser
 */

import type { AppUser } from "../repositories/AccountRepository";

/**
 * Transforma AppUser de la estructura de API a formato legacy compatible
 * Esto mantiene la compatibilidad con componentes existentes
 */
export const transformAppUser = (rawAppUser: AppUser): AppUser => {
  // Verificar que pii existe antes de acceder a sus propiedades
  if (!rawAppUser.pii) {
    return {
      ...rawAppUser,
      user_id: rawAppUser.id,
      name: rawAppUser.username,
      email: rawAppUser.username
    };
  }

  // Obtener email primario de forma segura
  const primaryEmail = rawAppUser.pii.emails?.find(email => email.priority === 1) 
    || rawAppUser.pii.emails?.[0];

  // Obtener teléfono primario de forma segura
  const primaryPhone = rawAppUser.pii.phones?.find(phone => phone.priority === 1)
    || rawAppUser.pii.phones?.[0];

  // Combinar nombres de forma segura
  const fullName = rawAppUser.pii.names && rawAppUser.pii.last_names
    ? `${rawAppUser.pii.names} ${rawAppUser.pii.last_names}`.trim()
    : rawAppUser.pii.names || rawAppUser.username;

  return {
    ...rawAppUser,
    
    // Legacy compatibility properties
    user_id: rawAppUser.id,
    name: fullName,
    email: primaryEmail?.email || rawAppUser.username,
    phone: primaryPhone?.phone || undefined,
    document_type: rawAppUser.pii.legal_id_type,
    document_number: rawAppUser.pii.legal_id_code
  };
};

/**
 * Obtiene el email primario de un AppUser
 */
export const getPrimaryEmail = (appUser: AppUser): string => {
  if (!appUser.pii?.emails?.length) {
    return appUser.username || appUser.email || "";
  }
  
  const primaryEmail = appUser.pii.emails.find(email => email.priority === 1) 
    || appUser.pii.emails[0];
  
  return primaryEmail?.email || appUser.username;
};

/**
 * Obtiene el teléfono primario de un AppUser
 */
export const getPrimaryPhone = (appUser: AppUser): string | undefined => {
  if (!appUser.pii?.phones?.length) {
    return appUser.phone || undefined;
  }
  
  const primaryPhone = appUser.pii.phones.find(phone => phone.priority === 1)
    || appUser.pii.phones[0];
  
  return primaryPhone?.phone;
};

/**
 * Obtiene el nombre completo de un AppUser
 */
export const getFullName = (appUser: AppUser): string => {
  if (!appUser.pii) {
    return appUser.name || appUser.username || "";
  }
  
  const fullName = appUser.pii.names && appUser.pii.last_names
    ? `${appUser.pii.names} ${appUser.pii.last_names}`.trim()
    : appUser.pii.names || appUser.name || appUser.username;
    
  return fullName || "";
};

/**
 * Obtiene el documento de identidad de un AppUser
 */
export const getDocumentInfo = (appUser: AppUser): { type: string; number: string } => {
  if (!appUser.pii) {
    return {
      type: appUser.document_type || "N/A",
      number: appUser.document_number || "N/A"
    };
  }
  
  return {
    type: appUser.pii.legal_id_type || "N/A",
    number: appUser.pii.legal_id_code || "N/A"
  };
};

/**
 * Verifica si un email está verificado
 */
export const isEmailVerified = (appUser: AppUser, email?: string): boolean => {
  if (!appUser.pii?.emails?.length) {
    return false;
  }
  
  if (!email) {
    // Verificar el email primario
    const primaryEmail = appUser.pii.emails.find(e => e.priority === 1) || appUser.pii.emails[0];
    return primaryEmail?.is_verified || false;
  }
  
  // Verificar un email específico
  const targetEmail = appUser.pii.emails.find(e => e.email === email);
  return targetEmail?.is_verified || false;
};

/**
 * Verifica si un teléfono está verificado
 */
export const isPhoneVerified = (appUser: AppUser, phone?: string): boolean => {
  if (!appUser.pii?.phones?.length) {
    return false;
  }
  
  if (!phone) {
    // Verificar el teléfono primario
    const primaryPhone = appUser.pii.phones.find(p => p.priority === 1) || appUser.pii.phones[0];
    return primaryPhone?.is_verified || false;
  }
  
  // Verificar un teléfono específico
  const targetPhone = appUser.pii.phones.find(p => p.phone === phone);
  return targetPhone?.is_verified || false;
};

/**
 * Formatea la información del usuario para mostrar en UI
 */
export const formatUserDisplayInfo = (appUser: AppUser): {
  displayName: string;
  primaryContact: string;
  documentInfo: string;
  verificationStatus: {
    emailVerified: boolean;
    phoneVerified: boolean;
  };
} => {
  const fullName = getFullName(appUser);
  const primaryEmail = getPrimaryEmail(appUser);
  const primaryPhone = getPrimaryPhone(appUser);
  const { type, number } = getDocumentInfo(appUser);

  return {
    displayName: fullName || appUser.username,
    primaryContact: primaryEmail,
    documentInfo: `${type}: ${number}`,
    verificationStatus: {
      emailVerified: isEmailVerified(appUser),
      phoneVerified: isPhoneVerified(appUser)
    }
  };
};

/**
 * Transforma una lista de AppUser para compatibilidad legacy
 */
export const transformAppUserList = (rawAppUsers: AppUser[]): AppUser[] => {
  return rawAppUsers.map(transformAppUser);
};
