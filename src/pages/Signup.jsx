import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    emailId: "",
    password: "",
    age: ""
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
        credentials: "include", // 🔥 cookie stored automatically
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      navigate("/login"); // or /login
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Create Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
          required
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          id="emailId"
          className="border p-3 rounded-lg"
          required
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Age"
          id="age"
          className="border p-3 rounded-lg"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          required
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      {error && (
        <p className="text-red-600 mt-4 text-center">
          {error}
        </p>
      )}

      <div className="mt-4 text-center">
        <p>
          Already have an account?
          <Link to="/login">
            <span className="text-blue-700 ml-1">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
