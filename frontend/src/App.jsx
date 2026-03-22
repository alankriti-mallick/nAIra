import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import MealSuggestion from "./components/MealSuggestion";
import GroceryList from "./components/GroceryList";
import TaskList from "./components/TaskList";
import Profile from "./components/Profile";

/* -------------------------------- */
/* PAGE TITLES MAP */
/* -------------------------------- */

const titles = {
  "/dashboard": "Dashboard",
  "/meals": "Meal Suggestions",
  "/groceries": "Groceries",
  "/tasks": "Tasks",
  "/profile": "Profile",
};

/* -------------------------------- */
/* BROWSER TAB TITLE */
/* -------------------------------- */

function PageTitleManager() {
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] || "nAIra";
  }, [location]);

  return null;
}

/* -------------------------------- */
/* HEADER */
/* -------------------------------- */

function LayoutHeader() {
  const location = useLocation();
  const title = titles[location.pathname] || "nAIra";

  return (
    <div className="h-16 flex items-center px-8 bg-navbar/10 backdrop-blur-xl">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
}

/* -------------------------------- */
/* APP */
/* -------------------------------- */

function App() {
  return (
    <>
      <PageTitleManager />
      {/* MAIN APP */}
      <div className="flex h-screen text-text-light relative z-10">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN AREA */}
        <div className="flex-1 flex flex-col overflow-hidden bg-navbar/90 border-none">
          {/* HEADER */}
          <LayoutHeader />

          {/* CONTENT AREA */}
          <div className="flex-1 bg-dark-bg/5 backdrop-blur-xl rounded-tl-[40px] p-6 overflow-hidden border border-white/10">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/meals" element={<MealSuggestion />} />
              <Route path="/groceries" element={<GroceryList />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
