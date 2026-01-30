import { useEffect, useRef } from "react";
import { Link } from "react-router";

export default function OffersSlider() {
  const sliderRef = useRef(null);

  const offers = [
    {
      type: "Rent Demand",
      title: "2BHK Furnished Required",
      price: "Budget ₹18,000 / month",
      city: "Pune",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    {
      type: "Buy Demand",
      title: "Luxury Villa Buyer",
      price: "Budget ₹2.5 Cr",
      city: "Mumbai",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      type: "Rent Demand",
      title: "Studio Apartment Needed",
      price: "Budget ₹14,000 / month",
      city: "Bangalore",
      img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
    },
    {
      type: "Buy Demand",
      title: "3BHK Apartment Buyer",
      price: "Budget ₹1.4 Cr",
      city: "Gurgaon",
      img: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
    },
    {
      type: "PG Demand",
      title: "Student PG Required",
      price: "Budget ₹9,500 / month",
      city: "Delhi",
      img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
    },
  ];

  const CARD_WIDTH = 300;
  const GAP = 24;
  const SCROLL_AMOUNT = CARD_WIDTH + GAP;

  /* ===== AUTO SLIDE ===== */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
      }
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-3 py-14">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-700">
            Hot Tenant Demand
          </h2>
          <p className="text-sm text-gray-500">
            Active requirements from verified tenants
          </p>
        </div>

        <Link to="/leads" className="text-sm text-blue-800 hover:underline">
          View all leads →
        </Link>
      </div>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {offers.map((item, i) => (
          <div
            key={i}
            className="min-w-[300px] rounded-2xl shadow-md overflow-hidden
                       hover:shadow-xl transition bg-white"
          >
            {/* IMAGE */}
            <div
              className="h-[180px] bg-cover bg-center"
              style={{ backgroundImage: `url(${item.img})` }}
            />

            {/* CONTENT */}
            <div className="p-4">
              <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                {item.type}
              </span>

              <h3 className="text-lg font-semibold text-slate-700 mt-3">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm">{item.city}</p>

              <p className="text-blue-700 font-semibold mt-2">{item.price}</p>

              <Link
                to="/leads/123"
                className="inline-block mt-3 text-sm text-blue-600 font-medium hover:underline"
              >
                View Lead →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
