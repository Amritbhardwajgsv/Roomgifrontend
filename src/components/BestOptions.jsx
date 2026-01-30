import { useEffect, useState } from "react";
import { getListings } from "../services/listingsServices";

export default function BestOptions() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings({ verified: true }).then((data) =>
      setListings(data.slice(0, 4)),
    );
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold">High-Conversion Listings</h2>
        <p className="text-sm text-gray-500 mb-8">
          Properties receiving maximum enquiries
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {listings.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md">
              <img src={item.image} className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.city}</p>
                <p className="text-blue-600 font-semibold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
