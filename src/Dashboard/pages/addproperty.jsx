import { useState, useCallback, memo } from "react";
import { adddetails } from "../../api/propertyapi";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= LEAFLET FIX ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ================= MEMO INPUT ================= */
const Input = memo(function Input({
  label,
  name,
  type = "text",
  required,
  value,
  onChange
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
});

/* ================= MAP CLICK ================= */
function LocationPicker({ setFormData }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      setFormData(p => ({
        ...p,
        latitude: lat,
        longitude: lng
      }));
    }
  });

  return null;
}

/* ================= MAIN COMPONENT ================= */
export default function AddProperty() {
  const [formData, setFormData] = useState({
    Apartment_name: "",
    price_inr: "",
    size_sqft: "",
    bedrooms: "",
    bathrooms: "",
    property_type: "Apartment",
    year_built: "",
    parking: "",
    furnishing: "",
    power_backup: false,
    latitude: null,
    longitude: null
  });

  /* 🔒 STABLE HANDLER (CRITICAL FIX) */
  const handleChange = useCallback(e => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.latitude === null) {
      alert("Please select location on map");
      return;
    }

    const payload = {
      ...formData,
      price_inr: Number(formData.price_inr),
      size_sqft: Number(formData.size_sqft),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      location: {
        type: "Point",
        coordinates: [formData.longitude, formData.latitude]
      }
    };

    try {
      await adddetails(payload);
      alert("Property added successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to add property ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Add Property</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input label="Apartment Name" name="Apartment_name" value={formData.Apartment_name} onChange={handleChange} />
              <Input label="Price (INR)" name="price_inr" type="number" required value={formData.price_inr} onChange={handleChange} />
              <Input label="Size (sqft)" name="size_sqft" type="number" required value={formData.size_sqft} onChange={handleChange} />
              <Input label="Bedrooms" name="bedrooms" type="number" required value={formData.bedrooms} onChange={handleChange} />
              <Input label="Bathrooms" name="bathrooms" type="number" required value={formData.bathrooms} onChange={handleChange} />

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Property Type *</label>
                <select
                  className="input"
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                >
                  <option>Apartment</option>
                  <option>Flat</option>
                  <option>Villa</option>
                  <option>Independent House</option>
                </select>
              </div>

              <Input label="Year Built" name="year_built" type="number" value={formData.year_built} onChange={handleChange} />
              <Input label="Parking" name="parking" value={formData.parking} onChange={handleChange} />
              <Input label="Furnishing" name="furnishing" value={formData.furnishing} onChange={handleChange} />

              <label className="flex items-center gap-2 col-span-2">
                <input
                  type="checkbox"
                  name="power_backup"
                  checked={formData.power_backup}
                  onChange={handleChange}
                />
                Power Backup
              </label>
            </div>

            {/* MAP */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Select Property Location (Click on Map)
              </label>

              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                className="h-[520px] rounded-xl"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker setFormData={setFormData} />
                {formData.latitude && (
                  <Marker position={[formData.latitude, formData.longitude]} />
                )}
              </MapContainer>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold"
          >
            Publish Property
          </button>
        </form>
      </div>
    </div>
  );
}
