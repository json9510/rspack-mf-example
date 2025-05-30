import React from "react";
import { Routes, Route, MemoryRouter, useLocation } from "react-router-dom";

import Search from "../pages/search/Search";
import Results from "../pages/results/Results";

const AppRoutes = () => {
  const { pathname } = window.location;
  const subPath = pathname.replace(/^\/home/, "") || "/";

  return (
    <MemoryRouter initialEntries={[subPath]}>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </MemoryRouter>
  );
};

export default AppRoutes;
