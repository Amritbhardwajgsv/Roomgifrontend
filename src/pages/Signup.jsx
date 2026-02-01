import { useState } from "react";
import { Link, useNavigate } from "react-router";

const BASE_URL = "https://roomgi-backend-0yz1.onrender.com";

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
      const res = await fetch(`${BASE_URL}/api/user/register`, {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-2xl font-semibold text-center mb-1">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign up to continue to Roomgi
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            id="username"
            type="text"
            placeholder="Username"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            id="emailId"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            id="location"
            type="text"
            placeholder="City / Area"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            id="age"
            type="number"
            placeholder="Age"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-md bg-purple-200 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-center text-sm mt-4">
            {error}
          </p>
        )}

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?
          <Link to="/login">
            <span className="text-indigo-600 ml-1 font-medium hover:underline">
              Login
            </span>
          </Link>
        </p>

      </div>
    </div>
  );
}
