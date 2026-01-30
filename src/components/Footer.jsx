import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaHome,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">
      {/* TOP */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2 text-white text-xl font-semibold">
            <FaHome className="text-blue-500" />
            <span>Roomgi</span>
          </div>
          <p className="text-sm mt-4 text-gray-400">
            Roomgi helps you find verified rental homes, PGs, hostels and
            premium properties across India with ease and trust.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-white">
                Search Property
              </Link>
            </li>
            <li>
              <Link to="/offers" className="hover:text-white">
                Offers
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Buy Homes</li>
            <li>Rent Homes</li>
            <li>PG & Hostels</li>
            <li>Broker Listings</li>
            <li>Owner Dashboard</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">Email: support@roomgi.com</p>
          <p className="text-sm text-gray-400 mt-1">Phone: +91 98765 43210</p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 rounded-full hover:bg-pink-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 rounded-full hover:bg-sky-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 rounded-full hover:bg-blue-700 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-slate-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Roomgi. All rights reserved.
      </div>
    </footer>
  );
}
