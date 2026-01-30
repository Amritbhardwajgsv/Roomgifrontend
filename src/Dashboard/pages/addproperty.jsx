import { useState } from "react";
import { adddetails } from "../../api/propertyapi";

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
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        Owner_name: localStorage.getItem("username") || "rajesh kumar",
        brokername: localStorage.getItem("brokername") || "default-broker"
      };

      await adddetails(payload);

      alert("Property added successfully!");

      // reset form
      setFormData({
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

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-6">
        Add New Property
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* City */}
        <input
          name="city"
          placeholder="City"
          className="input"
          value={formData.city}
          onChange={handleChange}
          required
        />

        {/* State */}
        <input
          name="state"
          placeholder="State"
          className="input"
          value={formData.state}
          onChange={handleChange}
          required
        />

        {/* Latitude */}
        <input
          name="latitude"
          type="number"
          step="any"
          placeholder="Latitude"
          className="input"
          value={formData.latitude}
          onChange={handleChange}
          required
        />

        {/* Longitude */}
        <input
          name="longitude"
          type="number"
          step="any"
          placeholder="Longitude"
          className="input"
          value={formData.longitude}
          onChange={handleChange}
          required
        />

        {/* Price */}
        <input
          name="price_inr"
          type="number"
          placeholder="Price (INR)"
          className="input"
          value={formData.price_inr}
          onChange={handleChange}
          required
        />

        {/* Size */}
        <input
          name="size_sqft"
          type="number"
          placeholder="Size (sqft)"
          className="input"
          value={formData.size_sqft}
          onChange={handleChange}
          required
        />

        {/* Bedrooms */}
        <input
          name="bedrooms"
          type="number"
          placeholder="Bedrooms"
          className="input"
          value={formData.bedrooms}
          onChange={handleChange}
          required
        />

        {/* Bathrooms */}
        <input
          name="bathrooms"
          type="number"
          placeholder="Bathrooms"
          className="input"
          value={formData.bathrooms}
          onChange={handleChange}
          required
        />

        {/* Property Type */}
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

        {/* Furnishing */}
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

        {/* Parking */}
        <select
          name="parking"
          className="input"
          value={formData.parking}
          onChange={handleChange}
        >
          <option>None</option>
          <option>Open</option>
          <option>Covered</option>
          <option>Basement</option>
        </select>

        {/* Internet */}
        <select
          name="internet"
          className="input"
          value={formData.internet}
          onChange={handleChange}
        >
          <option>None</option>
          <option>Fiber</option>
          <option>Broadband</option>
        </select>

        {/* Image */}
        <input
          name="photo_url"
          placeholder="Photo URL"
          className="input col-span-2"
          value={formData.photo_url}
          onChange={handleChange}
        />

        {/* Power backup */}
        <label className="flex items-center gap-3 col-span-2">
          <input
            type="checkbox"
            name="power_backup"
            checked={formData.power_backup}
            onChange={handleChange}
          />
          Power Backup Available
        </label>

        <button
          type="submit"
          className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Add Property
        </button>

      </form>
    </div>
  );
}
