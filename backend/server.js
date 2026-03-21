const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const calendarRoutes = require("./routes/calendarRoutes");
const mealRoutes = require("./routes/mealRoutes");
const groceryRoutes = require("./routes/groceryRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/calendar", calendarRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/groceries", groceryRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/recipe", recipeRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});