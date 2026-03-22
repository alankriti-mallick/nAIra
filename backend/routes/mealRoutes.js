const express = require("express");
const router = express.Router();

const {
  createMeal,
  getMeals,
  getMealSuggestion,
  deleteMeal
} = require("../controllers/mealController");

router.post("/", createMeal);
router.get("/", getMeals);
router.get("/suggest", getMealSuggestion);
router.delete("/:id", deleteMeal);

module.exports = router;