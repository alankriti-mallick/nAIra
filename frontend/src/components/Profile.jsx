import { useState } from "react";

function Profile() {

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    preference: "vegetarian",
    allergies: "",
    goal: ""
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const saveProfile = () => {
    console.log(profile);
  };

  return (
    <div className="relative min-h-screen text-text-dark">
      {/* Aurora Background */}
      <div className="aurora-container">
        <div className="aurora aurora1"></div>
        <div className="aurora aurora2"></div>
        <div className="aurora aurora3"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10 space-y-6 p-6">

        {/* CARD */}
        <div className="bg-primary/70 backdrop-blur-xl border border-white/10
                        rounded-2xl shadow-xl p-8 w-full">

          <div className="grid grid-cols-3 gap-4">

            {/* NAME */}
            <div className="col-span-2">
              <label className="text-sm text-text">Name</label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl
                           bg-white/10 border border-white/10
                           focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            {/* AGE */}
            <div>
              <label className="text-sm text-text">Age</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl
                           bg-white/10 border border-white/10
                           focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            {/* HEIGHT */}
            <div>
              <label className="text-sm text-text">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={profile.height}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl
                           bg-white/10 border border-white/10
                           focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            {/* WEIGHT */}
            <div>
              <label className="text-sm text-text">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={profile.weight}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl
                           bg-white/10 border border-white/10
                           focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            {/* DIET */}
            <div>
              <label className="text-sm text-text">Eating Preference</label>
              <select
                name="preference"
                value={profile.preference}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl
                           bg-white/10 border border-white/10
                           focus:outline-none"
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="nonveg">Non‑Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            {/* GOAL */}
            <div className="col-span-2">
              <label className="text-sm text-text">Health Goal</label>
              <input
                name="goal"
                placeholder="Weight loss / muscle gain / healthy eating"
                value={profile.goal}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl
                           bg-white/10 border border-white/10
                           focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            {/* ALLERGIES */}
            <div className="col-span-2">
              <label className="text-sm text-text">Allergies</label>
              <textarea
                name="allergies"
                value={profile.allergies}
                onChange={handleChange}
                placeholder="Peanuts, dairy, gluten..."
                className="w-full mt-2 p-3 rounded-xl
                           bg-white/10 border border-white/10
                           focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={saveProfile}
            className="mt-8 px-6 py-3 rounded-xl
                       bg-button hover:bg-white/20
                       transition font-medium"
          >
            Save Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;