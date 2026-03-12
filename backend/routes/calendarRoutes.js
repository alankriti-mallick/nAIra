const express = require("express");
const router = express.Router();
const { getTodayCalendar } = require("../controllers/calendarController");

router.get("/today", getTodayCalendar);

module.exports = router;