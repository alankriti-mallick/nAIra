import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  completeTask,
  deleteTask,
  updateTask,
} from "../services/api";
import { playHover } from "../utils/sound";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(1);
  const [editingId, setEditingId] = useState(null);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;

    await createTask({
      title,
      priority,
    });

    setTitle("");
    setPriority(1);
    loadTasks();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setPriority(task.priority);
  };

  const saveEdit = async () => {
    await updateTask(editingId, {
      title,
      priority,
    });

    setEditingId(null);
    setTitle("");
    setPriority(1);
    loadTasks();
  };

  const markDone = async (id) => {
    await completeTask(id);
    loadTasks();
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="relative min-h-screen text-text-dark">
      {/* 🌌 Aurora */}
      <div className="aurora-container">
        <div className="aurora aurora1"></div>
        <div className="aurora aurora2"></div>
        <div className="aurora aurora3"></div>
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <h1 className="text-3xl font-bold">Task List 📋</h1>

        {/* ✨ ADD / EDIT TASK */}
        <div className="bg-primary backdrop-blur-lg p-5 rounded-xl shadow flex flex-wrap gap-3 items-center">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task... ✨"
            className="bg-white/20 p-3 rounded-lg outline-none w-64 
                     focus:ring-2 focus:ring-pink-300 transition"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="bg-primary text-text-dark p-3 rounded-lg outline-none 
           focus:ring-2 focus:ring-pink-300 transition"
          >
            <option value={1} className="text-black bg-white">
              Low
            </option>
            <option value={2} className="text-black bg-white">
              Medium
            </option>
            <option value={3} className="text-black bg-white">
              High
            </option>
          </select>

          {editingId ? (
            <button
              onClick={saveEdit}
              className="bg-button px-4 py-2 rounded-lg shadow hover:scale-105 transition"
            >
              Save ✨
            </button>
          ) : (
            <button
              onClick={addTask}
              className="bg-button px-4 py-2 rounded-lg shadow hover:scale-105 transition"
            >
              Add
            </button>
          )}
        </div>

        {/* 🌸 EMPTY STATE */}
        {tasks.length === 0 && (
          <div className="text-center text-text mt-10">
            <p className="text-lg">✨ No tasks yet</p>
            <p className="text-sm mt-2">
              Add tasks and let AI organize your day 💡
            </p>
          </div>
        )}

        {/* 📦 TASK CARDS */}
        <div className="grid grid-cols-2 gap-6">
          {tasks.map((task, index) => {
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
              <div
                key={task._id}
                style={{ animationDelay: `${index * 0.08}s` }}
                onMouseEnter={playHover}
                className="animate-fadeIn bg-primary backdrop-blur-lg p-5 rounded-xl shadow 
                         hover:scale-102 hover:shadow-xl transition duration-300 
                         border border-white/10 relative overflow-hidden"
              >
                {/* Glow (non-blocking) */}
                <div className="absolute inset-0 bg-linear-to-br from-pink-200/10 to-purple-200/10 opacity-0 hover:opacity-100 transition pointer-events-none"></div>

                {/* Title */}
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  📝 {task.title}
                </h2>

                {/* Priority + Status */}
                <div className="mt-3 flex justify-between items-center">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${priorityColor}`}
                  >
                    {priorityLabel}
                  </span>

                  <span className="text-sm text-text">
                    {task.completed ? "✅ Done" : "⏳ Pending"}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-4">
                  {!task.completed && (
                    <button
                      onClick={() => markDone(task._id)}
                      className="text-sm bg-green-400/80 px-3 py-1 rounded-lg 
                               hover:scale-105 transition"
                      onMouseEnter={playHover}
                    >
                      Done ✅
                    </button>
                  )}

                  <button
                    onClick={() => startEdit(task)}
                    className="text-sm bg-yellow-300/80 px-3 py-1 rounded-lg 
                             hover:scale-105 transition"
                    onMouseEnter={playHover}
                  >
                    Edit ✏️
                  </button>

                  <button
                    onClick={() => removeTask(task._id)}
                    className="text-sm bg-red-400/80 px-3 py-1 rounded-lg 
                             hover:scale-105 transition"
                    onMouseEnter={playHover}
                  >
                    Delete ❌
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
