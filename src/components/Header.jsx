import { Link, useLocation } from "react-router";
import { FaUserTie } from "react-icons/fa";

export default function Header() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 after:w-full"
      : "text-slate-600 after:w-0";

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold tracking-tight text-slate-800">
            Room<span className="text-blue-600">G</span>
          </span>
          <span className="text-xs tracking-wide text-gray-400 hidden sm:inline">
            ESTATES
          </span>
        </Link>

        {/* NAV */}
        <nav className="hidden sm:flex gap-8 text-sm font-medium">
          {[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative pb-1 transition-all duration-300
                after:content-[''] after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300
                ${isActive(item.path)}
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <Link
          to="/login"
          className="flex items-center gap-2 text-sm font-medium
                     text-slate-700 hover:text-blue-600 transition"
        >
          <FaUserTie className="text-base" />
          <span className="hidden sm:inline">Broker Login</span>
        </Link>
      </div>
    </header>
  );
}
