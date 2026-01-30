export default function HowItWorks() {
  const steps = [
    {
      title: "Search Property",
      desc: "Find rooms, PGs, flats or homes in your preferred location.",
      icon: "🔍",
    },
    {
      title: "Compare Listings",
      desc: "Check verified listings with price, photos and details.",
      icon: "📋",
    },
    {
      title: "Connect Instantly",
      desc: "Directly contact owners or brokers without hassle.",
      icon: "📞",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold text-slate-700 mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-slate-700">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
