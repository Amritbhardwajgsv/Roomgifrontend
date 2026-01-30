import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apifetch from "../../api/apifetch";

export default function Myprofiles() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    emailId: "",
    age: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await apifetch("/api/user/me");

        setUser(data.user);
        setForm({
          emailId: data.user.emailId || "",
          age: data.user.age || ""
        });
      } catch (err) {
        // only redirect if truly unauthorized
        navigate("/login");
      }
    };

    loadProfile();
  }, [navigate]);

  // 🔹 handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  // 🔹 update profile
  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await apifetch("/api/user/patch", {
        method: "PATCH",
        body: JSON.stringify(form)
      });

      setUser(data.user);
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 delete account
  const handleDelete = async () => {
    const confirm = window.confirm(
      "This will permanently delete your account. Continue?"
    );

    if (!confirm) return;

    try {
      await apifetch("/api/user/delete", {
        method: "DELETE"
      });

      navigate("/login");
    } catch {
      alert("Failed to delete account");
    }
  };

  if (!user) {
    return (
      <div className="p-6 bg-white rounded shadow">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">

      <h1 className="text-2xl font-bold mb-6">
        My Profile
      </h1>

      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-gray-500 text-sm">Username</p>
          <p className="font-semibold">{user.username}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Broker ID</p>
          <p className="font-semibold">{user.uniqueid}</p>
        </div>
      </div>

      {/* EDIT DETAILS */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            id="emailId"
            type="email"
            value={form.emailId}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Age</label>
          <input
            id="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-1"
          />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Update Profile"}
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>

      {/* STATUS MESSAGES */}
      {success && (
        <p className="text-green-600 mt-4">
          {success}
        </p>
      )}

      {error && (
        <p className="text-red-600 mt-4">
          {error}
        </p>
      )}
    </div>
  );
}
