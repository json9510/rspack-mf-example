import React, { useMemo } from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useBrandingStore } from "../shared/branding/brandingStore";

// @ts-ignore - Module Federation type issues
const RemoteLoginPage = lazy(async () => {
  const mod = await import("loginApp/LoginPage");
  return { default: mod.default };
});

const AppRoutes = () => {
  const store = useBrandingStore();

  const branding = useMemo(
    () => ({
      currentClient: store.currentClient,
    }),
    [store.currentClient]
  );

  console.log("🔥 Branding data in AppRoutes:", branding);

  const WrappedLoginPage = () => <RemoteLoginPage {...branding} />;

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<WrappedLoginPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
