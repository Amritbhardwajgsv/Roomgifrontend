import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apifetch from "../../api/apifetch";

export default function Myprofiles() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    emailId: "",
    age: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await apifetch("/api/user/me");
        setUser(data.user);
        setForm({
          emailId: data.user.emailId || "",
          age: data.user.age || ""
        });
      } catch {
        navigate("/login");
      }
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

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
      setTimeout(() => setOpen(false), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CLICK PROFILE */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3"
      >
        <img
          src="https://i.pravatar.cc/40"
          className="w-9 h-9 rounded-full border"
        />
        <span className="font-medium">
          {user?.username}
        </span>
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl relative animate-fade">

            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-gray-500 text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6">
              My Profile
            </h2>

            {/* INFO */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Username</p>
                <p className="font-semibold">{user.username}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Broker ID</p>
                <p className="font-semibold">{user.uniqueid}</p>
              </div>
            </div>

            {/* FORM */}
            <div className="space-y-4">
              <div>
                <label className="text-sm">Email</label>
                <input
                  id="emailId"
                  value={form.emailId}
                  onChange={handleChange}
                  type="email"
                  className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="text-sm">Age</label>
                <input
                  id="age"
                  value={form.age}
                  onChange={handleChange}
                  type="number"
                  className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>

            {success && (
              <p className="text-green-600 mt-3 text-sm">
                {success}
              </p>
            )}

            {error && (
              <p className="text-red-600 mt-3 text-sm">
                {error}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
