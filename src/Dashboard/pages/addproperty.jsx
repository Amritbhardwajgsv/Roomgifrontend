import { useState } from "react";
import { adddetails } from "../../api/propertyapi";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* Fix leaflet marker issue */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationPicker({ setFormData }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setFormData(prev => ({
        ...prev,
        latitude: lat.toFixed(6),
        longitude: lng.toFixed(6),
      }));
    },
  });
  return null;
}

export default function AddProperty() {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    price_inr: "",
    size_sqft: "",
    bedrooms: "",
    bathrooms: "",
    property_type: "Apartment",
    nearest_hospital: "",
    hospital_distance_km: "",
    nearest_railway_station: "",
    railway_distance_km: "",
    nearest_airport: "",
    airport_distance_km: "",
    year_built: "",
    parking: "None",
    furnishing: "Unfurnished",
    water_supply: "Municipal",
    power_backup: false,
    internet: "None",
    photo_url: "",
    Apartment_name: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData(prev => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }));
      },
      () => alert("Location permission denied")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        Owner_name: localStorage.getItem("username") || "rajesh kumar",
        brokername: localStorage.getItem("brokername") || "default-broker",
      };

      await adddetails(payload);
      alert("Property added successfully!");
    } catch (err) {
      alert(err.message);
    }
  };


  return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">

    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Add Property
        </h1>
        <p className="text-gray-500 mt-1">
          Fill the details below to list a new property
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* LEFT FORM */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Property Information
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            <input name="city" placeholder="City" className="input"
              value={formData.city} onChange={handleChange} required />

            <input name="state" placeholder="State" className="input"
              value={formData.state} onChange={handleChange} required />

            <input name="price_inr" type="number" placeholder="Price (INR)"
              className="input" value={formData.price_inr}
              onChange={handleChange} required />

            <input name="size_sqft" type="number" placeholder="Size (sqft)"
              className="input" value={formData.size_sqft}
              onChange={handleChange} required />

            <input name="bedrooms" type="number" placeholder="Bedrooms"
              className="input" value={formData.bedrooms}
              onChange={handleChange} required />

            <input name="bathrooms" type="number" placeholder="Bathrooms"
              className="input" value={formData.bathrooms}
              onChange={handleChange} required />

            <select
              name="property_type"
              className="input"
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

            <select
              name="furnishing"
              className="input"
              value={formData.furnishing}
              onChange={handleChange}
            >
              <option>Unfurnished</option>
              <option>Semi-Furnished</option>
              <option>Fully-Furnished</option>
            </select>

            <input
              name="photo_url"
              placeholder="Property Image URL"
              className="input col-span-2"
              value={formData.photo_url}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="col-span-2 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white py-3 rounded-xl text-lg font-semibold shadow-md"
            >
              Publish Property
            </button>

          </form>
        </div>

        {/* RIGHT MAP PANEL */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Location Picker
            </h2>

            <button
              type="button"
              onClick={detectLocation}
              className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
            >
              Auto Detect
            </button>
          </div>

          <div className="rounded-xl overflow-hidden border mb-4">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              className="h-[360px] w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <LocationPicker setFormData={setFormData} />

              {formData.latitude && (
                <Marker
                  position={[
                    formData.latitude,
                    formData.longitude
                  ]}
                />
              )}
            </MapContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-auto">
            <input
              value={formData.latitude}
              readOnly
              placeholder="Latitude"
              className="input bg-gray-100"
            />
            <input
              value={formData.longitude}
              readOnly
              placeholder="Longitude"
              className="input bg-gray-100"
            />
          </div>

        </div>
      </div>
    </div>
  </div>
);
}