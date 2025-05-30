import type React from "react";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  type SelectChangeEvent,
  Paper,
} from "@mui/material";
import { Grid } from "@mui/material";
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
  };

  const handleClearFilter = () => {
    setYearFilter("");
    setMonthFilter("");
  };

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="end">
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>🗓️ Buscar por año</InputLabel>
            <Select
              value={yearFilter}
              onChange={(event: SelectChangeEvent<string>) =>
                setYearFilter(event.target.value)
              }
              label="🗓️ Buscar por año"
            >
              <MenuItem value="">
                <em>Todos los años</em>
              </MenuItem>
              {yearsList.map((year) => (
                <MenuItem key={year} value={year.toString()}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>📅 Buscar por mes</InputLabel>
            <Select
              value={monthFilter}
              onChange={(event: SelectChangeEvent<string>) =>
                setMonthFilter(event.target.value)
              }
              label="📅 Buscar por mes"
              disabled={!yearFilter}
            >
              <MenuItem value="">
                <em>Todos los meses</em>
              </MenuItem>
              {months.map((month) => (
                <MenuItem key={month.key} value={month.key}>
                  {month.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleApplyFilter}
            disabled={!yearFilter && !monthFilter}
          >
            🔍 Aplicar filtro
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleClearFilter}
            disabled={!yearFilter && !monthFilter}
          >
            🧹 Limpiar filtro
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => {
              console.log("Export CSV functionality - TODO");
            }}
          >
            📊 Exportar CSV
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
