import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PremiumSlider() {
  const sliderRef = useRef(null);

  const premiumListings = [
    {
      title: "Luxury Villa",
      price: "₹2.5 Cr",
      city: "Mumbai",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      tag: "Verified",
    },
    {
      title: "Modern Apartment",
      price: "₹1.2 Cr",
      city: "Bangalore",
      img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      tag: "Premium",
    },
    {
      title: "Premium Duplex",
      price: "₹3.8 Cr",
      city: "Delhi",
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
      tag: "Featured",
    },
    {
      title: "Sea View Penthouse",
      price: "₹5.4 Cr",
      city: "Goa",
      img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
      tag: "Luxury",
    },
    {
      title: "Smart City Flat",
      price: "₹1.9 Cr",
      city: "Pune",
      img: "https://images.unsplash.com/photo-1599423300746-b62533397364",
      tag: "New",
    },
  ];

  const CARD_WIDTH = 360;
  const GAP = 32;
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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ===== MANUAL ===== */
  const slideLeft = () => {
    sliderRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  const slideRight = () => {
    sliderRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-3 py-14 relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-700">
            Premium Broker Listings
          </h2>
          <p className="text-sm text-gray-500">
            High-visibility listings with maximum lead potential
          </p>
        </div>

        <Link
          to="/search?premium=true"
          className="text-sm text-blue-800 hover:underline"
        >
          View all premium →
        </Link>
      </div>

      {/* LEFT */}
      <button
        onClick={slideLeft}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2
                   bg-white shadow-lg p-3 rounded-full hover:bg-gray-100 z-10"
      >
        <FaChevronLeft />
      </button>

      {/* RIGHT */}
      <button
        onClick={slideRight}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2
                   bg-white shadow-lg p-3 rounded-full hover:bg-gray-100 z-10"
      >
        <FaChevronRight />
      </button>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {premiumListings.map((item, i) => (
          <div
            key={i}
            className="relative min-w-[360px] h-[260px] rounded-3xl 
                       bg-cover bg-center shadow-lg
                       hover:scale-105 transition-transform duration-300"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            {/* TAG */}
            <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              {item.tag}
            </span>

            {/* PRICE */}
            <span className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              {item.price}
            </span>

            {/* CONTENT */}
            <div className="absolute inset-0 bg-black/30 rounded-3xl flex flex-col justify-end p-5">
              <h3 className="text-white text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-200 text-sm mb-3">{item.city}</p>

              <Link
                to="/leads/123"
                className="bg-white text-slate-800 text-sm font-medium px-4 py-2 rounded-full w-fit hover:bg-gray-100 transition"
              >
                View Lead
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
