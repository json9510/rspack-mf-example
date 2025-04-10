// biome-ignore lint/style/useImportType: <explanation>
import { ReactNode } from "react";
import React = require("react");
import { Navbar } from "../../../widgets/Navbar";

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};
