const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const calendarRoutes = require("./routes/calendarRoutes");

app.use("/api/calendar", calendarRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
