import { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";
import { getTasks } from "../services/api";
import { playHover } from "../utils/sound";

function Dashboard() {
  const [data, setData] = useState(null);
  const [meal, setMeal] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [advice, setAdvice] = useState("");
  const [timeSaved, setTimeSaved] = useState(null);

  const [loadingAI, setLoadingAI] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const calendarRes = await fetch("https://naira-83jk.onrender.com/api/calendar");
        const calendarData = await calendarRes.json();

        setData(calendarData);

        // GET MEALS BY GROCERY LIST
        const aiMealRes = await fetch("https://naira-83jk.onrender.com/api/ai/meals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            energyLevel: calendarData.energyLevel,
          }),
        });

        const aiMealData = await aiMealRes.json();

        // GET TASKS FROM TASK LIST AND SORT BY PRIORITY
        const allTasks = await getTasks();
        const incompleteTasks = allTasks.filter((task) => !task.completed);
        const sortedTasks = incompleteTasks.sort(
          (a, b) => b.priority - a.priority,
        );
        setTasks(sortedTasks);

        // GET DASHBOARD DATA BASED ON MEALS AND ENERGY LEVEL
        const aiRes = await fetch("https://naira-83jk.onrender.com/api/ai/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            energyLevel: calendarData.energyLevel,
            meals: aiMealData.meals,
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
    <div className="relative min-h-screen text-text-dark">
      {/* Aurora Background */}
      <div className="aurora-container">
        <div className="aurora aurora1"></div>
        <div className="aurora aurora2"></div>
        <div className="aurora aurora3"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10 space-y-6 p-6">
        {/* TOP SECTION */}

        <div className="grid grid-cols-3 gap-6">
          {/* HELLO CARD */}

          <div className="col-span-2 bg-primary p-6 backdrop-blur-lg rounded-xl shadow flex justify-between items-center">
            {/* LEFT CONTENT */}
            <div className="flex flex-col justify-evenly h-full">
              <div>
                <h2 className="text-2xl font-bold mb-2">Hello Anjali 👋</h2>

                <p className="text-text text-sm">
                  Your AI life assistant is ready to help today.
                </p>
                <p className="text-sm text-text mt-2">
                  Today looks{" "}
                  {data?.energyLevel === "low"
                    ? "like a light day"
                    : "productive"}
                  . Your AI assistant has optimized your meals and tasks.
                </p>
              </div>

              {/* QUICK ACTIONS (moved higher) */}
              <div className="flex gap-3">
                <a
                  href="https://calendar.google.com"
                  target="_blank"
                  className="bg-button px-4 py-2 rounded-lg text-sm shadow hover:bg-gray-100 transition"
                  onMouseEnter={playHover}
                >
                  📅 Calendar
                </a>

                <a
                  href="https://music.youtube.com"
                  target="_blank"
                  className="bg-button px-4 py-2 rounded-lg text-sm shadow hover:bg-gray-100 transition"
                  onMouseEnter={playHover}
                >
                  🎵 Music
                </a>
              </div>
            </div>

            {/* IMAGE / ILLUSTRATION */}
            <div className="hidden md:block">
              <img
                src="/panda.png"
                alt="panda"
                className="w-80 h-80 object-contain"
              />
            </div>
          </div>

          {/* CALENDAR METRICS COLUMN */}

          <div className="flex flex-col gap-4">
            {!data ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                <div className="bg-primary p-4 rounded-xl shadow">
                  <h3 className="text-text text-sm">Meetings</h3>
                  <p className="text-xl font-bold">{data.meetingCount}</p>
                </div>

                <div className="bg-primary p-4 rounded-xl shadow">
                  <h3 className="text-text text-sm">Meeting Hours</h3>
                  <p className="text-xl font-bold">{data.meetingHours}</p>
                </div>

                <div className="bg-primary p-4 rounded-xl shadow">
                  <h3 className="text-text text-sm">Free Hours</h3>
                  <p className="text-xl font-bold">{data.freeHours}</p>
                </div>

                <div className="bg-primary p-4 rounded-xl shadow">
                  <h3 className="text-text text-sm">Energy Level</h3>
                  <p className="text-xl font-bold">{data.energyLevel}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* BOTTOM GRID */}

        <div className="grid grid-cols-4 gap-6">
          {/* TIME SAVED */}

          <div className="bg-primary shadow rounded-xl p-5">
            <h2 className="text-lg font-semibold">Time Saved</h2>

            {loadingAI ? (
              <SkeletonCard />
            ) : (
              <>
                <p className="text-2xl mt-2 font-bold">{timeSaved} mins</p>
                <p className="text-sm text-text">
                  Weekly: ~{timeSaved ? timeSaved * 7 : 0} mins
                </p>
              </>
            )}
          </div>

          {/* MEAL */}

          <div className="bg-primary shadow rounded-xl p-5">
            <h2 className="text-lg font-semibold">Meal Suggestion</h2>

            {loadingAI ? (
              <SkeletonCard />
            ) : (
              <>
                <p className="mt-2 text-xl font-semibold">{meal?.name}</p>
                <p className="text-text">Prep: {meal?.prepTime} mins</p>
              </>
            )}
          </div>

          {/* TASKS */}

          <div className="bg-primary shadow rounded-xl p-5">
            <h2 className="text-lg font-semibold">Top Tasks</h2>

            {loadingAI ? (
              <SkeletonCard />
            ) : (
              <ul className="mt-2 space-y-2">
                {tasks.length > 0 ? (
                  tasks.slice(0, 3).map((task, index) => {
                    const priorityLabel =
                      task.priority === 3
                        ? "High"
                        : task.priority === 2
                          ? "Medium"
                          : "Low";

                    const priorityColor =
                      task.priority === 3
                        ? "bg-[#D14D72] text-text-light"
                        : task.priority === 2
                          ? "bg-[#FFABAB] text-text-dark"
                          : "bg-[#FCC8D1] text-text-dark";

                    return (
                      <li
                        key={task._id}
                        className="p-2 text-sm flex justify-between"
                      >
                        <span>
                          {index + 1}. {task.title}
                        </span>

                        <span
                          className={`text-xs px-2 py-1 rounded ${priorityColor}`}
                        >
                          {priorityLabel}
                        </span>
                      </li>
                    );
                  })
                ) : (
                  <p className="text-sm text-text">No tasks</p>
                )}
              </ul>
            )}
          </div>

          {/* AI ADVICE */}

          <div className="bg-primary shadow rounded-xl p-5">
            <h2 className="text-lg font-semibold">AI Advice</h2>

            {loadingAI ? (
              <SkeletonCard />
            ) : (
              <p className="mt-2 text-text text-sm">{advice}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
