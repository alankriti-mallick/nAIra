const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  prepTime: Number,

  ingredients: [String],

  energyLevel: String

});

module.exports = mongoose.model("Meal", mealSchema);