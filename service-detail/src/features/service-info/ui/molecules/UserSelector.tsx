import type React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
  type SelectChangeEvent,
  Avatar,
  Chip,
  Alert,
  Skeleton,
} from "@mui/material";
import {
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  AccountCircle as AccountCircleIcon,
  VerifiedUser as VerifiedUserIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";

import type { AppUser } from "../../domain/repositories/AccountRepository";
import { 
  getFullName, 
  getPrimaryEmail, 
  getPrimaryPhone, 
  getDocumentInfo, 
  isEmailVerified, 
  isPhoneVerified 
} from "../../domain/utils/appUserUtils";

interface UserSelectorProps {
  users: AppUser[];
  selectedUser: AppUser | null;
  isLoading: boolean;
  hasError: string | null;
  onUserChange: (user: AppUser) => void;
}

const roleTranslations: Record<string, string> = {
  owner: "Propietario",
  tenant: "Arrendatario",
  administrator: "Administrador",
  authorized: "Autorizado",
};

const getRoleColor = (
  role: string
): "primary" | "secondary" | "success" | "warning" => {
  switch (role) {
    case "owner":
      return "primary";
    case "administrator":
      return "secondary";
    case "tenant":
      return "success";
    default:
      return "warning";
  }
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUser,
  isLoading,
  hasError,
  onUserChange,
}) => {
  const [localSelectedUser, setLocalSelectedUser] = useState<AppUser | null>(
    selectedUser
  );

  useEffect(() => {
    setLocalSelectedUser(selectedUser);
  }, [selectedUser]);

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    const userId = event.target.value;
    const user = users.find((u) => (u.user_id || u.id) === userId);
    if (user) {
      setLocalSelectedUser(user);
      onUserChange(user);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
      </Box>
    );
  }

  if (hasError) {
    return (
      <Box sx={{ mb: 3 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {hasError}
        </Alert>
      </Box>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Box sx={{ mb: 3 }}>
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          No se encontraron usuarios asociados al servicio
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      {/* Selected User Information Card */}
      {localSelectedUser && (
        <Box
          sx={{
            p: 2.5,
            bgcolor: "grey.50",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          {/* User Details */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Avatar */}
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: "primary.main",
                fontSize: "1.25rem",
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 28 }} />
            </Avatar>

            {/* User Info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{
                  mb: 0.5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {getFullName(localSelectedUser) || localSelectedUser.username || "Usuario sin nombre"}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Chip
                  label={
                    roleTranslations[localSelectedUser.rol || ""] ||
                    localSelectedUser.rol ||
                    "Usuario"
                  }
                  color={getRoleColor(localSelectedUser.rol || "")}
                  size="small"
                  variant="outlined"
                />
              </Box>

              {/* Enhanced User Info */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {/* Email with verification */}
                {localSelectedUser.pii?.emails && localSelectedUser.pii.emails.length > 0 && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <EmailIcon sx={{ fontSize: 14 }} color="action" />
                    <Typography variant="caption" color="text.secondary">
                      {getPrimaryEmail(localSelectedUser)}
                    </Typography>
                    {isEmailVerified(localSelectedUser) && (
                      <VerifiedUserIcon sx={{ fontSize: 12 }} color="success" />
                    )}
                  </Box>
                )}
                
                {/* Phone with verification */}
                {localSelectedUser.pii?.phones && localSelectedUser.pii.phones.length > 0 && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <PhoneIcon sx={{ fontSize: 14 }} color="action" />
                    <Typography variant="caption" color="text.secondary">
                      {getPrimaryPhone(localSelectedUser)}
                    </Typography>
                    {isPhoneVerified(localSelectedUser) && (
                      <VerifiedUserIcon sx={{ fontSize: 12 }} color="success" />
                    )}
                  </Box>
                )}
                
                {/* Document Info */}
                {localSelectedUser.pii?.legal_id_type && localSelectedUser.pii?.legal_id_code && (
                  <Typography variant="caption" color="text.secondary">
                    🆔 {localSelectedUser.pii.legal_id_type}: {localSelectedUser.pii.legal_id_code}
                  </Typography>
                )}
                
                {/* Fallback to legacy fields if pii is not available */}
                {!localSelectedUser.pii && localSelectedUser.email && (
                  <Typography variant="caption" color="text.secondary">
                    📧 {localSelectedUser.email}
                  </Typography>
                )}
                
                {!localSelectedUser.pii && localSelectedUser.phone && (
                  <Typography variant="caption" color="text.secondary">
                    📱 {localSelectedUser.phone}
                  </Typography>
                )}
                
                {!localSelectedUser.pii && localSelectedUser.document_number && (
                  <Typography variant="caption" color="text.secondary">
                    🆔 {localSelectedUser.document_type || "Doc"}: {localSelectedUser.document_number}
                  </Typography>
                )}
                
                <Typography variant="caption" color="text.secondary">
                  🆔 ID: {localSelectedUser.id || localSelectedUser.user_id}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
