import type React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Alert,
  CircularProgress,
  Skeleton,
  Avatar,
  Divider,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  LocalOffer as LocalOfferIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Build as BuildIcon,
  Home as HomeIcon,
  Description as DescriptionIcon,
  AccountTree as AccountTreeIcon,
  Edit as EditIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

import { useServiceInfoUseCases } from "../../lib/index";
import type { AppUser } from "../../domain/repositories/AccountRepository";

interface LeftMenuProps {
  serviceId: string;
  userId?: string | null;
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

  // Local state for accordion expansion
  const [expanded, setExpanded] = useState<string[]>([
    'etiquetas', 
    'usuario', 
    'estado',
    'servicio',
    'predio',
    'plan',
    'frontera'
  ]);

  const handleAccordionChange = (panel: string) => {
    setExpanded(prev => 
      prev.includes(panel) 
        ? prev.filter(p => p !== panel)
        : [...prev, panel]
    );
  };

  // Execute use cases when serviceId changes
  useEffect(() => {
    if (serviceId) {
      console.log("🎯 LeftMenu: Executing use cases for serviceId:", serviceId);
      getServiceInfo.execute(serviceId);
      getServiceStatus.execute(serviceId);
    }
  }, [serviceId]);

  // Execute dependent use cases when service data is available
  useEffect(() => {
    if (service?.service_account_id) {
      console.log(
        "🎯 LeftMenu: Executing account relationships for:",
        service.service_account_id
      );

      if (userId) {
        console.log("🎯 LeftMenu: Fetching specific user:", userId);
        getSpecificAppUser.execute(userId);
      } else {
        console.log("🎯 LeftMenu: Fetching all users - no specific userId");
        getServiceAccountRelationships.execute(service.service_account_id);
      }
    }
  }, [service?.service_account_id, userId]);

  useEffect(() => {
    if (service?.measurement_point_id) {
      console.log(
        "🎯 LeftMenu: Executing frontiers for:",
        service.measurement_point_id
      );
      getEnerbitFrontiers.execute(service.measurement_point_id);
    }
  }, [service?.measurement_point_id]);

  // Get real data from backend
  const serviceTags = service?.tags || [];
  
  const planInfo = {
    current: service?.enerbit_electricity_supply_service?.service_type || "No especificado",
    coverage: `${service?.enerbit_electricity_supply_service?.current_power || 0}kW / ${service?.enerbit_electricity_supply_service?.contract_power || 0}kW`,
    startDate: service?.started_at ? new Date(service.started_at).toLocaleDateString() : "No especificado",
    endDate: service?.ended_at ? new Date(service.ended_at).toLocaleDateString() : "Indefinido",
    status: service?.enerbit_electricity_supply_service?.status || "Activo"
  };

  if (isLoadingService) {
    return (
      <Card 
        elevation={0} 
        sx={{ 
          height: "100%", 
          border: '1px solid #e5e7eb',
          borderRadius: 2
        }}
      >
        <CardContent>
          <Skeleton variant="text" width="80%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={200} sx={{ my: 2 }} />
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="rectangular" width="100%" height={150} sx={{ my: 2 }} />
        </CardContent>
      </Card>
    );
  }

  if (serviceError) {
    return (
      <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
        <CardContent>
          <Alert severity="error">{serviceError}</Alert>
        </CardContent>
      </Card>
    );
  }

  if (!service) return null;

