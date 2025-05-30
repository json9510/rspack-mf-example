import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
	plugins: [
		pluginReact(),
		pluginModuleFederation({
			name: "homeApp",
			filename: "remoteEntry.js",
			exposes: {
				"./AppRoutes": "./src/index.ts",
			},
			remotes: {
				host: "host@http://localhost:3000/remoteEntry.js",
			},
			shared: {
				react: { singleton: true, eager: true, requiredVersion: false },
				"react-dom": { singleton: true, eager: true, requiredVersion: false },
				"react-router-dom": { singleton: true, eager: true },
				zustand: { singleton: true, eager: true },
			},
		}),
	],
	server: {
		port: 3003,
	},
});
