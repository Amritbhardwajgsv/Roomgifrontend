import { useState } from "react";
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

/* ================= MAP CLICK ==============npx p=== */
function LocationPicker({ setFormData }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      const a = data.address || {};

      setFormData(p => ({
        ...p,
        latitude: lat,
        longitude: lng,
        city: a.city || a.town || a.village || "",
        district: a.county || a.state_district || "",
        state: a.state || ""
      }));
    }
  });
  return null;
}

/* ================= COMPONENT ================= */
export default function AddProperty() {
  const [formData, setFormData] = useState({
    Apartment_name: "",
    state: "",
    district: "",
    city: "",
    latitude: null,
    longitude: null,
    price_inr: "",
    size_sqft: "",
    bedrooms: "",
    bathrooms: "",
    property_type: "Apartment",
    year_built: "",
    parking: "",
    furnishing: "",
    water_supply: "",
    internet: "",
    power_backup: false
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(p => ({
      ...p,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.latitude || !formData.longitude) {
      alert("Please select property location on map");
      return;
    }

    const payload = {
      ...formData,
      Owner_name: localStorage.getItem("username"),
      brokername: localStorage.getItem("brokername"),
      BrokerId: localStorage.getItem("uniqueid"),
      location: {
        type: "Point",
        coordinates: [formData.longitude, formData.latitude]
      }
    };

    try {
      await adddetails(payload); // JSON body
      alert("Property added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add property");
    }
  };

  const Input = ({ label, name, type = "text", required }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="input"
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Add Property</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* LEFT FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input label="Apartment Name" name="Apartment_name" />
              <Input label="Price (INR)" name="price_inr" type="number" required />
              <Input label="Size (sqft)" name="size_sqft" type="number" required />
              <Input label="Bedrooms" name="bedrooms" type="number" required />
              <Input label="Bathrooms" name="bathrooms" type="number" required />

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
                  <option>PG</option>
                  <option>Hostel</option>
                </select>
              </div>

              <Input label="Year Built" name="year_built" type="number" />
              <Input label="Parking" name="parking" />
              <Input label="Furnishing" name="furnishing" />
              <Input label="Water Supply" name="water_supply" />
              <Input label="Internet" name="internet" />

              <Input label="State" name="state" required />
              <Input label="District" name="district" />
              <Input label="City" name="city" required />

              <label className="flex items-center gap-2 col-span-2">
                <input type="checkbox" name="power_backup" onChange={handleChange} />
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
