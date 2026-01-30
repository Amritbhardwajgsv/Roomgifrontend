export default function WhyChooseUs() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-semibold text-center mb-12">
        Why Brokers Choose Us
      </h2>

      <div className="grid sm:grid-cols-4 gap-8">
        <Card title="Verified Leads" desc="No spam enquiries" />
        <Card title="Higher Conversion" desc="Serious tenants only" />
        <Card title="Faster Closures" desc="Direct communication" />
        <Card title="Broker Protection" desc="Full listing control" />
      </div>
    </div>
  );
}

function Card({ title, desc }) {
  return (
    <div className="border p-6 rounded-xl text-center">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );
}
