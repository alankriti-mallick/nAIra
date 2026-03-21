import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import MealSuggestion from "./components/MealSuggestion";
import GroceryList from "./components/GroceryList";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meals" element={<MealSuggestion />} />
          <Route path="/groceries" element={<GroceryList />} />
          <Route path="/tasks" element={<TaskList />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;