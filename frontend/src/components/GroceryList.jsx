import { useEffect, useState } from "react";

function GroceryList() {

  const [groceries, setGroceries] = useState([]);
  const [item, setItem] = useState("");

  const loadGroceries = async () => {
    const res = await fetch("http://localhost:5000/api/groceries");
    const data = await res.json();
    setGroceries(data);
  };

  useEffect(() => {
    loadGroceries();
  }, []);

  const addItem = async () => {

    await fetch("http://localhost:5000/api/groceries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: item })
    });

    setItem("");
    loadGroceries();
  };

  const deleteItem = async (id) => {

    await fetch(`http://localhost:5000/api/groceries/${id}`, {
      method: "DELETE"
    });

    loadGroceries();
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Groceries</h1>

      <div className="flex gap-3">

        <input
          className="border p-2 rounded w-64"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Add grocery"
        />

        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>

      </div>

      <div className="space-y-2">

        {groceries.map((g) => (

          <div
            key={g._id}
            className="flex justify-between bg-white p-3 rounded shadow"
          >

            <span>{g.name}</span>

            <button
              onClick={() => deleteItem(g._id)}
              className="text-red-500"
            >
              Remove
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default GroceryList;