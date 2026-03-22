const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  completeTask,
  deleteTask,
  updateTask
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);
router.put("/edit/:id", updateTask);
router.put("/:id", completeTask);
router.delete("/:id", deleteTask);

module.exports = router;