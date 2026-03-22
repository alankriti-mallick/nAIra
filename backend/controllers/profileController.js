const Profile = require("../models/Profile");

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      profile = await Profile.create({});
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    let profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      profile = new Profile({ name, email, avatar });
    } else {
      profile.name = name;
      profile.email = email;
      profile.avatar = avatar;
    }

    const updated = await profile.save();

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

module.exports = { getProfile, updateProfile };