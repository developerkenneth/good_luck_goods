import { FaFacebook, FaWhatsapp, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Location */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-primary">Our Location</h2>
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-pink-600 mt-1" />
            <p>No. 12 University Road, Awka, Anambra State, Nigeria</p>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-primary">Contact Us</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-pink-600" />
              <a href="tel:+2348123456789" className="hover:underline">
                +234 812 345 6789
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-pink-600" />
              <a href="mailto:info@goodluckgoods.com" className="hover:underline">
                info@goodluckgoods.com
              </a>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-primary">Follow Us</h2>
          <div className="flex items-center gap-5 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://wa.me/2348123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-4 text-center text-sm">
        © {new Date().getFullYear()} <span className="text-primary font-semibold">Goodlucks Goods</span>. All rights reserved.
      </div>
    </footer>
  );
}
