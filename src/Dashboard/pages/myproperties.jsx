import { useEffect, useState } from "react";

import {
  sortByPriceLowToHigh,
  sortBySize,
  sortByLatest,
  getNearestProperties
} from "../../api/sortandfilter";

import { getpropertybybrokername } from "../../api/propertyapi";

import {
  deletebyid,
  updatedetails
} from "../../api/propertyapi";

import { filterHouses } from "../../api/houseFilter";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [editProperty, setEditProperty] = useState(null);

  const [sortType, setSortType] = useState("default");
  const [loading, setLoading] = useState(false);

  // ================= FILTER STATE =================
  const [filters, setFilters] = useState({
    property_type: "",
    parking: "",
    furnishing: "",
    water_supply: "",
    internet: ""
  });

  // ================= INITIAL LOAD =================
  useEffect(() => {
    loadProperties();
  }, []);

  // ================= SORT EFFECT =================
  useEffect(() => {
    applySorting();
  }, [sortType]);

  // ================= FILTER EFFECT =================
  useEffect(() => {
    if (Object.values(filters).some(v => v !== "")) {
      applyFilters();
    }
  }, [filters]);

  // =================================================
  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await getpropertybybrokername();
      setProperties(data.data || data);
    } catch {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // =================================================
  const applySorting = async () => {
    try {
      setLoading(true);
      let data;

      switch (sortType) {
        case "price":
          data = await sortByPriceLowToHigh();
          setProperties(data.data);
          break;

        case "sizeAsc":
          data = await sortBySize("asc");
          setProperties(data.properties);
          break;

        case "sizeDesc":
          data = await sortBySize("desc");
          setProperties(data.properties);
          break;

        case "latest":
          data = await sortByLatest();
          setProperties(data.data);
          break;

        case "nearest":
          data = await getNearestProperties();
          setProperties(data.properties);
          break;

        default:
          loadProperties();
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =================================================
  const applyFilters = async () => {
    try {
      setLoading(true);
      const data = await filterHouses(filters);
      setProperties(data.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =================================================
  const deletehouse = async id => {
    if (!confirm("Delete this property?")) return;

    await deletebyid(id);
    setProperties(prev =>
      prev.filter(p => p.house_id !== id)
    );
  };

  const handleUpdate = async () => {
    const updated = await updatedetails(editProperty);

    setProperties(prev =>
      prev.map(p =>
        p.house_id === updated.data.house_id
          ? updated.data
          : p
      )
    );

    setEditProperty(null);
  };

  // =================================================
  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Properties</h1>

        <select
          className="border px-4 py-2 rounded-lg"
          value={sortType}
          onChange={e => setSortType(e.target.value)}
        >
          <option value="default">All Properties</option>
          <option value="latest">Latest</option>
          <option value="price">Price: Low → High</option>
          <option value="sizeAsc">Size: Small → Large</option>
          <option value="sizeDesc">Size: Large → Small</option>
          <option value="nearest">Nearest</option>
        </select>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white p-4 rounded-xl shadow mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

          {/* PROPERTY TYPE */}
          <select
            className="border p-2 rounded"
            value={filters.property_type}
            onChange={e =>
              setFilters({
                ...filters,
                property_type: e.target.value
              })
            }
          >
            <option value="">Property Type</option>
            <option>Apartment</option>
            <option>Flat</option>
            <option>Villa</option>
            <option>Independent House</option>
            <option>PG</option>
            <option>Hostel</option>
          </select>

          {/* PARKING */}
          <select
            className="border p-2 rounded"
            value={filters.parking}
            onChange={e =>
              setFilters({
                ...filters,
                parking: e.target.value
              })
            }
          >
            <option value="">Parking</option>
            <option>Basement</option>
            <option>Open</option>
            <option>Covered</option>
            <option>None</option>
          </select>

          {/* FURNISHING */}
          <select
            className="border p-2 rounded"
            value={filters.furnishing}
            onChange={e =>
              setFilters({
                ...filters,
                furnishing: e.target.value
              })
            }
          >
            <option value="">Furnishing</option>
            <option>Unfurnished</option>
            <option>Semi-Furnished</option>
            <option>Fully-Furnished</option>
          </select>

          {/* WATER SUPPLY */}
          <select
            className="border p-2 rounded"
            value={filters.water_supply}
            onChange={e =>
              setFilters({
                ...filters,
                water_supply: e.target.value
              })
            }
          >
            <option value="">Water</option>
            <option>Municipal</option>
            <option>Borewell</option>
            <option>Both</option>
          </select>

          {/* INTERNET */}
          <select
            className="border p-2 rounded"
            value={filters.internet}
            onChange={e =>
              setFilters({
                ...filters,
                internet: e.target.value
              })
            }
          >
            <option value="">Internet</option>
            <option>Fiber</option>
            <option>Broadband</option>
            <option>None</option>
          </select>

        </div>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => {
              setFilters({
                property_type: "",
                parking: "",
                furnishing: "",
                water_supply: "",
                internet: ""
              });
              setSortType("default");
              loadProperties();
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading...
        </p>
      )}

      {/* ================= PROPERTY GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map(property => (
          <div
            key={property.house_id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={property.photo_url || "https://via.placeholder.com/400"}
              className="h-52 w-full object-cover rounded-t-xl"
            />

            <div className="p-5">
              <h2 className="text-lg font-semibold">
                {property.city}, {property.state}
              </h2>

              <p className="text-2xl font-bold text-blue-600 mt-2">
                ₹{property.price_inr}
              </p>

              <p className="text-sm text-gray-500">
                {property.size_sqft} sqft
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                  onClick={() => setEditProperty({ ...property })}
                >
                  Edit
                </button>

                <button
                  className="flex-1 bg-red-600 text-white py-2 rounded"
                  onClick={() => deletehouse(property.house_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editProperty && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Edit Property
            </h2>

            <input
              className="border p-2 w-full mb-3"
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
              value={editProperty.state}
              onChange={e =>
                setEditProperty({
                  ...editProperty,
                  state: e.target.value
                })
              }
            />

            <input
              type="number"
              className="border p-2 w-full mb-3"
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
