import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.API_URL}/api/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ IMPORTANT
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login success — navigating now");
      navigate("/broker");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          required
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-600 text-center text-sm">
            {error}
          </p>
        )}
      </form>

      <div className="mt-4 text-center">
        <p>
          Have not account?
          <Link to="/signup">
            <span className="text-blue-700"> SignUp</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
