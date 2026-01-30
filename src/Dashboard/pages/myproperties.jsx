import { useEffect, useState } from "react";
import { getpropertybybrokername, deletebyid } from "../../api/propertyapi";

export default function MyProperties() {

  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const res = await getpropertybybrokername();
      setProperties(res.data);
    } catch (err) {
      console.log(err.message);
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const deletehouse = async (house_id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      await deletebyid(house_id);
      setProperties(prev =>
        prev.filter(p => p.house_id !== house_id)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          My Properties
        </h1>
        <p className="text-slate-500 mt-1">
          Manage all your listed properties
        </p>
      </div>

      {properties.length === 0 && (
        <p className="text-slate-600">
          No properties added yet.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-xl overflow-hidden shadow"
          >
            <img
              src={property.photo_url || "https://via.placeholder.com/400"}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-lg font-semibold">
                {property.city}, {property.state}
              </h2>

              <p className="text-2xl font-bold text-blue-600 mt-3">
                ₹{property.price_inr.toLocaleString("en-IN")}
              </p>

              <button
                className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg"
                onClick={() => deletehouse(property.house_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
