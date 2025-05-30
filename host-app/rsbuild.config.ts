import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
	plugins: [
		pluginReact(),
		pluginModuleFederation({
			name: "host",
			filename: "remoteEntry.js",
			remotes: {
				loginApp: "loginApp@http://localhost:3001/remoteEntry.js",
				homeApp: "homeApp@http://localhost:3003/remoteEntry.js",
				serviceDetailApp: "serviceDetailApp@http://localhost:3005/remoteEntry.js",
			},
			exposes: {
				"./brandingStore": "./src/shared/branding/brandingStore.ts",
				"./Layout": "./src/shared/ui/template/Layout.tsx",
				"./apiClient": "./src/shared/api/apiClient.ts",
				"./token": "./src/shared/lib/utils/token",
				"./localStorage": "./src/shared/lib/utils/localStorage",
			},
			shared: {
				react: { singleton: true, eager: true, requiredVersion: false },
				"react-dom": {
					singleton: true,
					eager: true,
					requiredVersion: false,
				},
				zustand: { singleton: true, eager: true },
				"react-router": {
					singleton: true,
					eager: true,
					requiredVersion: false,
				},
			},
		}),
	],
	server: {
		port: 3000,
	},
});
