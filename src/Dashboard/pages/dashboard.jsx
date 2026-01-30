import { motion } from "framer-motion";
import { Building2, TrendingUp, IndianRupee, PlusCircle, Eye, Clock, ArrowUpRight, MapPin, Sparkles, Activity, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Total Properties", value: 28, icon: Building2, change: "+4 this month", trend: "up" },
    { title: "Active Listings", value: 19, icon: Activity, change: "+2 active", trend: "up" },
    { title: "Monthly Revenue", value: "₹1.45L", icon: IndianRupee, change: "+12%", trend: "up" },
    { title: "Property Views", value: "3,420", icon: Eye, change: "+18%", trend: "up" }
  ];

  const recentActivity = [
    { id: 1, text: "3BHK Apartment added in Ahmedabad", time: "2 hours ago", type: "new" },
    { id: 2, text: "Property sold in Surat - ₹85L", time: "5 hours ago", type: "sale" },
    { id: 3, text: "Profile updated successfully", time: "1 day ago", type: "update" },
    { id: 4, text: "New inquiry for villa in Gandhinagar", time: "2 days ago", type: "inquiry" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2">
                Welcome back, Broker 👋
              </h1>
              <p className="text-slate-600 text-lg">
                Here's what's happening with your listings today
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all"
            >
              <PlusCircle size={20} />
              Add Property
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                  className="relative group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                      <Icon className="text-blue-600" size={24} />
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      {stat.change}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Middle Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Revenue Overview</h2>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <BarChart3 size={16} />
                  <span>Last 6 months</span>
                </div>
              </div>
              
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border-2 border-dashed border-slate-200">
                <div className="text-center">
                  <div className="text-6xl mb-4">📈</div>
                  <p className="text-slate-600 font-medium">Chart visualization (Recharts)</p>
                  <p className="text-sm text-slate-500 mt-1">Revenue trends and analytics</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                {[
                  { icon: PlusCircle, label: "Add Property", color: "blue" },
                  { icon: Eye, label: "View Properties", color: "indigo" },
                  { icon: Sparkles, label: "Update Profile", color: "purple" }
                ].map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ x: 4, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-blue-50 hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all group"
                    >
                      <div className={`p-2 bg-${action.color}-100 rounded-lg group-hover:bg-${action.color}-200 transition-colors`}>
                        <Icon className={`text-${action.color}-600`} size={18} />
                      </div>
                      <span className="font-medium text-slate-700">{action.label}</span>
                      <ArrowUpRight className="ml-auto text-slate-400 group-hover:text-slate-600" size={16} />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                <Clock className="text-slate-400" size={20} />
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'sale' ? 'bg-emerald-500' :
                      activity.type === 'new' ? 'bg-blue-500' :
                      activity.type === 'inquiry' ? 'bg-purple-500' :
                      'bg-slate-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-slate-700 font-medium text-sm">{activity.text}</p>
                      <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top Performing Property */}
            <motion.div 
              variants={itemVariants}
              className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-lg overflow-hidden"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Top Performing</h2>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                    <TrendingUp className="text-white" size={18} />
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Building2 className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-1">3BHK Apartment</h3>
                      <div className="flex items-center gap-1 text-white/80 text-sm">
                        <MapPin size={14} />
                        <span>Ahmedabad, Gujarat</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/60 text-xs mb-1">Asking Price</p>
                      <p className="text-white font-bold text-2xl">₹65,00,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-xs mb-1">Views</p>
                      <p className="text-white font-semibold">847</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  View Details
                  <ArrowUpRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}