import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Collapse,
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Download as DownloadIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";

import { useBillingStore } from "../../../model/billing-store";

// Mock data structure to match the image
interface InvoiceItem {
  id: string;
  serviceName: string;
  serviceType: string;
  status: 'Pagada' | 'Pendiente';
  amount: number;
  icon: string;
  color: string;
}

interface MonthlyBilling {
  month: string;
  year: string;
  total: number;
  pendingAmount: number;
  invoices: InvoiceItem[];
  hasReliquidation: boolean;
}

// Mock data that matches the image
const mockBillingData: MonthlyBilling[] = [
  {
    month: "Junio",
    year: "2025",
    total: 178858,
    pendingAmount: 178858,
    hasReliquidation: true,
    invoices: [
      {
        id: "1",
        serviceName: "Servicio enerBit de componente fija",
        serviceType: "fixed_component",
        status: "Pagada",
        amount: 0,
        icon: "E",
        color: "#ef4444"
      },
      {
        id: "2",
        serviceName: "Servicios enerBit",
        serviceType: "energy",
        status: "Pendiente",
        amount: 6804,
        icon: "E",
        color: "#ef4444"
      },
      {
        id: "3",
        serviceName: "Energía tradicional",
        serviceType: "traditional_energy",
        status: "Pendiente",
        amount: 8165,
        icon: "E",
        color: "#10b981"
      },
      {
        id: "4",
        serviceName: "Alumbrado público",
        serviceType: "public_lighting",
        status: "Pendiente",
        amount: 19000,
        icon: "$",
        color: "#6b46c1"
      },
      {
        id: "5",
        serviceName: "Servicio enerBit de componente fija",
        serviceType: "fixed_component",
        status: "Pendiente",
        amount: 8012,
        icon: "$",
        color: "#6b46c1"
      },
      {
        id: "6",
        serviceName: "Energía tradicional",
        serviceType: "traditional_energy",
        status: "Pendiente",
        amount: 168935,
        icon: "$",
        color: "#6b46c1"
      },
      {
        id: "7",
        serviceName: "Servicios enerBit",
        serviceType: "energy",
        status: "Pendiente",
        amount: -15728,
        icon: "$",
        color: "#6b46c1"
      }
    ]
  },
  {
    month: "Mayo",
    year: "2025",
    total: 174085,
    pendingAmount: 0,
    hasReliquidation: true,
    invoices: []
  },
  {
    month: "Abril",
    year: "2025",
    total: 158446,
    pendingAmount: 0,
    hasReliquidation: true,
    invoices: []
  },
  {
    month: "Marzo",
    year: "2025",
    total: 143286,
    pendingAmount: 0,
    hasReliquidation: true,
    invoices: []
  }
];

