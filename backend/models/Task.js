const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: String,

  priority: Number,

  deadline: Date,

  completed: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model("Task", taskSchema);    

