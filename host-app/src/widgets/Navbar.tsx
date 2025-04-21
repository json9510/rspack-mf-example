import React from "react";
import ThemeToggle from "../shared/ui/atoms/ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="bg-primary  p-4">
      <div className="text-lg">My App</div>
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </nav>
  );
};
