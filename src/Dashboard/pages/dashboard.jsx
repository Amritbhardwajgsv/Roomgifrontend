import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

import {
  Building2,
  TrendingUp,
  IndianRupee,
  PlusCircle,
  Clock,
  ArrowUpRight,
  MapPin
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { getpropertybybrokername } from "../../api/propertyapi";

export default function Dashboard() {
    const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getpropertybybrokername();
        setProperties(res.data || []);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  /* ================= FIXED LOGIC ================= */

  const totalProperties = properties.length;

  const totalRevenue = properties.reduce(
    (sum, p) => sum + Number(p.price_inr || 0),
    0
  );

  // ✅ FIX 1 — city normalization
  const citiesCovered = new Set(
    properties
      .map(p => (p.city || "").trim().toLowerCase())
      .filter(Boolean)
  ).size;

  const avgPrice =
    totalProperties === 0
      ? 0
      : Math.round(totalRevenue / totalProperties);

  
  const topProperty =
    properties.length > 0
      ? [...properties].sort(
          (a, b) =>
            Number(b.price_inr || 0) -
            Number(a.price_inr || 0)
        )[0]
      : null;

  const recentActivity = [...properties]
    .slice(-4)
    .reverse()
    .map(p => ({
      id: p.house_id,
      text: `Property listed in ${p.city}, ${p.state}`,
      time: "Recently added"
    }));

  // ✅ FIX 3 — real chart data
  const chartData = properties.map((p, i) => ({
    name: `P${i + 1}`,
    price: Number(p.price_inr || 0)
  }));

  /* ================= STATS ================= */

  const stats = [
    {
      title: "Total Properties",
      value: totalProperties,
      icon: Building2
    },
    {
      title: "Total Revenue",
      value: `₹${(totalRevenue / 100000).toFixed(1)}L`,
      icon: IndianRupee
    },
    {
      title: "Cities Covered",
      value: citiesCovered,
      icon: MapPin
    },
    {
      title: "Average Price",
      value: `₹${(avgPrice / 100000).toFixed(1)}L`,
      icon: TrendingUp
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Broker Dashboard
            </h1>
            <p className="text-slate-500">
              Live performance overview
            </p>
          </div>

        <button
  onClick={() => navigate("/broker/add-property")}
  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700"
>
  <PlusCircle />
  Add Property
</button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow"
              >
                <div className="flex justify-between mb-4">
                  <div className="p-3 bg-indigo-50 rounded-xl">
                    <Icon className="text-indigo-600" />
                  </div>
                </div>
                <p className="text-slate-500 text-sm">
                  {s.title}
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {s.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CHART */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Price Distribution
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#4f46e5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* ACTIVITY */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock /> Recent Activity
            </h2>

            {recentActivity.map(a => (
              <div
                key={a.id}
                className="p-3 rounded-xl bg-slate-50 mb-2"
              >
                <p className="font-medium text-slate-700">
                  {a.text}
                </p>
                <p className="text-xs text-slate-500">
                  {a.time}
                </p>
              </div>
            ))}
          </div>

          {/* TOP PROPERTY */}
          {topProperty && (
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-bold mb-4">
                Top Performing Property
              </h2>

              <p className="text-lg font-semibold">
                {topProperty.city}, {topProperty.state}
              </p>

              <p className="text-3xl font-bold mt-2">
                ₹{Number(topProperty.price_inr).toLocaleString("en-IN")}
              </p>

              <p className="text-sm mt-1">
                {topProperty.size_sqft} sqft
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
