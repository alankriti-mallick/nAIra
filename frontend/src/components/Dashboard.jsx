import { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";
import { getTasks } from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [meal, setMeal] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [advice, setAdvice] = useState("");
  const [timeSaved, setTimeSaved] = useState(null);
  const [meals, setMeals] = useState([]);

  const [loadingAI, setLoadingAI] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const calendarRes = await fetch("http://localhost:5000/api/calendar");
        const calendarData = await calendarRes.json();

        setData(calendarData);

        // GET MEALS BY GROCERY LIST
        const aiMealRes = await fetch("http://localhost:5000/api/ai/meals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            energyLevel: calendarData.energyLevel
          }),
        });

        const aiMealData = await aiMealRes.json();
        setMeals(aiMealData);

        // GET TASKS FROM TASK LIST AND SORT BY PRIORITY
        const allTasks = await getTasks();
        const incompleteTasks = allTasks.filter(task => !task.completed);
        const sortedTasks = incompleteTasks.sort((a, b) => b.priority - a.priority);
        setTasks(sortedTasks);

        // GET DASHBOARD DATA BASED ON MEALS AND ENERGY LEVEL
        const aiRes = await fetch("http://localhost:5000/api/ai/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            energyLevel: calendarData.energyLevel,
            meals
          }),
        });

        const aiData = await aiRes.json();

        setMeal(aiData.mealSuggestion);
        setAdvice(aiData.advice || []);
        setTimeSaved(aiData.timeSaved || 0);

        setLoadingAI(false);
      } catch (err) {
        console.error(err);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Calendar Metrics */}

      <div className="grid grid-cols-4 gap-6">
        {!data ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <div className="bg-primary p-5 rounded-xl shadow">
              <h3 className="text-text">Meetings</h3>
              <p className="text-2xl font-bold">{data.meetingCount}</p>
            </div>

            <div className="bg-primary p-5 rounded-xl shadow">
              <h3 className="text-text">Meeting Hours</h3>
              <p className="text-2xl font-bold">{data.meetingHours}</p>
            </div>

            <div className="bg-primary p-5 rounded-xl shadow">
              <h3 className="text-text">Free Hours</h3>
              <p className="text-2xl font-bold">{data.freeHours}</p>
            </div>

            <div className="bg-primary p-5 rounded-xl shadow">
              <h3 className="text-text">Energy Level</h3>
              <p className="text-2xl font-bold">{data.energyLevel}</p>
            </div>
          </>
        )}
      </div>

      <div className="bg-primary shadow rounded-xl p-5">
        <h2 className="text-lg font-semibold">Time Saved Today</h2>
        {loadingAI ? (
          <SkeletonCard />
        ) : (<>
            <p className="text-2xl mt-2 font-bold">{timeSaved} mins</p>
            <p className="text-sm text-text">
              Weekly: ~{timeSaved ? timeSaved * 7 : 0} mins saved
            </p>
          </>
        )}
      </div>

      {/* AI Section */}

      <div className="grid grid-cols-3 gap-6">
        {/* Meal Suggestion */}

        <div className="bg-primary shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold">Meal Suggestion</h2>

          {loadingAI ? (
            <SkeletonCard />
          ) : (
            <>
              <p className="mt-2 text-xl font-semibold">{meal?.name}</p>
              <p className="text-text">Prep Time: {meal?.prepTime} mins</p>
              <p className="text-text text-sm mt-1">{meal?.reason}</p>
            </>
          )}
        </div>

        {/* Task Priority */}

        <div className="bg-primary shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold">Task Priority</h2>

          {loadingAI ? (
            <SkeletonCard />
          ) : (
            <ul className="mt-2 space-y-2">
              {tasks.length > 0 ? (
                tasks.slice(0, 3).map((task, index) => {
                  const priorityLabel = task.priority === 3 ? "High" : task.priority === 2 ? "Medium" : "Low";
                  const priorityColor = task.priority === 3 ? "bg-red-100 text-red-800" : task.priority === 2 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800";
                  return (
                    <li key={task._id} className="bg-white p-2 rounded text-sm flex justify-between items-center">
                      <span>{index + 1}. {task.title}</span>
                      <span className={`text-xs px-2 py-1 rounded ${priorityColor}`}>{priorityLabel}</span>
                    </li>
                  );
                })
              ) : (
                <p className="text-text text-sm">No tasks available</p>
              )}
            </ul>
          )}
        </div>

        {/* AI Advice */}

        <div className="bg-primary shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold">AI Advice</h2>

          {loadingAI ? (
            <SkeletonCard />
          ) : (
            <p className="mt-2 text-text">{advice}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
