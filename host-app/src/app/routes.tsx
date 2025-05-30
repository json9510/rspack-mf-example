import React, { useMemo } from "react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { useBrandingStore } from "../shared/branding/brandingStore";
import ProtectedRoute from "../shared/lib/router/ProtectedRoute";
import Layout from "../shared/ui/template/Layout";
import PublicRoute from "../shared/lib/router/PublicRoute";

// @ts-ignore - Module Federation type issues
const RemoteLoginPage = lazy(async () => {
  const mod = await import("loginApp/LoginPage");
  return { default: mod.default };
});

// @ts-ignore - Module Federation type issues
const RemoteHomePage = lazy(() => import("homeApp/AppRoutes"));

// @ts-ignore - Module Federation type issues
const RemoteServiceDetailPage = lazy(() => import("serviceDetailApp/AppRoutes"));

const AppRoutes = () => {
  const store = useBrandingStore();

  const branding = useMemo(
    () => ({
      currentClient: store.currentClient,
    }),
    [store.currentClient]
  );

  const WrappedLoginPage = () => <RemoteLoginPage {...branding} />;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <WrappedLoginPage />
            </PublicRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/home/*" element={<RemoteHomePage />} />
          <Route path="/services/*" element={<RemoteServiceDetailPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
