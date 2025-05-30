import type React from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Paper,
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

  const handleDownloadClick = (_documentIds: string[]) => {};

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Box>
        <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
          💰 Histórico de Facturación
        </Typography>
        <Typography variant="h6" color="primary" fontWeight={400}>
          Elige el periodo que quieres consultar
        </Typography>
      </Box>

      <Box display="flex" alignItems="center">
        {errorTotalOwed ? (
          <Alert severity="error">{errorTotalOwed}</Alert>
        ) : isLoadingTotalOwed ? (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={24} />
            <Typography>Calculando deuda...</Typography>
          </Box>
        ) : (
          <Paper
            elevation={1}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#F2F4F7",
              borderRadius: 2,
              padding: 2,
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6" color="primary" fontWeight={700}>
                💸 Deuda a la fecha
              </Typography>
              <Typography variant="h4" color="primary" fontWeight={700}>
                {formatCurrency(totalOWed?.total_owe.TotalOwe ?? 0)}
              </Typography>
            </Box>

            {(totalOWed?.total_owe.TotalOwe ?? 0) > 0 && (
              <Button
                variant="contained"
                color="secondary"
                disabled={isLoadingDocumentGroupDownloaded}
                onClick={() =>
                  handleDownloadClick(
                    totalOWed?.total_owe.UnpaidDocuments ?? []
                  )
                }
                startIcon={
                  isLoadingDocumentGroupDownloaded ? (
                    <CircularProgress size={16} />
                  ) : (
                    <DownloadIcon />
                  )
                }
              >
                {isLoadingDocumentGroupDownloaded
                  ? "Descargando..."
                  : "Descargar Pendientes"}
              </Button>
            )}
          </Paper>
        )}
      </Box>
    </Box>
  );
};
