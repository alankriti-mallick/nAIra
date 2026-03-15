const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const calendarRoutes = require("./routes/calendarRoutes");
const mealRoutes = require("./routes/mealRoutes");
const groceryRoutes = require("./routes/groceryRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/calendar", calendarRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/groceries", groceryRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});