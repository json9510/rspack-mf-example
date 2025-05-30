import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
	plugins: [
		pluginReact(),
		pluginModuleFederation({
			name: "serviceDetailApp",
			filename: "remoteEntry.js",
			exposes: {
				"./AppRoutes": "./src/index.ts",
			},
			remotes: {
				host: "host@http://localhost:3000/remoteEntry.js",
			},
			shared: {
				react: { singleton: true, eager: true, requiredVersion: "^19.1.0" },
				"react-dom": { singleton: true, eager: true, requiredVersion: "^19.1.0" },
				"react-router-dom": { singleton: true, eager: true, requiredVersion: "^7.5.1" },
				zustand: { singleton: true, eager: true, requiredVersion: "^5.0.4" },
			},
			// Deshabilitar generación automática de tipos por ahora
			dts: false,
		}),
	],
	// Entry point para aplicación standalone
	source: {
		entry: {
			index: './src/main.tsx',
		},
	},
	server: {
		port: 3005,
	},
});