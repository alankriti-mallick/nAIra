import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  Utensils,
  ShoppingCart,
  ListTodo,
  User,
} from "lucide-react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  const navItem = (to, icon, label) => {
    const isActive = location.pathname === to;

    return (
      <div className="relative group">
        <Link
          to={to}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200
          ${
            isActive
              ? "bg-white/20 backdrop-blur-lg shadow"
              : "hover:bg-white/10"
          }`}
        >
          <div className="hover:scale-110 transition">{icon}</div>

          {/* TEXT (always rendered, just animated) */}
          <span
            className={`text-sm font-medium whitespace-nowrap transition-all duration-300
            ${
              collapsed
                ? "opacity-0 -translate-x-2"
                : "opacity-100 translate-x-0"
            }`}
          >
            {label}
          </span>
        </Link>

        {/* TOOLTIP */}
        {collapsed && (
          <div
            className="absolute left-16 top-1/2 -translate-y-1/2
          bg-black text-text-light text-xs px-3 py-1 rounded-lg
          opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50"
          >
            {label}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      className={`h-screen bg-navbar/90 backdrop-blur-xl text-text-light flex flex-col justify-between
      transition-[width] duration-500 ease-in-out overflow-hidden
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* TOP */}
      <div>
        {/* HEADER */}
        <div className="flex items-center justify-between p-4">
          {/* LOGO */}
          <div
            className={`flex items-center overflow-hidden transition-all duration-300
    ${collapsed ? "w-0 opacity-0" : "w-36 opacity-100"}`}
          >
            <img
              src="/naira_logo.png"
              alt="nAIra"
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* MENU BUTTON */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex flex-col gap-2 px-3 mt-4">
          {navItem("/dashboard", <LayoutDashboard size={20} />, "Dashboard")}
          {navItem("/meals", <Utensils size={20} />, "Meals")}
          {navItem("/groceries", <ShoppingCart size={20} />, "Groceries")}
          {navItem("/tasks", <ListTodo size={20} />, "Tasks")}
        </nav>
      </div>

      {/* PROFILE */}
      <div className="p-4 border-t border-white/10">
        {navItem("/profile", <User size={20} />, "Profile")}
      </div>
    </div>
  );
}

export default Sidebar;
