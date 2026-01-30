import { Link } from "react-router";

export default function BrokerHighlightsImages() {
  const highlights = [
    {
      title: "High Demand Areas",
      desc: "Locations with maximum tenant enquiries",
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      link: "/search?sort=demand",
    },
    {
      title: "Premium Listings",
      desc: "High-value properties with serious buyers",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      link: "/search?premium=true",
    },
    {
      title: "Verified Leads",
      desc: "No fake calls. Only genuine tenants",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
      link: "/search?leads=true",
    },
    {
      title: "Fast Closures",
      desc: "Direct broker–tenant communication",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      link: "/about",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
          Built for Brokers Who Want to Close Faster
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl">
          Discover high-demand areas, premium inventory and verified leads — all
          in one platform.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, i) => (
          <Link
            key={i}
            to={item.link}
            className="group rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            {/* IMAGE */}
            <div
              className="h-[220px] bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
              style={{ backgroundImage: `url(${item.img})` }}
            />

            {/* CONTENT */}
            <div className="p-5 bg-white">
              <h3 className="font-semibold text-slate-700 text-lg">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>

              <span className="inline-block mt-3 text-sm text-blue-600 font-medium">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