  // Get primary user info from backend
  const primaryUser = selectedAppUser || appUsers?.[0];
  const userName = primaryUser?.pii?.names && primaryUser?.pii?.last_names 
    ? `${primaryUser.pii.names} ${primaryUser.pii.last_names}`
    : primaryUser?.username || "Usuario no disponible";
  const userRole = "Propietario"; // This could come from ServiceAccountRelationship.relationship_type
  const userEmail = primaryUser?.pii?.emails?.find(email => email.priority === 1)?.email || 
                   primaryUser?.pii?.emails?.[0]?.email || "No disponible";
  const userPhone = primaryUser?.pii?.phones?.find(phone => phone.priority === 1)?.phone || 
                   primaryUser?.pii?.phones?.[0]?.phone || "No disponible";
  const userLegalId = primaryUser?.pii?.legal_id_code || "No disponible";
  const userInternalId = primaryUser?.id || "No disponible";

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: "100%", 
        overflow: "auto",
        border: '1px solid #e5e7eb',
        borderRadius: 2,
        backgroundColor: 'white'
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* User Header */}
        <Box 
          sx={{ 
            p: 2, 
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: '#6b46c1', 
              width: 32, 
              height: 32,
              fontSize: '0.875rem',
              fontWeight: 600
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#1f2937' }}>
              {userName}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
              {userRole}
            </Typography>
          </Box>
          <IconButton size="small" sx={{ color: '#6b7280' }}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>

        {/* Accordion Sections */}
        <Box>
          {/* Etiquetas del servicio */}
          <Accordion 
            expanded={expanded.includes('etiquetas')}
            onChange={() => handleAccordionChange('etiquetas')}
            elevation={0}
            sx={{ 
              '&:before': { display: 'none' },
              borderBottom: '1px solid #e5e7eb'
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                px: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <LocalOfferIcon sx={{ color: '#6b46c1', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>
                Etiquetas del servicio
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {serviceTags.length > 0 ? serviceTags.map((tag, index) => (
                  <Chip
                    key={tag.id || index}
                    label={tag.name || tag.value || `Tag ${index + 1}`}
                    size="small"
                    sx={{
                      backgroundColor: '#e0e7ff',
                      color: '#3730a3',
                      fontSize: '0.75rem',
                      height: 24
                    }}
                  />
                )) : (
                  <Typography variant="caption" color="#6b7280">
                    No hay etiquetas disponibles
                  </Typography>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Información del usuario */}
          <Accordion 
            expanded={expanded.includes('usuario')}
            onChange={() => handleAccordionChange('usuario')}
            elevation={0}
            sx={{ 
              '&:before': { display: 'none' },
              borderBottom: '1px solid #e5e7eb'
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                px: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <PersonIcon sx={{ color: '#6b46c1', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>
                Información del usuario
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
              <List dense sx={{ py: 0 }}>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="ID del usuario:" 
                    secondary={userInternalId}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937',
                      sx: { wordBreak: 'break-all' }
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Identificación:" 
                    secondary={userLegalId}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Email:" 
                    secondary={userEmail}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Número contacto:" 
                    secondary={userPhone}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
              </List>
              <Button
                variant="text"
                size="small"
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  color: '#6b46c1',
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  fontWeight: 500,
                  mt: 1,
                  p: 0,
                  justifyContent: 'flex-start'
                }}
              >
                Ver más detalle
              </Button>
            </AccordionDetails>
          </Accordion>

          {/* Estado del servicio */}
          <Accordion 
            expanded={expanded.includes('estado')}
            onChange={() => handleAccordionChange('estado')}
            elevation={0}
            sx={{ 
              '&:before': { display: 'none' },
              borderBottom: '1px solid #e5e7eb'
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                px: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <SettingsIcon sx={{ color: '#6b46c1', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>
                Estado del servicio
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
              {isLoadingServiceStatus ? (
                <CircularProgress size={24} />
              ) : serviceStatus ? (
                <List dense sx={{ py: 0 }}>
                  <ListItem sx={{ px: 0, py: 0.5 }}>
                    <ListItemText 
                      primary="Estado del relay:" 
                      secondary={serviceStatus.relay_status || "No disponible"}
                      primaryTypographyProps={{ 
                        variant: 'caption', 
                        color: '#6b7280',
                        fontWeight: 500
                      }}
                      secondaryTypographyProps={{ 
                        variant: 'caption', 
                        color: serviceStatus.relay_status === 'ON' ? '#059669' : '#dc2626'
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, py: 0.5 }}>
                    <ListItemText 
                      primary="Última comunicación:" 
                      secondary={serviceStatus.last_communication ? new Date(serviceStatus.last_communication).toLocaleString() : "No disponible"}
                      primaryTypographyProps={{ 
                        variant: 'caption', 
                        color: '#6b7280',
                        fontWeight: 500
                      }}
                      secondaryTypographyProps={{ 
                        variant: 'caption', 
                        color: '#1f2937'
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, py: 0.5 }}>
                    <ListItemText 
                      primary="Calidad de señal:" 
                      secondary={serviceStatus.signal_quality ? `${serviceStatus.signal_quality}%` : "No disponible"}
                      primaryTypographyProps={{ 
                        variant: 'caption', 
                        color: '#6b7280',
                        fontWeight: 500
                      }}
                      secondaryTypographyProps={{ 
                        variant: 'caption', 
                        color: '#1f2937'
                      }}
                    />
                  </ListItem>
                </List>
              ) : (
                <Alert 
                  severity="warning" 
                  icon={<WarningIcon fontSize="small" />}
                  sx={{ 
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    border: '1px solid #fcd34d',
                    '& .MuiAlert-icon': {
                      color: '#f59e0b'
                    }
                  }}
                >
                  <Typography variant="caption">
                    No se pudo obtener el estado del servicio
                  </Typography>
                </Alert>
              )}
            </AccordionDetails>
          </Accordion>

          {/* Información del servicio */}
          <Accordion 
            expanded={expanded.includes('servicio')}
            onChange={() => handleAccordionChange('servicio')}
            elevation={0}
            sx={{ 
              '&:before': { display: 'none' },
              borderBottom: '1px solid #e5e7eb'
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                px: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <BuildIcon sx={{ color: '#f97316', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>
                Información del servicio
              </Typography>
              <IconButton size="small" sx={{ color: '#6b7280', ml: 'auto', mr: 1 }}>
                <EditIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
              <List dense sx={{ py: 0 }}>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="ID del servicio:" 
                    secondary={service.id || "912zf0f-68983-14ae-3e84-56b45c8c5a7"}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937',
                      sx: { wordBreak: 'break-all' }
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="NIU:" 
                    secondary={service.creg_subscriber?.niu || "22z116656-002"}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="ID punto de medida:" 
                    secondary={service.measurement_point_id || "d96c5dc6-3c64-4506-b505a7d5c84a7"}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937',
                      sx: { wordBreak: 'break-all' }
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Estado de contribución:" 
                    secondary="No"
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Serial del medidor:" 
                    secondary={service.meter?.serial || "22z115665-0"}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="NIU / C:" 
                    secondary="10077034-2cc4-4bc5-9f74-4de00e90c500"
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937',
                      sx: { wordBreak: 'break-all' }
                    }}
                  />
                </ListItem>
              </List>
              
              {/* Additional service information from backend */}
              {service.started_at && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="#6b7280" sx={{ display: 'block', mb: 1 }}>
                    📅 Fecha inicio servicio:
                  </Typography>
                  <Typography variant="caption" color="#1f2937" sx={{ display: 'block', mb: 1 }}>
                    {new Date(service.started_at).toLocaleDateString()}
                  </Typography>
                </Box>
              )}
              
              {service.service_agreement?.contribution_flag !== undefined && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="#6b7280" sx={{ display: 'block', mb: 1 }}>
                    🏭 Estado de contribución:
                  </Typography>
                  <Typography variant="caption" color="#1f2937" sx={{ display: 'block', mb: 1 }}>
                    {service.service_agreement.contribution_flag ? 'Sí' : 'No'}
                  </Typography>
                </Box>
              )}
              
              {service.creg_subscriber?.asset_ownership?.sui_code && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="#6b7280" sx={{ display: 'block', mb: 1 }}>
                    ⚡ Propietario del activo:
                  </Typography>
                  <Typography variant="caption" color="#1f2937" sx={{ display: 'block', mb: 1 }}>
                    {service.creg_subscriber.asset_ownership.sui_code}
                  </Typography>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>

          {/* Información del predio */}
          <Accordion 
            expanded={expanded.includes('predio')}
            onChange={() => handleAccordionChange('predio')}
            elevation={0}
            sx={{ 
              '&:before': { display: 'none' },
              borderBottom: '1px solid #e5e7eb'
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                px: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <HomeIcon sx={{ color: '#f97316', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>
                Información del predio
              </Typography>
              <IconButton size="small" sx={{ color: '#6b7280', ml: 'auto', mr: 1 }}>
                <EditIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
              <List dense sx={{ py: 0 }}>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Dirección:" 
                    secondary={service.estate?.address || "CRA 74 A 82 15 APTO 704 PUENTE LARGO"}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Departamento:" 
                    secondary={service.estate?.state || "Antioquia"}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Ciudad:" 
                    secondary={service.estate?.city || "Medellín"}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Estrato:" 
                    secondary={service.creg_subscriber?.sui_social_stratum?.sui_code || "4"}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
              </List>
              <Button
                variant="text"
                size="small"
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  color: '#6b46c1',
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  fontWeight: 500,
                  mt: 1,
                  p: 0,
                  justifyContent: 'flex-start'
                }}
              >
                Ver más detalle
              </Button>
            </AccordionDetails>
          </Accordion>

          {/* Información del plan */}
          <Accordion 
            expanded={expanded.includes('plan')}
            onChange={() => handleAccordionChange('plan')}
            elevation={0}
            sx={{ 
              '&:before': { display: 'none' },
              borderBottom: '1px solid #e5e7eb'
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                px: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <DescriptionIcon sx={{ color: '#f59e0b', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>
                Información del plan
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
              <List dense sx={{ py: 0 }}>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Plan actual:" 
                    secondary={planInfo.current}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Cobertura:" 
                    secondary={planInfo.coverage}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Estado:" 
                    secondary={planInfo.status}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Fecha inicio:" 
                    secondary={planInfo.startDate}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText 
                    primary="Fecha fin:" 
                    secondary={planInfo.endDate}
                    primaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#6b7280',
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'caption', 
                      color: '#1f2937'
                    }}
                  />
                </ListItem>
              </List>
              <Button
                variant="text"
                size="small"
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  color: '#6b46c1',
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  fontWeight: 500,
                  mt: 1,
                  p: 0,
                  justifyContent: 'flex-start'
                }}
              >
                Ver más detalle
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{
                  color: '#f59e0b',
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  fontWeight: 500,
                  mt: 0.5,
                  p: 0,
                  justifyContent: 'flex-start',
                  display: 'block'
                }}
              >
                Cambiar plan de servicio a8
              </Button>
            </AccordionDetails>
          </Accordion>

          {/* Información de la frontera */}
          <Accordion 
            expanded={expanded.includes('frontera')}
            onChange={() => handleAccordionChange('frontera')}
            elevation={0}
            sx={{ 
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                px: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <AccountTreeIcon sx={{ color: '#8b5cf6', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>
                Información de la frontera
              </Typography>
              <IconButton size="small" sx={{ color: '#6b7280', ml: 'auto', mr: 1 }}>
                <EditIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
              {isLoadingFrontiers ? (
                <CircularProgress size={24} />
              ) : enerbitFrontiersError ? (
                <Typography variant="caption" color="error">
                  Error cargando fronteras: {enerbitFrontiersError}
                </Typography>
              ) : enerbitFrontiers && enerbitFrontiers.length > 0 ? (
                <>
                  {enerbitFrontiers.map((frontier, index) => (
                    <List dense sx={{ py: 0 }} key={frontier.id || index}>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemText 
                          primary="Código XM:" 
                          secondary={frontier.frontier_xm_code || "No disponible"}
                          primaryTypographyProps={{ 
                            variant: 'caption', 
                            color: '#6b7280',
                            fontWeight: 500
                          }}
                          secondaryTypographyProps={{ 
                            variant: 'caption', 
                            color: '#1f2937'
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemText 
                          primary="Tipo de frontera:" 
                          secondary={frontier.frontier_type === 'IMPORT_FRONTIER' ? 'Importadora' : frontier.frontier_type === 'EXPORT_FRONTIER' ? 'Exportadora' : frontier.frontier_type || 'No especificado'}
                          primaryTypographyProps={{ 
                            variant: 'caption', 
                            color: '#6b7280',
                            fontWeight: 500
                          }}
                          secondaryTypographyProps={{ 
                            variant: 'caption', 
                            color: '#1f2937'
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemText 
                          primary="Fecha de registro ante XM:" 
                          secondary={frontier.frontier_xm_registered_from ? new Date(frontier.frontier_xm_registered_from).toLocaleDateString() : "No disponible"}
                          primaryTypographyProps={{ 
                            variant: 'caption', 
                            color: '#6b7280',
                            fontWeight: 500
                          }}
                          secondaryTypographyProps={{ 
                            variant: 'caption', 
                            color: '#1f2937'
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemText 
                          primary="ID Lead:" 
                          secondary={frontier.lead_id || "No disponible"}
                          primaryTypographyProps={{ 
                            variant: 'caption', 
                            color: '#6b7280',
                            fontWeight: 500
                          }}
                          secondaryTypographyProps={{ 
                            variant: 'caption', 
                            color: '#1f2937'
                          }}
                        />
                      </ListItem>
                      {index < enerbitFrontiers.length - 1 && (
                        <Divider sx={{ my: 1 }} />
                      )}
                    </List>
                  ))}
                </>
              ) : (
                <Typography variant="caption" color="#6b7280">
                  No hay información de fronteras disponible
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      </CardContent>
    </Card>
  );
};