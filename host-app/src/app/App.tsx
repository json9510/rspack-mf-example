import React = require("react");
import AppRoutes from "../../../login-app/src/app/routes";
import { ThemeProvider } from "../shared/theme/ThemeProvider";
import { MainLayout } from "../shared/ui/template/MainLayout";

const App = () => {
  return (
    <ThemeProvider>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
