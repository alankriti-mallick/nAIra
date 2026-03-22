import { useEffect, useState } from "react";
import { playHover } from "../utils/sound";

function GroceryList() {
  const [groceries, setGroceries] = useState([]);
  const [item, setItem] = useState("");

  const loadGroceries = async () => {
    const res = await fetch("https://naira-83jk.onrender.com/api/groceries");
    const data = await res.json();
    setGroceries(data || []);
  };

  useEffect(() => {
    loadGroceries();
  }, []);

  const addItem = async () => {
    if (!item.trim()) return;

    await fetch("https://naira-83jk.onrender.com/api/groceries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item }),
    });

    setItem("");
    loadGroceries();
  };

  const deleteItem = async (id) => {
    await fetch(`https://naira-83jk.onrender.com/api/groceries/${id}`, {
      method: "DELETE",
    });

    loadGroceries();
  };

  return (
    <div className="relative min-h-screen text-text-dark">
      {/* Aurora */}
      <div className="aurora-container">
        <div className="aurora aurora1"></div>
        <div className="aurora aurora2"></div>
        <div className="aurora aurora3"></div>
      </div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Input */}
        <div className="flex gap-3 items-center">
          <input
            className="bg-primary backdrop-blur-lg p-3 rounded-lg w-64 outline-none 
                       focus:ring-2 focus:ring-pink-300 transition"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Add something yummy... 🥑"
          />

          <button
            onClick={addItem}
            className="bg-button px-4 py-2 rounded-lg shadow 
                       hover:scale-105 transition"
            onMouseEnter={playHover}
          >
            Add
          </button>
        </div>

        {/* Empty State */}
        {groceries.length === 0 && (
          <div className="text-center text-text mt-10">
            <p className="text-lg">✨ Your kitchen is empty</p>
            <p className="text-sm mt-2">
              Add items and let AI suggest meals 💡
            </p>
          </div>
        )}

        {/* Grocery Cards */}
        <div className="grid grid-cols-2 gap-4">
          {groceries.map((g, index) => (
            <div
              key={g._id}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="animate-fadeIn bg-primary backdrop-blur-lg p-4 rounded-xl shadow 
                         flex justify-between items-center 
                         hover:scale-101 transition duration-300"
              onMouseEnter={playHover}
            >
              <span className="text-lg flex items-center gap-2">
                🛒 {g.name}
              </span>

              <button
                onClick={() => deleteItem(g._id)}
                className="text-red-400 hover:text-red-600 transition text-lg"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroceryList;
