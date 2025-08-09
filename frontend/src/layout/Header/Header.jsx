import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { APP_NAME } from "../../constants/constants";
import { Menu, X, LogOut } from "lucide-react";
import { logout } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const navItems = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "Users", to: "/users" },
  { name: "Groups", to: "/groups" },
  { name: "Roles", to: "/roles" },
  { name: "Modules", to: "/modules" },
  { name: "Permissions", to: "/permissions" },
];

const Header = () => {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        <Link to="/dashboard">
          <h1 className="text-lg font-semibold">{APP_NAME}</h1>
        </Link>

        {isLoggedIn && (
          <nav className="hidden md:flex gap-6 items-center">
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

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition"
              title="Logout"
            >
              Logout <LogOut className="w-5 h-5" />
            </button>
          </nav>
        )}

        {isLoggedIn && (
          <button className="md:hidden" onClick={() => setDrawerOpen(true)}>
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
        )}
      </div>

      {drawerOpen && isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
          <div className="fixed top-0 right-0 w-64 h-full bg-white text-gray-800 shadow-lg flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">{APP_NAME}</h2>
              <button onClick={() => setDrawerOpen(false)}>
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            <nav className="flex flex-col p-4 gap-4 flex-grow">
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

            <button
              onClick={() => {
                setDrawerOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-2 p-4 text-gray-700 hover:text-red-600 border-t border-gray-200"
              title="Logout"
            >
              Logout <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
