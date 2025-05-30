import { useBillingUseCases } from "../../lib/index";
import { Alert, Box, Snackbar } from "@mui/material";
import type React from "react";
import { useEffect } from "react";
import { FiltersInvoice } from "./components/FiltersInvoice";
import { HeadTableInvoice } from "./components/HeadTableInvoice";
import { TableInvoice } from "./components/TableInvoice";

interface BillingTabProps {
  serviceId: string;
}

export const BillingTab: React.FC<BillingTabProps> = ({ serviceId }) => {
  // Get use cases and stores from composition root
  const { getBillingInvoices, getTotalOwed, stores } = useBillingUseCases();

  const { setEssId, showSnackbar, setShowSnackbar, resetState } =
    stores.billing;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (serviceId) {
      console.log(
        "📋 BillingTab: Initiating billing data fetch for service:",
        serviceId
      );

      setEssId(serviceId);

      // Execute use cases
      getTotalOwed.execute({ ess_id: serviceId, month_filter: "" });
      getBillingInvoices.execute({
        ess_id: serviceId,
        page: 1,
        month_filter: "",
      });
    }

    return () => {
      resetState();
    };
  }, []);

  return (
    <Box>
      <HeadTableInvoice />
      <FiltersInvoice />
      <TableInvoice />

      <Snackbar
        open={!!showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(null)}
      >
        <Alert
          severity={showSnackbar?.includes("✅") ? "success" : "error"}
          sx={{ width: "100%" }}
          onClose={() => setShowSnackbar(null)}
        >
          {showSnackbar}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BillingTab;
