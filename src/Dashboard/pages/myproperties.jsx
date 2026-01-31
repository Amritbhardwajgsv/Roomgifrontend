import { useEffect, useState } from "react";

import {
  sortByPriceLowToHigh,
  sortBySize,
  sortByLatest,
  getNearestProperties,
} from "../../api/sortandfilter";

import {
  getpropertybybrokername,
  deletebyid,
  updatedetails,
} from "../../api/propertyapi";

import { filterHouses } from "../../api/houseFilter";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [editProperty, setEditProperty] = useState(null);
  const [sortType, setSortType] = useState("default");
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    property_type: "",
    parking: "",
    furnishing: "",
    water_supply: "",
    internet: "",
  });

  /* ================= EFFECTS ================= */
  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    applySorting();
  }, [sortType]);

  useEffect(() => {
    if (Object.values(filters).some((v) => v !== "")) {
      applyFilters();
    }
  }, [filters]);

  /* ================= API ================= */
  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await getpropertybybrokername();
      setProperties(data.data || data);
    } finally {
      setLoading(false);
    }
  };

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
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      const data = await filterHouses(filters);
      setProperties(data.data);
    } finally {
      setLoading(false);
    }
  };

  const deletehouse = async (id) => {
    if (!confirm("Delete this property?")) return;
    await deletebyid(id);
    setProperties((prev) => prev.filter((p) => p.house_id !== id));
  };

  const handleUpdate = async () => {
    const updated = await updatedetails(editProperty);
    setProperties((prev) =>
      prev.map((p) =>
        p.house_id === updated.data.house_id ? updated.data : p,
      ),
    );
    setEditProperty(null);
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            My Properties
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and monitor your listings
          </p>
        </div>

        <select
          className="px-4 py-2 text-sm rounded-md border border-slate-300
          bg-white focus:ring-1 focus:ring-slate-400"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="default">All</option>
          <option value="latest">Latest</option>
          <option value="price">Price ↑</option>
          <option value="sizeAsc">Size ↑</option>
          <option value="sizeDesc">Size ↓</option>
          <option value="nearest">Nearest</option>
        </select>
      </div>

      {/* ================= FILTERS (STYLE 1) ================= */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
          {[
            {
              key: "property_type",
              label: "Property Type",
              options: [
                "Apartment",
                "Flat",
                "Villa",
                "Independent House",
                "PG",
                "Hostel",
              ],
            },
            {
              key: "parking",
              label: "Parking",
              options: ["Basement", "Open", "Covered", "None"],
            },
            {
              key: "furnishing",
              label: "Furnishing",
              options: ["Unfurnished", "Semi-Furnished", "Fully-Furnished"],
            },
            {
              key: "water_supply",
              label: "Water Supply",
              options: ["Municipal", "Borewell", "Both"],
            },
            {
              key: "internet",
              label: "Internet",
              options: ["Fiber", "Broadband", "None"],
            },
          ].map((field) => (
            <div key={field.key} className="relative">
              <select
                className="peer w-full appearance-none
                px-3 pt-5 pb-2 text-sm text-slate-800
                bg-white border border-slate-300 rounded-lg
                focus:border-slate-900 outline-none transition"
                value={filters[field.key]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    [field.key]: e.target.value,
                  })
                }
              >
                <option value=""></option>
                {field.options.map((op) => (
                  <option key={op}>{op}</option>
                ))}
              </select>

              <label
                className="absolute left-3 top-2 text-xs text-slate-500
                peer-placeholder-shown:top-3.5
                peer-placeholder-shown:text-sm
                peer-focus:top-2
                peer-focus:text-xs
                transition-all pointer-events-none"
              >
                {field.label}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-5">
          <button
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
            onClick={() => {
              setFilters({
                property_type: "",
                parking: "",
                furnishing: "",
                water_supply: "",
                internet: "",
              });
              setSortType("default");
              loadProperties();
            }}
          >
            Reset filters
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-6 px-5 py-3 text-xs font-medium text-slate-500 bg-slate-50">
          <span className="col-span-2">Property</span>
          <span>Price</span>
          <span>Size</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {loading && (
          <p className="px-5 py-6 text-sm text-slate-500">Loading...</p>
        )}

        {properties.map((p) => (
          <div
            key={p.house_id}
            className="grid grid-cols-6 px-5 py-4 border-t border-slate-100
            hover:bg-slate-50 transition"
          >
            <div className="col-span-2 flex items-center gap-4">
              <img
                src={p.photo_url || "https://via.placeholder.com/80"}
                className="h-12 w-16 rounded-md object-cover border"
              />
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {p.city}, {p.state}
                </p>
                <p className="text-xs text-slate-500">
                  {p.property_type || "Property"}
                </p>
              </div>
            </div>

            <p className="text-sm font-medium text-slate-800">₹{p.price_inr}</p>

            <p className="text-sm text-slate-600">{p.size_sqft} sqft</p>

            <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 w-fit">
              Active
            </span>

            <div className="flex justify-end gap-3">
              <button
                className="text-sm text-slate-600 hover:text-slate-900"
                onClick={() => setEditProperty({ ...p })}
              >
                Edit
              </button>
              <button
                className="text-sm text-slate-400 hover:text-red-600"
                onClick={() => deletehouse(p.house_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {editProperty && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md border">
            <h2 className="text-lg font-semibold mb-4">Edit Property</h2>

            {["city", "state", "price_inr"].map((field) => (
              <input
                key={field}
                type={field === "price_inr" ? "number" : "text"}
                className="w-full mb-3 px-3 py-2 text-sm border rounded-md
                focus:ring-1 focus:ring-slate-400"
                value={editProperty[field]}
                onChange={(e) =>
                  setEditProperty({
                    ...editProperty,
                    [field]: e.target.value,
                  })
                }
              />
            ))}

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 text-sm rounded-md bg-slate-100"
                onClick={() => setEditProperty(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm rounded-md bg-slate-900 text-white"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
