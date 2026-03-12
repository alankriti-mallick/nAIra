function TaskList() {

  const tasks = [
    "Finish client presentation",
    "Reply to product emails",
    "Fix login bug",
    "Prepare meeting notes"
  ];

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Task List</h1>

      <div className="bg-white shadow rounded-xl p-6">

        <ul className="space-y-4">

          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b pb-2"
            >
              <span>{task}</span>
              <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded">
                Done
              </button>
            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}

export default TaskList;