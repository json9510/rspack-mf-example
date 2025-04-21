declare module "hostApp/ThemeToggle" {
	import type { ComponentType } from "react";
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const ThemeToggle: ComponentType<any>;
	export default ThemeToggle;
}

declare module "*.png" {
  const src: string;
  export default src;
}


declare module "host/RemoteButton" {
  const RemoteButton: React.ComponentType<{
    text: string;
    color: "primary" | "secondary" | "error" | "warning" | "info" | "success";
    onClick?: () => void;
    children?: React.ReactNode;
  }>;
  export default RemoteButton;
}