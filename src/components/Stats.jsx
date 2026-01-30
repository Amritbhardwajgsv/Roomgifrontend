export default function Stats() {
  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        <Stat value="10K+" label="Active Listings" />
        <Stat value="3.5K+" label="Property Owners" />
        <Stat value="1.2K+" label="Verified Brokers" />
        <Stat value="50+" label="Cities Covered" />
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}
