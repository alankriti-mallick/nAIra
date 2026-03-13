const express = require("express");
const router = express.Router();

const {
  createGroceryList,
  getGroceries,
  getGroceryById,
  deleteGrocery
} = require("../controllers/groceryController");


router.post("/", createGroceryList);

router.get("/", getGroceries);

router.get("/:id", getGroceryById);

router.delete("/:id", deleteGrocery);


module.exports = router;