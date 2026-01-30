import { Link, NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import apifetch from "../../api/apifetch";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await apifetch("/api/user/me");
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        }
      } catch {
        setUser(null);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await apifetch("/api/user/logout", {
      method: "POST"
    });

    setUser(null);
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-between items-center">

      <Link to="/" className="text-xl font-bold text-slate-800">
        ROOMGi<span className="text-blue-600">Broker</span>
      </Link>

      <nav className="flex gap-6">
        <NavLink
          to="/broker"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-slate-600"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/broker/my-profile"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-slate-600"
          }
        >
          Profile
        </NavLink>
      </nav>

      <div className="flex items-center gap-4">
        <span className="text-slate-700 font-medium">
          {user?.username}
        </span>

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
