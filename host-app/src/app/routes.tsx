import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// @ts-ignore - Module Federation type issues
const RemoteLoginPage = lazy(() => import("loginApp/LoginPage"));

const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<RemoteLoginPage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRoutes;
