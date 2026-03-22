// routes/recipeRoutes.js
const express = require("express");
const router = express.Router();

const { generateRecipe } = require("../controllers/recipeController");

router.post("/", generateRecipe);

module.exports = router;