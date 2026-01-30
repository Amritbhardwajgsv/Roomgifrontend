import {
  FaHome,
  FaUsers,
  FaHandshake,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* ================= HEADER ================= */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-700 mb-4">About Roomgi</h1>
        <p className="text-gray-500 max-w-3xl mx-auto">
          Roomgi is a broker-focused property platform built to help real-estate
          professionals discover demand, manage listings, and close deals faster
          — with transparency and trust at its core.
        </p>
      </div>

      {/* ================= MISSION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Our mission is to empower brokers with the right tools, verified
            leads, and market insights so they can focus on what matters most —
            closing deals efficiently. Roomgi simplifies listing management,
            improves lead quality, and removes friction from broker-tenant
            interactions.
          </p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">
            Problems We Solve for Brokers
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>• Fake or low-intent enquiries</li>
            <li>• Poor visibility for quality listings</li>
            <li>• Time wasted on unverified leads</li>
            <li>• Lack of transparency in demand & pricing</li>
          </ul>
        </div>
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold text-slate-700 text-center mb-12">
          Why Brokers Choose Roomgi
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* VERIFIED */}
          <div className="border rounded-2xl p-6 text-center hover:shadow-lg transition">
            <FaShieldAlt className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-slate-700 mb-2">
              Verified Leads
            </h3>
            <p className="text-sm text-gray-500">
              Genuine tenant and buyer enquiries — no spam, no noise.
            </p>
          </div>

          {/* PERFORMANCE */}
          <div className="border rounded-2xl p-6 text-center hover:shadow-lg transition">
            <FaChartLine className="text-purple-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-slate-700 mb-2">
              Better Conversions
            </h3>
            <p className="text-sm text-gray-500">
              Focus on high-intent demand and close deals faster.
            </p>
          </div>

          {/* MANAGEMENT */}
          <div className="border rounded-2xl p-6 text-center hover:shadow-lg transition">
            <FaHome className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-slate-700 mb-2">
              Smart Listing Management
            </h3>
            <p className="text-sm text-gray-500">
              Create, update, and manage listings with full control.
            </p>
          </div>

          {/* TRUST */}
          <div className="border rounded-2xl p-6 text-center hover:shadow-lg transition">
            <FaHandshake className="text-orange-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-slate-700 mb-2">
              Broker-First Trust
            </h3>
            <p className="text-sm text-gray-500">
              A transparent ecosystem built for professionals.
            </p>
          </div>
        </div>
      </div>

      {/* ================= VISION ================= */}
      <div className="bg-slate-50 rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-500 max-w-4xl mx-auto">
          We envision Roomgi as India’s most trusted broker-centric real-estate
          platform — where professionals gain visibility, access real demand,
          and close property deals with confidence and speed.
        </p>
      </div>
    </div>
  );
}
