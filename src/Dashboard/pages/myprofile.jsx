import { useEffect, useState } from "react";
import apifetch from "../../api/apifetch";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    emailId: "",
    age: "",
    location: ""
  });

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const loadProfile = async () => {
      const data = await apifetch("/api/user/me");

      setUser(data.user);

      setForm({
        emailId: data.user.emailId ?? "",
        age: data.user.age ?? "",
        location: data.user.location ?? ""
      });
    };

    loadProfile();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value ?? ""
    }));
  };

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
    setLoading(true);

    await apifetch(
      "https://roomgi-backend-0yz1.onrender.com/api/user/patch",
      {
        method: "PATCH",
        body: JSON.stringify({
          emailId: form.emailId ?? "",
          age: form.age ?? "",
          location: form.location ?? ""
        })
      }
    );

    setEditing(false);
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="flex justify-center items-start min-h-screen pt-16 bg-[#d7e1ec]">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8">

        {/* ================= AVATAR ================= */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/assets/profile.png" // <-- add your asset here
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500"
          />
          <h2 className="mt-4 text-xl font-bold">
            {user.username ?? ""}
          </h2>
          <p className="text-sm text-gray-500">
            Broker ID: {user.uniqueid ?? ""}
          </p>
        </div>

        {/* ================= FIELDS ================= */}
        <div className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="text-xs text-gray-500 uppercase">
              Email
            </label>
            <input
              name="emailId"
              value={form.emailId ?? ""}
              disabled={!editing}
              onChange={handleChange}
              className={`w-full mt-1 p-3 rounded-lg border 
                ${editing ? "bg-white" : "bg-gray-100"}
                focus:outline-none`}
            />
          </div>

          {/* AGE */}
          <div>
            <label className="text-xs text-gray-500 uppercase">
              Age
            </label>
            <input
              name="age"
              type="number"
              value={form.age ?? ""}
              disabled={!editing}
              onChange={handleChange}
              className={`w-full mt-1 p-3 rounded-lg border 
                ${editing ? "bg-white" : "bg-gray-100"}
                focus:outline-none`}
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-xs text-gray-500 uppercase">
              Location
            </label>
            <input
              name="location"
              value={form.location ?? ""}
              disabled={!editing}
              onChange={handleChange}
              className={`w-full mt-1 p-3 rounded-lg border 
                ${editing ? "bg-white" : "bg-gray-100"}
                focus:outline-none`}
            />
          </div>
        </div>

        {/* ================= ACTION ================= */}
        <div className="flex justify-end mt-6">
          {editing ? (
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-6 py-2 border rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
