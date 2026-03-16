const Grocery = require("../models/Grocery");


// GET ALL GROCERIES
const getGroceries = async (req, res) => {
  const groceries = await Grocery.find().sort({ createdAt: -1 });
  res.json(groceries);
};


// ADD GROCERY
const addGrocery = async (req, res) => {

  const { name, quantity } = req.body;

  const item = new Grocery({
    name,
    quantity
  });

  await item.save();

  res.json(item);
};


// DELETE GROCERY
const deleteGrocery = async (req, res) => {

  const { id } = req.params;

  await Grocery.findByIdAndDelete(id);

  res.json({ message: "Deleted successfully" });
};

module.exports = {
  getGroceries,
  addGrocery,
  deleteGrocery
};