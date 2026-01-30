import { useNavigate } from "react-router";
import { FaSearch, FaMapMarkerAlt, FaCrosshairs } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [detecting, setDetecting] = useState(false);
  const userTypedLocation = useRef(false);

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    setDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`,
        );
        const data = await res.json();

        const city =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.state ||
          "Delhi";

        if (!userTypedLocation.current) setLocation(city);
        setDetecting(false);
      },
      () => setDetecting(false),
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?location=${location}&q=${query}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-28">
      <h1 className="text-4xl lg:text-6xl font-bold text-slate-700">
        Close More Deals.
        <br />
        <span className="text-blue-600">List Properties Faster.</span>
      </h1>

      <p className="text-gray-500 max-w-xl mt-4">
        Built for brokers to list properties, receive verified leads and close
        deals faster.
      </p>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 mt-8"
      >
        <div className="flex items-center bg-white border px-4 py-2 rounded-full">
          <FaMapMarkerAlt className="text-blue-600 mr-2" />
          <input
            value={location}
            onChange={(e) => {
              userTypedLocation.current = true;
              setLocation(e.target.value);
            }}
            placeholder="City / Area"
            className="outline-none text-sm"
          />
          <FaCrosshairs
            onClick={detectLocation}
            className={`ml-2 cursor-pointer ${
              detecting ? "animate-spin text-blue-600" : "text-gray-400"
            }`}
          />
        </div>

        <div className="flex items-center bg-white border px-4 py-2 rounded-full">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads, budget, type..."
            className="outline-none text-sm"
          />
        </div>

        <button className="bg-blue-600 text-white px-8 rounded-full">
          Find Leads
        </button>
      </form>
    </div>
  );
}
