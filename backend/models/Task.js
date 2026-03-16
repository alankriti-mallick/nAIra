const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    default: 1
  },
  deadline: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);