import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "loginApp",
      filename: "remoteEntry.js",
      remotes: {
        host: "host@http://localhost:3000/remoteEntry.js",
      },
      exposes: {
        "./LoginPage": "./src/pages/Login/LoginPage.tsx",
        "./loadLoginCss": "./src/shared/styles/loadLoginCss.ts",
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        "react-dom": { singleton: true, eager: true, requiredVersion: false },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: false,
        },
        zustand: { singleton: true, eager: true },
      },
    }),
  ],
  server: {
    port: 3001,
  },
});
