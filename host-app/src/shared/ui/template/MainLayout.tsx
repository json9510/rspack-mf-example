// biome-ignore lint/style/useImportType: <explanation>
import { ReactNode } from "react";
import { Navbar } from "../../../widgets/Navbar";
import React from "react";

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="hidden">
      <Navbar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};
