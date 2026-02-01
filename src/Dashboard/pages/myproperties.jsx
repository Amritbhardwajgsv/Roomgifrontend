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

  const [expandedHouseId, setExpandedHouseId] = useState(null);
  const [deleteHouseId, setDeleteHouseId] = useState(null);

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

  /* ================= DELETE ================= */
  const confirmDelete = async () => {
    await deletebyid(deleteHouseId);
    setProperties((prev) =>
      prev.filter((p) => p.house_id !== deleteHouseId)
    );
    setDeleteHouseId(null);
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    const updated = await updatedetails(editProperty);
    setProperties((prev) =>
      prev.map((p) =>
        p.house_id === updated.data.house_id ? updated.data : p
      )
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
          className="px-4 py-2 text-sm rounded-md border"
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

      {/* FILTERS */}
      <div className="bg-white border rounded-lg p-5">
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
          ].map((f) => (
            <select
              key={f.key}
              className="px-3 py-2 border rounded-md text-sm"
              value={filters[f.key]}
              onChange={(e) =>
                setFilters({ ...filters, [f.key]: e.target.value })
              }
            >
              <option value="">{f.label}</option>
              {f.options.map((op) => (
                <option key={op}>{op}</option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="grid grid-cols-6 px-5 py-3 text-xs font-medium bg-slate-50">
          <span className="col-span-2">Property</span>
          <span>Price</span>
          <span>Size</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {properties.map((p) => (
          <div key={p.house_id}>
            <div
              onClick={() =>
                setExpandedHouseId(
                  expandedHouseId === p.house_id ? null : p.house_id
                )
              }
              className="grid grid-cols-6 px-5 py-4 border-t hover:bg-slate-50 cursor-pointer"
            >
              <div className="col-span-2">
                <p className="text-sm font-medium">
                  {p.city}, {p.state}
                </p>
                <p className="text-xs text-slate-500">
                  {p.property_type}
                </p>
              </div>

              <p>₹{p.price_inr}</p>
              <p>{p.size_sqft} sqft</p>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  p.status === "sold"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {p.status === "sold" ? "Sold" : "Available"}
              </span>

              <div
                className="flex justify-end gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="text-sm text-slate-600"
                  onClick={() => setEditProperty({ ...p })}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-red-500"
                  onClick={() => setDeleteHouseId(p.house_id)}
                >
                  Delete
                </button>
              </div>
            </div>

            {expandedHouseId === p.house_id && (
              <div className="bg-slate-50 px-6 py-4 border-t grid grid-cols-3 gap-4 text-sm">
                <div><b>House ID:</b> {p.house_id}</div>
                <div><b>Bedrooms:</b> {p.bedrooms}</div>
                <div><b>Bathrooms:</b> {p.bathrooms}</div>
                <div><b>Price:</b> ₹{p.price_inr}</div>
                <div><b>Size:</b> {p.size_sqft} sqft</div>
                <div><b>Status:</b> {p.status}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editProperty && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg
                max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Edit Property</h2>

            <label className="block text-sm font-medium">House ID</label>
            <input value={editProperty.house_id} disabled className="w-full mb-3 p-2 border rounded bg-gray-100" />

            <label className="block text-sm font-medium">City</label>
            <input className="w-full mb-3 p-2 border rounded" value={editProperty.city ?? ""}
              onChange={(e) => setEditProperty({ ...editProperty, city: e.target.value })} />

            <label className="block text-sm font-medium">State</label>
            <input className="w-full mb-3 p-2 border rounded" value={editProperty.state?? ""}
              onChange={(e) => setEditProperty({ ...editProperty, state: e.target.value })} />

            <label className="block text-sm font-medium">Price</label>
            <input type="number" className="w-full mb-3 p-2 border rounded" value={editProperty.price_inr ?? ""}
              onChange={(e) => setEditProperty({ ...editProperty, price_inr: e.target.value })} />

            <label className="block text-sm font-medium">Size (sqft)</label>
            <input type="number" className="w-full mb-3 p-2 border rounded" value={editProperty.size_sqft ?? ""}
              onChange={(e) => setEditProperty({ ...editProperty, size_sqft: e.target.value })} />

            <label className="block text-sm font-medium">Bedrooms</label>
            <input type="number" className="w-full mb-3 p-2 border rounded" value={editProperty.bedrooms ?? "" }
              onChange={(e) => setEditProperty({ ...editProperty, bedrooms: e.target.value })} />

            <label className="block text-sm font-medium">Bathrooms</label>
            <input type="number" className="w-full mb-3 p-2 border rounded" value={editProperty.bathrooms ?? ""}
              onChange={(e) => setEditProperty({ ...editProperty, bathrooms: e.target.value })} />

            <label className="block text-sm font-medium">Status</label>
            <select className="w-full mb-4 p-2 border rounded"
              value={editProperty.status}
              onChange={(e) => setEditProperty({ ...editProperty, status: e.target.value })}>
              <option value="notsold">Available</option>
              <option value="sold">Sold</option>
            </select>

            <div className="flex justify-end gap-3">
              <button onClick={() => setEditProperty(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-slate-900 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteHouseId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Delete Property</h3>
            <p className="text-sm mb-6">
              Delete house ID <b>{deleteHouseId}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteHouseId(null)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
