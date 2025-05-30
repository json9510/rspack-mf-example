import {
  BookmarkAdded as BookmarkAddedIcon,
  Download as DownloadIcon,
  ErrorOutline as ErrorOutlineIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  MonetizationOn as MonetizationOnIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { useBillingStore } from "../../../model/billing-store";
import type {
  BillingInvoice,
  BillingDetail,
} from "../../../domain/repositories/BillingRepository";

export const TableInvoice: React.FC = () => {
  const { billing, essId, yearFilter, isLoadingInvoices } = useBillingStore();

  const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});
  const [loadingButtons, setLoadingButtons] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(billing?.page ?? 1);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Fecha no disponible";
    const [year, month] = dateString.split("-");
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const monthName = months[Number.parseInt(month, 10) - 1];
    return `${monthName} / ${year}`;
  };

  const handleRowClick = (index: number) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [index]: !prevOpenRows[index],
    }));
  };

  const handleDownloadClick = async (
    index: number,
    documentIds: (string | undefined)[]
  ) => {
    const validIds = documentIds.filter((id): id is string => Boolean(id));
    if (validIds.length === 0) return;

    setLoadingButtons((prev) => [...prev, index]);
    try {
      // await downloadInvoiceGroup(validIds);
    } finally {
      setLoadingButtons((prev) => prev.filter((i) => i !== index));
    }
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const getItemColor = (
    items?: BillingInvoice[]
  ): "primary" | "error" | "success" | "secondary" => {
    if (!items) return "primary";
    const hasCreditNote = items.some(
      (item) => item.document_type === "credit_note"
    );
    const hasDebitNote = items.some(
      (item) => item.document_type === "debit_note"
    );

    if (hasCreditNote && hasDebitNote) return "secondary";
    if (hasDebitNote) return "error";
    if (hasCreditNote) return "success";
    return "primary";
  };

  const getDocumentIcon = (documentType?: string) => {
    switch (documentType) {
      case "invoice":
        return <MonetizationOnIcon />;
      case "credit_note":
        return <BookmarkAddedIcon />;
      case "debit_note":
        return <ErrorOutlineIcon />;
      default:
        return <ReceiptIcon />;
    }
  };

  const getDocumentColor = (
    documentType?: string
  ): "primary" | "error" | "success" => {
    switch (documentType) {
      case "invoice":
        return "primary";
      case "debit_note":
        return "error";
      case "credit_note":
        return "success";
      default:
        return "primary";
    }
  };

  const getPaymentStatusColor = (
    status?: string
  ): "success" | "warning" | "error" => {
    switch (status) {
      case "payed":
        return "success";
      case "pending":
        return "warning";
      case "overdue":
        return "error";
      default:
        return "warning";
    }
  };

  const getPaymentStatusText = (status?: string): string => {
    switch (status) {
      case "payed":
        return "✅ Pagado";
      case "pending":
        return "⏳ Pendiente";
      case "overdue":
        return "🚨 Vencido";
      default:
        return "⏳ Pendiente";
    }
  };

  const getDocumentTypeText = (type?: string): string => {
    switch (type) {
      case "invoice":
        return "🧾 Factura";
      case "credit_note":
        return "💚 Nota Crédito";
      case "debit_note":
        return "🔴 Nota Débito";
      default:
        return "📄 Documento";
    }
  };

  const totalPages = (billing?.page ?? 1) + (billing?.next_pages ?? 0);

  if (isLoadingInvoices) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <CircularProgress />
          <Typography>Cargando facturas...</Typography>
        </Box>
      </Box>
    );
  }

  if (!billing?.items || billing.items.length === 0) {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        📭 No se encontraron facturas para los filtros seleccionados
      </Alert>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F8F9FA" }}>
              <TableCell>
                <strong>📅 Emisión de factura</strong>
              </TableCell>
              <TableCell>
                <strong>💰 Total</strong>
              </TableCell>
              <TableCell>
                <strong>⚠️ Pendiente por pagar</strong>
              </TableCell>
              <TableCell>
                <strong>💸 Reliquidación</strong>
              </TableCell>
              <TableCell>
                <strong>📥 Descarga factura</strong>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {billing.items.map(
              (billingDetail: BillingDetail, index: number) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <React.Fragment key={index}>
                  <TableRow sx={{ backgroundColor: "#F8F9FA" }}>
                    <TableCell>
                      <Typography fontWeight={700}>
                        {formatDate(billingDetail.issued_at)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={600} color="primary">
                        {formatCurrency(
                          billingDetail.total_payable_amount || 0
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        fontWeight={600}
                        color={
                          (billingDetail.total_owe_amount || 0) > 0
                            ? "error"
                            : "success"
                        }
                      >
                        {formatCurrency(billingDetail.total_owe_amount || 0)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={getItemColor(billingDetail.items)}
                        size="small"
                        onClick={() => {
                          console.log("Ver reliquidación:", billingDetail);
                        }}
                      >
                        <MonetizationOnIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        disabled={loadingButtons.includes(index)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadClick(
                            index,
                            billingDetail.items?.map(
                              (item) => item.document_id
                            ) || []
                          );
                        }}
                        startIcon={
                          loadingButtons.includes(index) ? (
                            <CircularProgress size={16} />
                          ) : (
                            <DownloadIcon />
                          )
                        }
                      >
                        {loadingButtons.includes(index)
                          ? "Descargando..."
                          : "Factura"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleRowClick(index)}
                      >
                        {openRows[index] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={6} sx={{ p: 0 }}>
                      <Collapse
                        in={openRows[index]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ p: 2, backgroundColor: "#FAFAFA" }}>
                          <Typography variant="h6" gutterBottom color="primary">
                            📋 Detalle de Documentos -{" "}
                            {formatDate(billingDetail.issued_at)}
                          </Typography>
                          <Grid container spacing={2}>
                            {(billingDetail.items || []).map(
                              (
                                invoice: BillingInvoice,
                                invoiceIndex: number
                              ) => (
                                <Grid
                                  size={{ xs: 12, md: 6 }}
                                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                  key={invoiceIndex}
                                >
                                  <Card
                                    variant="outlined"
                                    sx={{ height: "100%" }}
                                  >
                                    <CardContent>
                                      <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                        mb={2}
                                      >
                                        <Button
                                          variant="contained"
                                          color={getDocumentColor(
                                            invoice.document_type
                                          )}
                                          size="small"
                                        >
                                          {getDocumentIcon(
                                            invoice.document_type
                                          )}
                                        </Button>
                                        <Box>
                                          <Typography
                                            variant="body1"
                                            fontWeight={600}
                                          >
                                            {getDocumentTypeText(
                                              invoice.document_type
                                            )}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                          >
                                            ID: {invoice.document_id || "N/A"}
                                          </Typography>
                                        </Box>
                                      </Box>

                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mb={1}
                                      >
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          Estado de pago:
                                        </Typography>
                                        <Chip
                                          label={getPaymentStatusText(
                                            invoice.payment_status
                                          )}
                                          color={getPaymentStatusColor(
                                            invoice.payment_status
                                          )}
                                          size="small"
                                        />
                                      </Box>

                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mb={1}
                                      >
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          Valor:
                                        </Typography>
                                        <Typography
                                          fontWeight={600}
                                          color="primary"
                                        >
                                          {formatCurrency(
                                            invoice.legal_payable_amount || 0
                                          )}
                                        </Typography>
                                      </Box>

                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mb={2}
                                      >
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          Tipo de servicio:
                                        </Typography>
                                        <Typography variant="body2">
                                          {invoice.service_type_name ===
                                          "energy_electricity"
                                            ? "⚡ Energía Eléctrica"
                                            : invoice.service_type_name ||
                                              "N/A"}
                                        </Typography>
                                      </Box>

                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        fullWidth
                                        onClick={() => {
                                          console.log(
                                            "Ver detalle de factura:",
                                            invoice.document_id
                                          );
                                        }}
                                      >
                                        👁️ Ver Detalle Completo
                                      </Button>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              )
                            )}
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!isLoadingInvoices &&
        (billing?.items?.length ?? 0) > 0 &&
        totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
    </Box>
  );
};
