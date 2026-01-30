import { NavLink, useNavigate } from "react-router";
import {
  Home,
  PlusSquare,
  Building2,
  User,
  LogOut
} from "lucide-react";
import apifetch from "../../api/apifetch";

export default function Sidebar() {

  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await apifetch("/api/user/logout", {
        method: "POST"
      });

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="h-full w-full p-4 relative">

      <nav className="flex flex-col gap-2">

        <NavLink
          to="/broker"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition
            ${isActive
              ? "bg-blue-600 text-white"
              : "text-slate-200 hover:bg-slate-700"}`
          }
        >
          <Home size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/broker/add-property"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition
            ${isActive
              ? "bg-blue-600 text-white"
              : "text-slate-200 hover:bg-slate-700"}`
          }
        >
          <PlusSquare size={20} />
          Add Property
        </NavLink>

        <NavLink
          to="/broker/my-properties"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition
            ${isActive
              ? "bg-blue-600 text-white"
              : "text-slate-200 hover:bg-slate-700"}`
          }
        >
          <Building2 size={20} />
          My Properties
        </NavLink>

        <NavLink
          to="/broker/my-profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition
            ${isActive
              ? "bg-blue-600 text-white"
              : "text-slate-200 hover:bg-slate-700"}`
          }
        >
          <User size={20} />
          Profile
        </NavLink>

      </nav>

      {/* logout */}
      <div className="absolute bottom-6 left-0 w-full px-4">
        <button
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </div>
  );
}
