import type React from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { useBillingStore } from "../../../model/billing-store";

export const HeadTableInvoice: React.FC = () => {
  const {
    totalOWed,
    isLoadingTotalOwed,
    errorTotalOwed,
    isLoadingDocumentGroupDownloaded,
  } = useBillingStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownloadClick = (_documentIds: string[]) => {
    // TODO: Implement download functionality
    console.log("Download all invoices");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      {/* Left side - Title */}
      <Box>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: '#6b46c1',
            fontSize: '2rem',
            mb: 1
          }}
        >
          Histórico de Facturación
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#6b7280',
            fontSize: '1rem'
          }}
        >
          Elige el periodo que quieres consultar
        </Typography>
      </Box>

      {/* Right side - Debt amount and download */}
      <Box 
        display="flex" 
        alignItems="center" 
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          p: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}
      >
        {errorTotalOwed ? (
          <Alert severity="error">{errorTotalOwed}</Alert>
        ) : isLoadingTotalOwed ? (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={24} />
            <Typography>Calculando deuda...</Typography>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" gap={3}>
            {/* Debt amount */}
            <Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#6b46c1',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  mb: 0.5
                }}
              >
                Deuda a la fecha
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#1f2937',
                  fontWeight: 700,
                  fontSize: '1.5rem'
                }}
              >
                {formatCurrency(totalOWed?.total_owe.TotalOwe ?? 178858)}
              </Typography>
            </Box>

            {/* Download button */}
            <Button
              variant="contained"
              disabled={isLoadingDocumentGroupDownloaded}
              onClick={() =>
                handleDownloadClick(
                  totalOWed?.total_owe.UnpaidDocuments ?? []
                )
              }
              startIcon={
                isLoadingDocumentGroupDownloaded ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <DownloadIcon />
                )
              }
              sx={{
                backgroundColor: '#f97316',
                borderRadius: 2,
                px: 2,
                py: 1,
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: '#ea580c',
                },
                '&:disabled': {
                  backgroundColor: '#d1d5db',
                },
              }}
            >
              {isLoadingDocumentGroupDownloaded ? "Descargando..." : ""}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};