const express = require("express");
const router = express.Router();

const { generatePlan } = require("../controllers/aiController");
const { generateMeals } = require("../controllers/aiMealsController");

router.post("/plan", generatePlan);
router.post("/meals", generateMeals);

module.exports = router;