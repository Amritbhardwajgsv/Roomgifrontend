import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-serif text-sm sm:text-xl flex flex-wrap">
          <span className="text-3xl text-stone-900">Room<span className="text-gray-400">G</span>iEstates</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
          />
          <FaSearch className=" text-slate-600"></FaSearch>
        </form>
        <ul className="flex gap-4 mr-2 ml-2">
          <Link to="/">
            <li className="hiddeinline text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline ">
              About
            </li>
          </Link>
          <Link to="/login">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Login
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
