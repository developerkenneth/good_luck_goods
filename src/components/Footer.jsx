import { FaFacebook, FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import CopyRight from "./CopyRight";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Location */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-primary">Our Location</h2>
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-pink-600 mt-1" />
            <p>Accra, Ghana</p>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-primary">Contact Us</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-pink-600" />
              <a href="tel:+2348123456789" className="hover:underline">
                +233 202651646
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-pink-600" />
              <a href="mailto:info@goodlucks.co" className="hover:underline">
                info@goodlucks.co
              </a>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-primary">Follow Us</h2>
          <div className="flex items-center gap-5 text-2xl">
            <a
              href="https://www.facebook.com/GoodlucksGoods"
              target="_self"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://wa.me/+233202651646"
              target="_self"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/goodlucksgoods/"
              target="_self"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
     <CopyRight />
    </footer>
  );
}
