const express = require("express");
const router = express.Router();

const {
  getGroceries,
  addGrocery,
  deleteGrocery
} = require("../controllers/groceryController");

router.get("/", getGroceries);
router.post("/", addGrocery);
router.delete("/:id", deleteGrocery);

module.exports = router;