import AppThemeProvider from "../shared/branding/theme/AppThemeProvider";
import AppRoutes from "./routes";

const App = () => {
  return (
    <AppThemeProvider>
      <AppRoutes />
    </AppThemeProvider>
  );
};

export default App;
