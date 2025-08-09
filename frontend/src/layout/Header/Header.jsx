import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { APP_NAME } from "../../constants/constants";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Dashboard", to: "/" },
  { name: "Users", to: "/users" },
  { name: "Groups", to: "/groups" },
  { name: "Roles", to: "/roles" },
  { name: "Modules", to: "/modules" }
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        <h1 className="text-lg font-semibold">{APP_NAME}</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`transition-colors ${
                isActive(item.to)
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setDrawerOpen(true)}>
          <Menu className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
          <div className="fixed top-0 right-0 w-64 h-full bg-white text-gray-800 shadow-lg flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">{APP_NAME}</h2>
              <button onClick={() => setDrawerOpen(false)}>
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            <nav className="flex flex-col p-4 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`transition-colors ${
                    isActive(item.to)
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-600"
                  }`}
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
