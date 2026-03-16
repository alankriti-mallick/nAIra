import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  completeTask,
  deleteTask,
  updateTask
} from "../services/api";

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
      priority
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
      priority
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
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Task List</h1>

      <div className="bg-white shadow rounded-xl p-6">

        <div className="flex gap-2 mb-6">

          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Task title"
          />

          <select
            value={priority}
            onChange={(e)=>setPriority(Number(e.target.value))}
            className="border p-2 rounded"
          >
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>

          {editingId ? (
            <button
              onClick={saveEdit}
              className="bg-yellow-500 text-white px-4 rounded"
            >
              Update
            </button>
          ) : (
            <button
              onClick={addTask}
              className="bg-green-500 text-white px-4 rounded"
            >
              Add
            </button>
          )}

        </div>

        <ul className="space-y-4">

          {tasks.map((task) => (

            <li
              key={task._id}
              className="flex items-center justify-between border-b pb-2"
            >

              <div>

                <span className={task.completed ? "line-through" : ""}>
                  {task.title}
                </span>

                <div className="text-sm text-gray-500">
                  Priority:
                  {task.priority === 3 && " 🔴 High"}
                  {task.priority === 2 && " 🟠 Medium"}
                  {task.priority === 1 && " 🟢 Low"}
                </div>

              </div>

              <div className="space-x-2">

                {!task.completed && (
                  <button
                    onClick={()=>markDone(task._id)}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Done
                  </button>
                )}

                <button
                  onClick={()=>startEdit(task)}
                  className="text-sm bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={()=>removeTask(task._id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>

            </li>

          ))}

        </ul>

      </div>

    </div>
  );
}

export default TaskList;