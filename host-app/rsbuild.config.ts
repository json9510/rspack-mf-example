import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        loginApp: "loginApp@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        "./brandingStore": "./src/shared/branding/brandingStore.ts",
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^19.1.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^19.1.0' },
        zustand: { singleton: true, eager: true, },
      },
      
      
    }),
  ],
  server: {
    port: 3000,
  },
});
