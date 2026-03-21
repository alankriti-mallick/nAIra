import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  Utensils,
  ShoppingCart,
  ListTodo,
  User
} from "lucide-react";

function Sidebar() {

  const [collapsed, setCollapsed] = useState(true); // start collapsed
  const location = useLocation();

  const navItem = (to, icon, label) => {
    const isActive = location.pathname === to;

    return (
      <div className="relative group">

        <Link
          to={to}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200
          ${isActive
            ? "bg-white/20 backdrop-blur-lg shadow"
            : "hover:bg-white/10"
          }`}
        >
          <div className="hover:scale-110 transition">
            {icon}
          </div>

          {!collapsed && (
            <span className="text-sm font-medium">{label}</span>
          )}
        </Link>

        {/* TOOLTIP (only when collapsed) */}
        {collapsed && (
          <div className="absolute left-16 top-1/2 -translate-y-1/2 
                          bg-black text-white text-xs px-3 py-1 rounded-lg 
                          opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
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
      className={`h-screen bg-navbar/80 backdrop-blur-xl text-white flex flex-col justify-between 
      transition-all duration-300 border-r border-white/10
      ${collapsed ? "w-20" : "w-64"}`}
    >

      {/* TOP */}
      <div>

        {/* HEADER */}
        <div className="flex items-center justify-between p-4">

          {!collapsed && (
            <h1 className="text-xl font-bold tracking-wide">
              nAIra ✨
            </h1>
          )}

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

        <div className="relative group">

          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition cursor-pointer">
            <User size={22} />

            {!collapsed && (
              <span className="text-sm font-medium">Profile</span>
            )}
          </div>

          {/* Tooltip */}
          {collapsed && (
            <div className="absolute left-16 top-1/2 -translate-y-1/2 
                            bg-black text-white text-xs px-3 py-1 rounded-lg 
                            opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
              Profile
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Sidebar;