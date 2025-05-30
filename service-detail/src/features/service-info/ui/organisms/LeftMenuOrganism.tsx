import type React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Alert,
  CircularProgress,
  Skeleton,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import {
  ContentPaste as ContentPasteIcon,
  LocationCity as LocationCityIcon,
  ModeOfTravel as ModeOfTravelIcon,
  LocalOffer as LocalOfferIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  ElectricBolt as ElectricBoltIcon,
  AccountTree as AccountTreeIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";

import { useServiceInfoUseCases } from "../../lib/index";
import { UserSelector } from "../molecules/UserSelector";
import type { AppUser } from "../../domain/repositories/AccountRepository";
import {
  formatFrontierDisplayInfo,
  getFrontierTypeColor,
  isFrontierRegisteredInXM,
} from "../../domain/utils/frontierUtils";

interface LeftMenuProps {
  serviceId: string;
  userId?: string | null; // Make optional since we can read from URL
}

export const LeftMenuOrganism: React.FC<LeftMenuProps> = ({
  serviceId,
  userId,
}) => {
  // Get use cases and stores from composition root
  const {
    getServiceInfo,
    getServiceStatus,
    getServiceAccountRelationships,
    getSpecificAppUser,
    getEnerbitFrontiers,
    stores,
  } = useServiceInfoUseCases();

  const {
    service,
    serviceStatus,
    serviceError,
    isLoadingService,
    isLoadingServiceStatus,
  } = stores.information;

  const {
    selectedAppUser,
    appUsers,
    isLoadingAppUsers,
    hasErrorAppUsers,
    setSelectedUser,
  } = stores.account;

  const { enerbitFrontiers, enerbitFrontiersError, isLoadingFrontiers } =
    stores.assignees;

  // Handle user change from UserSelector
  const handleUserChange = (user: AppUser) => {
    setSelectedUser(user);
    console.log("🎯 LeftMenu: User changed to:", user.name || user.user_id);
  };

  // Execute use cases when serviceId changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (serviceId) {
      console.log("🎯 LeftMenu: Executing use cases for serviceId:", serviceId);
      getServiceInfo.execute(serviceId);
      getServiceStatus.execute(serviceId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]); // Only serviceId dependency to avoid infinite loops

  // Execute dependent use cases when service data is available
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (service?.service_account_id) {
      console.log(
        "🎯 LeftMenu: Executing account relationships for:",
        service.service_account_id
      );

      // If we have a specific userId, only fetch that user
      if (userId) {
        console.log("🎯 LeftMenu: Fetching specific user:", userId);
        getSpecificAppUser.execute(userId);
      } else {
        // Otherwise, fetch all users and auto-select owner
        console.log("🎯 LeftMenu: Fetching all users - no specific userId");
        getServiceAccountRelationships.execute(service.service_account_id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service?.service_account_id, userId]); // Include userId in dependencies

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (service?.measurement_point_id) {
      console.log(
        "🎯 LeftMenu: Executing frontiers for:",
        service.measurement_point_id
      );
      getEnerbitFrontiers.execute(service.measurement_point_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service?.measurement_point_id]); // Only measurement_point_id dependency

  if (isLoadingService) {
    return (
      <Card elevation={2} sx={{ height: "100%" }}>
        <CardContent>
          <Skeleton variant="text" width="80%" height={40} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ my: 2 }}
          />
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={150}
            sx={{ my: 2 }}
          />
        </CardContent>
      </Card>
    );
  }

  if (serviceError) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Alert severity="error">{serviceError}</Alert>
        </CardContent>
      </Card>
    );
  }

  if (!service) return null;

  return (
    <Card elevation={2} sx={{ height: "100%", overflow: "auto" }}>
      <CardContent sx={{ p: 3 }}>
        {/* User Information Section - Replaced with UserSelector */}
        <UserSelector
          users={appUsers || []}
          selectedUser={selectedAppUser}
          isLoading={isLoadingAppUsers}
          hasError={hasErrorAppUsers}
          onUserChange={handleUserChange}
        />

        {/* Service Tags */}
        {service.tags && service.tags.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <LocalOfferIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">
                Etiquetas del servicio
              </Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
              {service.tags.map((tag: any, index: number) => (
                <Chip
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  label={tag.name || tag}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Connection Status */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor:
              serviceStatus.relay_status === "ON"
                ? "success.light"
                : "warning.light",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            color={
              serviceStatus.relay_status === "ON"
                ? "success.dark"
                : "warning.dark"
            }
          >
            ⚡ Estado de Conexión
          </Typography>
          <Box display="flex" alignItems="center">
            <ElectricBoltIcon
              color={
                serviceStatus.relay_status === "ON" ? "success" : "warning"
              }
              sx={{ mr: 1 }}
            />
            <Typography>
              {isLoadingServiceStatus ? (
                <CircularProgress size={16} />
              ) : (
                `Medidor ${
                  serviceStatus.relay_status === "ON"
                    ? "Conectado ✅"
                    : "Desconectado ⚠️"
                }`
              )}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Service Information */}
        <Box sx={{ mb: 3 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <ContentPasteIcon color="secondary" sx={{ mr: 1 }} />
            <Typography variant="h6" color="secondary">
              📋 Información del servicio
            </Typography>
          </Box>

          <List dense>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="ID del servicio" secondary={service.id} />
            </ListItem>

            {service.creg_subscriber?.niu && (
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary="NIU"
                  secondary={service.creg_subscriber.niu}
                />
              </ListItem>
            )}

            {service.measurement_point_id && (
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary="ID punto de medida"
                  secondary={service.measurement_point_id}
                />
              </ListItem>
            )}

            {service.meter?.serial && (
              <ListItem>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Serial del medidor"
                  secondary={service.meter.serial}
                />
              </ListItem>
            )}

            {service.creg_subscriber?.voltage_level?.sui_code && (
              <ListItem>
                <ListItemIcon>
                  <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Nivel de tensión"
                  secondary={service.creg_subscriber.voltage_level.sui_code}
                />
              </ListItem>
            )}

            {service.started_at && (
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Fecha inicio servicio"
                  secondary={new Date(service.started_at).toLocaleDateString(
                    "es-CO"
                  )}
                />
              </ListItem>
            )}
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Estate Information */}
        {service.estate && (
          <Box sx={{ mb: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <LocationCityIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">
                🏠 Información del predio
              </Typography>
            </Box>

            <List dense>
              {service.estate.address && (
                <ListItem>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dirección"
                    secondary={service.estate.address}
                  />
                </ListItem>
              )}

              {service.estate.state && (
                <ListItem>
                  <ListItemIcon>
                    <LocationCityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Departamento"
                    secondary={service.estate.state}
                  />
                </ListItem>
              )}

              {service.estate.city && (
                <ListItem>
                  <ListItemIcon>
                    <LocationCityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ciudad"
                    secondary={service.estate.city}
                  />
                </ListItem>
              )}

              {service.creg_subscriber?.sui_social_stratum && (
                <ListItem>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Estrato"
                    secondary={`${service.creg_subscriber.sui_social_stratum.sui_code} ${service.creg_subscriber.sui_social_stratum.description}`}
                  />
                </ListItem>
              )}
            </List>

            <Button
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
              onClick={() => {
                console.log("Navigate to estate detail:", service.estate?.id);
              }}
            >
              Ver más detalle
            </Button>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Frontier Information - Enhanced */}
        <Box>
          <Box display="flex" alignItems="center" mb={2}>
            <ModeOfTravelIcon color="info" sx={{ mr: 1 }} />
            <Typography variant="h6" color="info.main">
              🔌 Información de fronteras
            </Typography>
          </Box>

          {isLoadingFrontiers ? (
            <CircularProgress size={24} />
          ) : enerbitFrontiersError ? (
            <Alert severity="error">{enerbitFrontiersError}</Alert>
          ) : enerbitFrontiers && enerbitFrontiers.length > 0 ? (
            <Box>
              {enerbitFrontiers.map((frontier) => {
                const displayInfo = formatFrontierDisplayInfo(frontier);
                const frontierColor = getFrontierTypeColor(
                  frontier.frontier_type
                );
                const isRegistered = isFrontierRegisteredInXM(frontier);

                return (
                  <Box
                    key={frontier.id}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      border: 1,
                      borderColor: `${frontierColor}.main`,
                      bgcolor: `${frontierColor}.light`,
                      opacity: 0.9,
                    }}
                  >
                    {/* Frontier Header */}
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      mb={1}
                    >
                      <Typography variant="subtitle2" fontWeight={600}>
                        {displayInfo.displayName}
                      </Typography>
                      <Chip
                        label={displayInfo.typeInfo}
                        color={frontierColor}
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    {/* Frontier Details */}
                    <List dense sx={{ py: 0 }}>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <ModeOfTravelIcon sx={{ fontSize: 16 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={displayInfo.statusInfo}
                          primaryTypographyProps={{ variant: "caption" }}
                        />
                      </ListItem>

                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <AccountTreeIcon sx={{ fontSize: 16 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={displayInfo.xmInfo}
                          primaryTypographyProps={{ variant: "caption" }}
                        />
                      </ListItem>

                      {isRegistered && displayInfo.registrationInfo && (
                        <ListItem sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CalendarTodayIcon sx={{ fontSize: 16 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={`Registrada XM: ${displayInfo.registrationInfo}`}
                            primaryTypographyProps={{ variant: "caption" }}
                          />
                        </ListItem>
                      )}

                      {!isRegistered && (
                        <ListItem sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CalendarTodayIcon
                              sx={{ fontSize: 16 }}
                              color="warning"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Pendiente registro XM"
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "warning.main",
                            }}
                          />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No hay información de fronteras disponible
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
