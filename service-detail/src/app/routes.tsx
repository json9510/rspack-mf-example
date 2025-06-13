import React from "react";
import { Routes, Route, MemoryRouter } from "react-router-dom";

import AttentionPage from "../pages/attention/AttentionPage";

const AppRoutes = () => {
  const { pathname } = window.location;
  const subPath = pathname.replace(/^\/services/, "") || "/";

  return (
    <MemoryRouter initialEntries={[subPath]}>
      <Routes>
        <Route path="/attention/:id" element={<AttentionPage />} />
        {/* Fallback route */}
        <Route path="*" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>🛠️ Service Detail App</h2>
            <p>Navega a: <a href="/services/attention/123">/services/attention/123</a></p>
          </div>
        } />
      </Routes>
    </MemoryRouter>
  );
};

export default AppRoutes;
