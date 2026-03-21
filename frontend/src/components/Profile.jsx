import { useEffect, useState } from "react";

function Profile() {

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: ""
  });

  const loadProfile = async () => {

  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  setProfile(data);
  setForm(data);
};

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSave = async () => {

  const token = localStorage.getItem("token");

  await fetch("http://localhost:5000/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(form)
  });

  setEditMode(false);
  loadProfile();
};

  return (
    <div className="relative min-h-screen text-white">

      {/* Aurora */}
      <div className="aurora-container">
        <div className="aurora aurora1"></div>
        <div className="aurora aurora2"></div>
        <div className="aurora aurora3"></div>
      </div>

      <div className="relative z-10 p-6 flex justify-center">

        <div className="bg-primary backdrop-blur-lg p-8 rounded-xl shadow w-[400px]">

          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <img
              src={form.avatar || "/panda.png"}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
            />
          </div>

          {/* Name */}
          <div className="space-y-4">

            <input
              disabled={!editMode}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/20 outline-none"
              placeholder="Name"
            />

            <input
              disabled={!editMode}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/20 outline-none"
              placeholder="Email"
            />

            <input
              disabled={!editMode}
              value={form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/20 outline-none"
              placeholder="Avatar URL"
            />

          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-6">

            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-button px-4 py-2 rounded-lg hover:scale-105 transition"
                >
                  Save 💖
                </button>

                <button
                  onClick={() => setEditMode(false)}
                  className="bg-white/20 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-button px-4 py-2 rounded-lg hover:scale-105 transition"
              >
                Edit Profile ✏️
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;