import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './app/routes';

// Encontrar el elemento root
const container = document.getElementById('root');

if (!container) {
  console.error('❌ No se encontró el elemento #root');
} else {
  // Crear root y montar la aplicación
  const root = createRoot(container);
  
  root.render(
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  );
}