export const TableInvoice: React.FC = () => {
  const { isLoadingInvoices } = useBillingStore();
  const [expandedMonths, setExpandedMonths] = useState<string[]>(["Junio-2025"]);
  const [downloadingInvoices, setDownloadingInvoices] = useState<string[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleMonthToggle = (monthKey: string) => {
    setExpandedMonths(prev => 
      prev.includes(monthKey) 
        ? prev.filter(key => key !== monthKey)
        : [...prev, monthKey]
    );
  };

  const handleDownloadMonth = async (monthKey: string) => {
    setDownloadingInvoices(prev => [...prev, monthKey]);
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Downloaded invoices for ${monthKey}`);
    } finally {
      setDownloadingInvoices(prev => prev.filter(key => key !== monthKey));
    }
  };

  const handleInvoiceDetail = (invoice: InvoiceItem) => {
    console.log("View invoice detail:", invoice);
  };

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

  return (
    <Box>
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
          borderRadius: 2,
          backgroundColor: 'white',
          border: '1px solid #e5e7eb'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f9fafb' }}>
              <TableCell sx={{ 
                fontWeight: 600, 
                color: '#374151',
                py: 2,
                borderBottom: '1px solid #e5e7eb'
              }}>
                Emisión de factura
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 600, 
                color: '#374151',
                py: 2,
                borderBottom: '1px solid #e5e7eb'
              }}>
                Total
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 600, 
                color: '#374151',
                py: 2,
                borderBottom: '1px solid #e5e7eb'
              }}>
                Pendiente por pagar
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 600, 
                color: '#374151',
                py: 2,
                borderBottom: '1px solid #e5e7eb'
              }}>
                Reliquidación
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 600, 
                color: '#374151',
                py: 2,
                borderBottom: '1px solid #e5e7eb'
              }}>
                Descarga factura
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockBillingData.map((monthData) => {
              const monthKey = `${monthData.month}-${monthData.year}`;
              const isExpanded = expandedMonths.includes(monthKey);
              const isDownloading = downloadingInvoices.includes(monthKey);

              return (
                <React.Fragment key={monthKey}>
                  {/* Month Summary Row */}
                  <TableRow 
                    sx={{ 
                      backgroundColor: '#f9fafb',
                      '&:hover': { backgroundColor: '#f3f4f6' }
                    }}
                  >
                    <TableCell sx={{ py: 2, borderBottom: 'none' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleMonthToggle(monthKey)}
                          sx={{ color: '#6b46c1' }}
                        >
                          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#1f2937' }}>
                          {monthData.month} / {monthData.year}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2, borderBottom: 'none' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#1f2937' }}>
                        {formatCurrency(monthData.total)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2, borderBottom: 'none' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#1f2937' }}>
                        {formatCurrency(monthData.pendingAmount)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2, borderBottom: 'none' }}>
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: '#6b46c1',
                          color: 'white',
                          width: 32,
                          height: 32,
                          '&:hover': {
                            backgroundColor: '#553c9a',
                          },
                        }}
                      >
                        <MonetizationOnIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ py: 2, borderBottom: 'none' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        disabled={isDownloading}
                        onClick={() => handleDownloadMonth(monthKey)}
                        startIcon={
                          isDownloading ? (
                            <CircularProgress size={16} />
                          ) : (
                            <DownloadIcon />
                          )
                        }
                        sx={{
                          borderColor: '#e5e7eb',
                          color: '#6b7280',
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 500,
                          '&:hover': {
                            borderColor: '#6b46c1',
                            color: '#6b46c1',
                          },
                        }}
                      >
                        {isDownloading ? "" : "Factura"}
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Invoice Details */}
                  <TableRow>
                    <TableCell colSpan={5} sx={{ p: 0, borderBottom: 'none' }}>
                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 2, backgroundColor: '#fafafa' }}>
                          {monthData.invoices.length > 0 ? (
                            monthData.invoices.map((invoice) => (
                              <Box
                                key={invoice.id}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 2,
                                  py: 2,
                                  borderBottom: '1px solid #f3f4f6',
                                  '&:last-child': {
                                    borderBottom: 'none',
                                  },
                                }}
                              >
                                {/* Service Icon */}
                                <Box
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 2,
                                    backgroundColor: invoice.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                  }}
                                >
                                  {invoice.icon}
                                </Box>

                                {/* Service Name */}
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="body2" color="text.primary">
                                    {invoice.serviceName}
                                  </Typography>
                                </Box>

                                {/* Status */}
                                <Box sx={{ minWidth: 100 }}>
                                  <Chip
                                    label={invoice.status}
                                    size="small"
                                    sx={{
                                      backgroundColor: invoice.status === 'Pagada' ? '#dcfce7' : '#fef3c7',
                                      color: invoice.status === 'Pagada' ? '#16a34a' : '#d97706',
                                      fontWeight: 500,
                                    }}
                                  />
                                </Box>

                                {/* Amount */}
                                <Box sx={{ minWidth: 120, textAlign: 'right' }}>
                                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                    Valor de la factura
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {formatCurrency(invoice.amount)}
                                  </Typography>
                                </Box>

                                {/* Detail Button */}
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() => handleInvoiceDetail(invoice)}
                                  sx={{
                                    backgroundColor: '#f97316',
                                    borderRadius: 2,
                                    px: 2,
                                    py: 0.5,
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    minWidth: 80,
                                    '&:hover': {
                                      backgroundColor: '#ea580c',
                                    },
                                  }}
                                >
                                  Detalle
                                </Button>
                              </Box>
                            ))
                          ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                              No hay facturas para mostrar en este mes
                            </Typography>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};