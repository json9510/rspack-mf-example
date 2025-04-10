import React = require("react");
import ThemeToggle from "../shared/ui/atoms/ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">My App</div>
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </nav>
  );
};
