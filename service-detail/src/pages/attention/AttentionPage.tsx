import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container, Box, Typography, Breadcrumbs, Link } from "@mui/material";
import { Grid } from "@mui/material";
import { Home as HomeIcon, Build as BuildIcon } from "@mui/icons-material";
import { LeftMenuOrganism } from "../../features/service-info";
import { BillingTab } from "../../features/billing";

const AttentionPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = "158537c4-a592-11ee-bcdf-00224854136b";

  if (!id) {
    return (
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <Typography variant="h6" color="error">
            ⚠️ Service ID is required
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      {/* Breadcrumbs */}
      <Box mb={3}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="#/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Servicios
          </Link>
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="#/"
          >
            <BuildIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Service Detail
          </Link>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            🎯 Atención - Servicio {id}
            {userId && (
              <span style={{ marginLeft: 8 }}>👤 Usuario: {userId}</span>
            )}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Menu - Information Panel */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
          <LeftMenuOrganism serviceId={id} userId={userId!} />
        </Grid>

        {/* Right Content - Billing Tab */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box
            sx={{
              minHeight: "600px",
              backgroundColor: "white",
              borderRadius: 2,
              p: 3,
              boxShadow: 1,
            }}
          >
            <BillingTab serviceId={id} />
          </Box>
        </Grid>
      </Grid>

      {/* Footer Info */}
      <Box mt={4} p={2} bgcolor="grey.50" borderRadius={2}>
        <Typography variant="body2" color="text.secondary" align="center">
          🔧 <strong>Proyecto de Migración:</strong> LeftMenu + Billing Tab | 📅
          Datos simulados para demostración | 🎯 Servicio ID: <code>{id}</code>
          {userId && (
            <>
              {" | "}
              <strong>Usuario ID:</strong> <code>{userId}</code>
            </>
          )}
        </Typography>
      </Box>
    </Container>
  );
};

export default AttentionPage;
