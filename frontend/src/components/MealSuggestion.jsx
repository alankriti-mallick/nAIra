import { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";

function MealSuggestion() {

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(false);

  useEffect(() => {

    const loadMeals = async () => {
      try {

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

        setMeals(data.meals || []);
        setLoading(false);

      } catch (err) {
        console.error(err);
      }
    };

    loadMeals();

  }, []);

  const handleUseMeal = async (meal) => {

    try {
      setLoadingRecipe(true);

      const res = await fetch("http://localhost:5000/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mealName: meal.name,
          ingredients: meal.ingredients
        })
      });

      const data = await res.json();

      setSelectedRecipe(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRecipe(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white">

      {/* 🌌 Aurora Background */}
      <div className="aurora-container">
        <div className="aurora aurora1"></div>
        <div className="aurora aurora2"></div>
        <div className="aurora aurora3"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-6 space-y-6">

        <h1 className="text-3xl font-bold">Meal Suggestions 🍽️</h1>

        <div className="grid grid-cols-3 gap-6">

          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : meals.length > 0 ? (

            meals.map((meal, index) => (

              <div
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fadeIn bg-primary backdrop-blur-lg p-5 rounded-xl shadow 
                           hover:scale-105 hover:shadow-xl transition duration-300 
                           border border-white/10 relative overflow-hidden"
              >

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200/10 to-purple-200/10 opacity-0 hover:opacity-100 transition pointer-events-none"></div>
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  🍽 {meal.name}
                </h2>

                <p className="text-text text-sm mt-1">
                  ⏱ {meal.prepTime} mins
                </p>

                <p className="text-text text-sm mt-2">
                  {meal.reason}
                </p>

                <button
                  onClick={() => handleUseMeal(meal)}
                  className="mt-4 text-sm bg-button px-3 py-1 rounded-lg 
                             hover:scale-105 transition"
                >
                  Use this meal 💖
                </button>

              </div>

            ))

          ) : (
            <p className="text-text">No meals available</p>
          )}

        </div>

      </div>

      {/* 🍳 LOADING OVERLAY */}
      {loadingRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-white text-lg">
          Cooking up your recipe... 🍳✨
        </div>
      )}

      {/* 🍲 RECIPE MODAL */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-primary backdrop-blur-lg w-[500px] max-h-[80vh] overflow-y-auto p-6 rounded-xl shadow-xl">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                🍽 {selectedRecipe.name}
              </h2>

              <button
              onClick={() => setSelectedRecipe(null)}
              className="text-red-400 text-xl cursor-pointer 
                        hover:text-red-600 hover:bg-white/10 
                        p-2 rounded-full active:scale-90 transition"
            >
              ✕
            </button>
            </div>

            <p className="text-sm text-text mt-2">
              ⏱ {selectedRecipe.prepTime} mins
            </p>

            {/* INGREDIENTS */}
            <div className="mt-4">
              <h3 className="font-semibold">🛒 Ingredients</h3>

              <ul className="mt-2 space-y-1">
                {selectedRecipe.ingredients?.map((item, i) => (
                  <li key={i} className="text-sm">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* STEPS */}
            <div className="mt-4">
              <h3 className="font-semibold">👩‍🍳 Steps</h3>

              <ol className="mt-2 space-y-2">
                {selectedRecipe.steps?.map((step, i) => (
                  <li key={i} className="text-sm">
                    {i + 1}. {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* TIPS */}
            {selectedRecipe.tips && (
              <div className="mt-4 bg-white/20 p-3 rounded-lg text-sm">
                💡 {selectedRecipe.tips}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default MealSuggestion;