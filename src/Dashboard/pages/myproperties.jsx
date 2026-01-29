import { useEffect, useState } from "react";
import { getpropertybyownername } from "../../api/propertyapi";
import { deletebyid } from "../../api/propertyapi";

export default function MyProperties() {

  const [properties, setProperties] = useState([]);
  const ownername = localStorage.getItem("username");

  const fetchProperties = async () => {
    try {
      const res = await getpropertybyownername(ownername);
      setProperties(res.data);
    } catch (err) {
      console.log(err.message);
      setProperties([]);
    }
  };

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

  
  useEffect(() => {
    fetchProperties();
  }, [setProperties]);

  return (
    <div>

      {/* Page heading */}
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
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300"
          >

            
            <div className="relative">
              <img
                src={property.photo_url || "https://via.placeholder.com/400"}
                alt="property"
                className="h-52 w-full object-cover"
              />

              <span className="absolute top-3 left-3 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow">
                For Sale
              </span>
            </div>

            
            <div className="p-5">

              <h2 className="text-lg font-semibold text-slate-800">
                {property.city}, {property.state}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Apartment • {property.size_sqft || "—"} sqft
              </p>

              <p className="text-2xl font-bold text-blue-600 mt-4">
                ₹{property.price_inr.toLocaleString("en-IN")}
              </p>

              {/* buttons */}
              <div className="flex gap-3 mt-5">
              <button
  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium"
  onClick={() => deletehouse(property.house_id)}
>
  Delete
</button>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
