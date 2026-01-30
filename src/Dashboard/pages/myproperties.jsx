import { useEffect, useState } from "react";
import {
  getpropertybybrokername,
  deletebyid,
  updatedetails
} from "../../api/propertyapi";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [editProperty, setEditProperty] = useState(null);

  const fetchProperties = async () => {
    try {
      const res = await getpropertybybrokername();
      setProperties(res.data);
    } catch {
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const deletehouse = async (house_id) => {
    if (!confirm("Delete this property?")) return;

    await deletebyid(house_id);
    setProperties(prev =>
      prev.filter(p => p.house_id !== house_id)
    );
  };

  const handleUpdate = async () => {
    try {
      const updated = await updatedetails(editProperty);

      setProperties(prev =>
        prev.map(p =>
          p.house_id === updated.data.house_id
            ? updated.data
            : p
        )
      );

      setEditProperty(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Properties</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map(property => (
          <div
            key={property.house_id}
            className="bg-white rounded-xl shadow"
          >
            <img
              src={property.photo_url || "https://via.placeholder.com/400"}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-lg font-semibold">
                {property.city}, {property.state}
              </h2>

              <p className="text-2xl font-bold text-blue-600 mt-2">
                ₹{property.price_inr}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                  onClick={() =>
                    setEditProperty({ ...property })
                  }
                >
                  Edit
                </button>

                <button
                  className="flex-1 bg-red-600 text-white py-2 rounded"
                  onClick={() =>
                    deletehouse(property.house_id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== EDIT MODAL ===== */}
      {editProperty && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">
              Edit Property
            </h2>

            <input
              className="border p-2 w-full mb-3"
              placeholder="City"
              value={editProperty.city}
              onChange={e =>
                setEditProperty({
                  ...editProperty,
                  city: e.target.value
                })
              }
            />

            <input
              className="border p-2 w-full mb-3"
              placeholder="State"
              value={editProperty.state}
              onChange={e =>
                setEditProperty({
                  ...editProperty,
                  state: e.target.value
                })
              }
            />

            <input
              className="border p-2 w-full mb-3"
              placeholder="Price"
              type="number"
              value={editProperty.price_inr}
              onChange={e =>
                setEditProperty({
                  ...editProperty,
                  price_inr: e.target.value
                })
              }
            />

            <div className="flex gap-3 mt-4">
              <button
                className="flex-1 bg-gray-300 py-2 rounded"
                onClick={() => setEditProperty(null)}
              >
                Cancel
              </button>

              <button
                className="flex-1 bg-blue-600 text-white py-2 rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
