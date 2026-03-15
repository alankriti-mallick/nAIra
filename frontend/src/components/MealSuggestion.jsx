import { useEffect, useState } from "react";

function MealSuggestion() {

  const [meals, setMeals] = useState([]);

  useEffect(() => {

    const loadMeals = async () => {

      const calendarRes = await fetch("http://localhost:5000/api/calendar");
      const calendarData = await calendarRes.json();

      const aiRes = await fetch("http://localhost:5000/api/ai/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          energyLevel: calendarData.energyLevel
        })
      });

      const data = await aiRes.json();

      setMeals(data.meals);

    };

    loadMeals();

  }, []);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Meal Suggestions</h1>

      <div className="grid grid-cols-2 gap-6">

        {meals.map((meal, index) => (

          <div key={index} className="bg-white shadow rounded-xl p-5">

            <h2 className="font-semibold text-lg">
              {meal.name}
            </h2>

            <p className="text-gray-500">
              Prep Time: {meal.prepTime} minutes
            </p>

            <p className="text-gray-400 text-sm mt-2">
              {meal.reason}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MealSuggestion;