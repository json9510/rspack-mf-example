import type React from "react";
import { useState } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useBillingStore } from "../../../model/billing-store";

export const FiltersInvoice: React.FC = () => {
  const { essId, yearFilter, setYearFilter } = useBillingStore();

  const [monthFilter, setMonthFilter] = useState<string>("");

  const getYearsList = (startYear = 2020): number[] => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };

  const getMonthsList = () => [
    { key: "01", value: "Enero" },
    { key: "02", value: "Febrero" },
    { key: "03", value: "Marzo" },
    { key: "04", value: "Abril" },
    { key: "05", value: "Mayo" },
    { key: "06", value: "Junio" },
    { key: "07", value: "Julio" },
    { key: "08", value: "Agosto" },
    { key: "09", value: "Septiembre" },
    { key: "10", value: "Octubre" },
    { key: "11", value: "Noviembre" },
    { key: "12", value: "Diciembre" },
  ];

  const yearsList = getYearsList();
  const months = getMonthsList();

  const handleApplyFilter = () => {
    const monthFilterValue =
      monthFilter !== "" ? `${yearFilter}-${monthFilter}` : yearFilter;
    console.log("Applied filter:", monthFilterValue);
    // TODO: Trigger filter logic
  };

  const handleClearFilter = () => {
    setYearFilter("");
    setMonthFilter("");
    console.log("Filters cleared");
    // TODO: Trigger clear filter logic
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 2, 
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap'
      }}
    >
      {/* Year Filter */}
      <Box sx={{ minWidth: 200 }}>
        <Typography 
          variant="body2" 
          sx={{ mb: 1, color: '#374151', fontWeight: 500 }}
        >
          Buscar por año
        </Typography>
        <FormControl fullWidth>
          <Select
            value={yearFilter}
            onChange={(event: SelectChangeEvent<string>) =>
              setYearFilter(event.target.value)
            }
            displayEmpty
            sx={{
              borderRadius: 2,
              backgroundColor: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5e7eb',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6b46c1',
              },
            }}
          >
            <MenuItem value="">
              <Typography color="text.secondary">
                Seleccionar año
              </Typography>
            </MenuItem>
            {yearsList.map((year) => (
              <MenuItem key={year} value={year.toString()}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Month Filter */}
      <Box sx={{ minWidth: 200 }}>
        <Typography 
          variant="body2" 
          sx={{ mb: 1, color: '#374151', fontWeight: 500 }}
        >
          Buscar por mes
        </Typography>
        <FormControl fullWidth>
          <Select
            value={monthFilter}
            onChange={(event: SelectChangeEvent<string>) =>
              setMonthFilter(event.target.value)
            }
            disabled={!yearFilter}
            displayEmpty
            sx={{
              borderRadius: 2,
              backgroundColor: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5e7eb',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6b46c1',
              },
              '&.Mui-disabled': {
                backgroundColor: '#f9fafb',
              },
            }}
          >
            <MenuItem value="">
              <Typography color="text.secondary">
                Seleccionar mes
              </Typography>
            </MenuItem>
            {months.map((month) => (
              <MenuItem key={month.key} value={month.key}>
                {month.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Apply Filter Button */}
      <Box sx={{ alignSelf: 'flex-end' }}>
        <Button
          variant="text"
          onClick={handleApplyFilter}
          disabled={!yearFilter && !monthFilter}
          sx={{
            color: '#6b46c1',
            fontWeight: 600,
            textTransform: 'none',
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: 'rgba(107, 70, 193, 0.04)',
            },
            '&:disabled': {
              color: '#9ca3af',
            },
          }}
        >
          Aplicar filtro
        </Button>
      </Box>

      {/* Clear Filter Button */}
      <Box sx={{ alignSelf: 'flex-end' }}>
        <Button
          variant="text"
          onClick={handleClearFilter}
          disabled={!yearFilter && !monthFilter}
          sx={{
            color: '#6b46c1',
            fontWeight: 600,
            textTransform: 'none',
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: 'rgba(107, 70, 193, 0.04)',
            },
            '&:disabled': {
              color: '#9ca3af',
            },
          }}
        >
          Limpiar filtro
        </Button>
      </Box>
    </Box>
  );
};