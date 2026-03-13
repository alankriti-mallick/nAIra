const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({

  mealId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal"
  },

  items: [
    {
      name: String,
      quantity: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Grocery", grocerySchema);