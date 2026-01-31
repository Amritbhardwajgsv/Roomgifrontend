import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    emailId: "",
    password: "",
    age: "",
    location: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      navigate("/broker");
    } catch {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account 🚀
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Join Roomgi and find your perfect stay
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* USERNAME */}
          <input
            id="username"
            type="text"
            placeholder="Username"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* EMAIL */}
          <input
            id="emailId"
            type="email"
            placeholder="Email address"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* LOCATION */}
          <input
            id="location"
            type="text"
            placeholder="City / Area (e.g. Noida Sector 62)"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* AGE */}
          <input
            id="age"
            type="number"
            placeholder="Age"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* PASSWORD */}
          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold
              bg-gradient-to-r from-blue-600 to-purple-600
              hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

        </form>

        {error && (
          <p className="text-red-600 text-center mt-4">
            {error}
          </p>
        )}

        <p className="text-center text-sm mt-6">
          Already have an account?
          <Link to="/login">
            <span className="text-blue-700 ml-1 font-medium">
              Login
            </span>
          </Link>
        </p>

      </div>
    </div>
  );
}
