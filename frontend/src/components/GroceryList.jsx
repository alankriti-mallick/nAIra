function GroceryList() {

  const groceries = [
    "Paneer",
    "Broccoli",
    "Soy Sauce",
    "Garlic",
    "Rice",
    "Tomatoes"
  ];

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Grocery List</h1>

      <div className="bg-white shadow rounded-xl p-6">

        <ul className="space-y-3">

          {groceries.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3"
            >
              <input type="checkbox" />
              {item}
            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}

export default GroceryList;