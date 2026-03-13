const Task = require("../models/Task");


/*
CREATE TASK
POST /api/tasks
*/
const createTask = async (req, res) => {

  try {

    const { title, priority, deadline } = req.body;

    const task = new Task({
      title,
      priority,
      deadline
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);

  } catch (error) {
    res.status(500).json({ message: "Task creation failed" });
  }

};


/*
GET ALL TASKS
GET /api/tasks
*/
const getTasks = async (req, res) => {

  try {

    const tasks = await Task.find().sort({ priority: -1 });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }

};


/*
MARK TASK COMPLETE
PUT /api/tasks/:id
*/
const completeTask = async (req, res) => {

  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: "Task update failed" });
  }

};


/*
DELETE TASK
*/
const deleteTask = async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }

};


module.exports = {
  createTask,
  getTasks,
  completeTask,
  deleteTask
};