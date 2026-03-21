const Meal = require("../models/Meal");

/*
CREATE MEAL
POST /api/meals
*/
const createMeal = async (req, res) => {
  try {

    const { name, prepTime, ingredients, energyLevel } = req.body;

    const meal = new Meal({
      name,
      prepTime,
      ingredients,
      energyLevel
    });

    const savedMeal = await meal.save();

    res.status(201).json(savedMeal);

  } catch (error) {
    res.status(500).json({ message: "Failed to create meal", error });
  }
};


/*
GET ALL MEALS
GET /api/meals
*/
const getMeals = async (req, res) => {
  try {

    const meals = await Meal.find();

    res.json(meals);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch meals" });
  }
};


/*
GET MEAL BY ENERGY LEVEL (for AI suggestion)
GET /api/meals/suggest?energy=low
*/
const getMealSuggestion = async (req, res) => {

  try {

    const energy = req.query.energy;

    const meal = await Meal.findOne({
      energyLevel: energy
    });

    if (!meal) {
      return res.status(404).json({ message: "No meal found" });
    }

    res.json(meal);

  } catch (error) {
    res.status(500).json({ message: "Meal suggestion failed" });
  }
};


/*
DELETE MEAL
*/
const deleteMeal = async (req, res) => {

  try {

    await Meal.findByIdAndDelete(req.params.id);

    res.json({ message: "Meal deleted" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};


module.exports = {
  createMeal,
  getMeals,
  getMealSuggestion,
  deleteMeal
};



