const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: { type: String, default: "Naira User" },
  email: { type: String, default: "" },
  avatar: { type: String, default: "" },
});

module.exports = mongoose.model("Profile", profileSchema);