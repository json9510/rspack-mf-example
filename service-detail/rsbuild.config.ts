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
				"./AppRoutes": "./src/app/routes.tsx",
			},
			remotes: {
				host: "host@http://localhost:3000/remoteEntry.js",
			},
			shared: {
				react: { singleton: true, eager: true, requiredVersion: false },
				"react-dom": { singleton: true, eager: true, requiredVersion: false },
				zustand: { singleton: true, eager: true },
			},
			// Deshabilitar generación automática de tipos por ahora
			dts: false,
		}),
	],
	// Entry point para aplicación standalone
	source: {
		entry: {
			index: "./src/main.tsx",
		},
	},
	server: {
		port: 3005,
		host: "localhost",
		headers: {
			'Access-Control-Allow-Origin': 'http://localhost:3000',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
			'Access-Control-Allow-Credentials': 'true',
		},
	},
	dev: {
		liveReload: true,
	},
});
