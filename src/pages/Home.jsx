import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
      <h1 className="text-slate-600 font-bold text-3xl lg:text-6xl">
        Your journey to the <span className="text-slate-400">perfect</span>
        <br />
        home starts here
      </h1>
      <div className="text-gray-400 text-xs sm:text-sm">
        This is the best place to find your next perfect place to live.
        <br />
        We have wide range of properties for you to choose from.
        <div className="mt-2">
          <Link
            to={"/search"}
            className="text-xs sm:text-sm text-blue-800 font-bold hover:underline mt-3"
          >
      
            Let's Start now...
          </Link>
        </div>
      </div>
    </div>
  );
}
