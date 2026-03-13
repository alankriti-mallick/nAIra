const Grocery = require("../models/Grocery");
const Meal = require("../models/Meal");


/*
CREATE GROCERY LIST FROM MEAL
POST /api/groceries
*/
const createGroceryList = async (req, res) => {

  try {

    const { mealId } = req.body;

    const meal = await Meal.findById(mealId);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    const grocery = new Grocery({
      mealId: meal._id,
      items: meal.ingredients.map(item => ({
        name: item,
        quantity: "1 unit"
      }))
    });

    const savedGrocery = await grocery.save();

    res.status(201).json(savedGrocery);

  } catch (error) {
    res.status(500).json({ message: "Failed to create grocery list", error });
  }

};


/*
GET ALL GROCERY LISTS
GET /api/groceries
*/
const getGroceries = async (req, res) => {

  try {

    const groceries = await Grocery.find().populate("mealId");

    res.json(groceries);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch groceries" });
  }

};


/*
GET SINGLE GROCERY LIST
GET /api/groceries/:id
*/
const getGroceryById = async (req, res) => {

  try {

    const grocery = await Grocery.findById(req.params.id).populate("mealId");

    if (!grocery) {
      return res.status(404).json({ message: "Grocery list not found" });
    }

    res.json(grocery);

  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }

};


/*
DELETE GROCERY LIST
DELETE /api/groceries/:id
*/
const deleteGrocery = async (req, res) => {

  try {

    await Grocery.findByIdAndDelete(req.params.id);

    res.json({ message: "Grocery list deleted" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }

};


module.exports = {
  createGroceryList,
  getGroceries,
  getGroceryById,
  deleteGrocery
};