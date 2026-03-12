function MealSuggestion() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Meal Suggestions</h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="font-semibold text-lg">Paneer Stir Fry</h2>
          <p className="text-gray-500">Prep Time: 15 minutes</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="font-semibold text-lg">Vegetable Upma</h2>
          <p className="text-gray-500">Prep Time: 20 minutes</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="font-semibold text-lg">Dal & Rice</h2>
          <p className="text-gray-500">Prep Time: 30 minutes</p>
        </div>

      </div>

    </div>
  );
}

export default MealSuggestion;