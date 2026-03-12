import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, LayoutDashboard, Utensils, ShoppingCart, ListTodo, User } from "lucide-react";

function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-gray-900 text-white flex flex-col justify-between transition-all duration-300 
    ${collapsed ? "w-20" : "w-64"}`}>

      {/* Top Section */}
      <div>

        <div className="flex items-center justify-between p-4">

          {!collapsed && (
            <h1 className="text-xl font-bold">
              nAIra
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-700 rounded"
          >
            <Menu size={20} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-2">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
          >
            <LayoutDashboard size={20}/>
            {!collapsed && "Dashboard"}
          </Link>

          <Link
            to="/meals"
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
          >
            <Utensils size={20}/>
            {!collapsed && "Meal Suggestion"}
          </Link>

          <Link
            to="/groceries"
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
          >
            <ShoppingCart size={20}/>
            {!collapsed && "Grocery List"}
          </Link>

          <Link
            to="/tasks"
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
          >
            <ListTodo size={20}/>
            {!collapsed && "Task List"}
          </Link>

        </nav>

      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-3">

        <User size={22} />

        {!collapsed && (
          <span>Profile</span>
        )}

      </div>

    </div>
  );
}

export default Sidebar;