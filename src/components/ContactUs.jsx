import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTwitter
} from "react-icons/fa";

export default function ContactUs() {
  return (
    <section className="bg-brand-light dark:bg-brand-dark py-16 px-6 text-center animate-fade-in font-p">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-brand-primary mb-4">Contact Us</h2>
      <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-6">
        We'd love to hear from you. Reach us via WhatsApp, email, phone, or the form below.
      </p>

      {/* WhatsApp + Contact Info */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        <a
          href="https://wa.me/+233202651646"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-full transition-transform hover:scale-105"
        >
          <FaWhatsapp size={18} />
          Chat on WhatsApp
        </a>

        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <p><strong>Phone:</strong> +233 202 651 646</p>
          <p><strong>Email:</strong> info@goodlucks.co</p>
        </div>
      </div>


      {/* Social Media Icons */}
      <div className="mt-10 flex justify-center gap-6 text-xl text-gray-600 dark:text-gray-300">
        <a
          href="https://www.facebook.com/GoodlucksGoods"
          target="_blank"                                                                
          rel="noopener noreferrer"
          className="hover:text-brand-primary transition-transform hover:scale-125"
        >
          <FaFacebookF />
        </a>
        {/* <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-primary transition-transform hover:scale-125"
        >
          <FaTwitter />
        </a> */}
        {/* <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-primary transition-transform hover:scale-125"
        >
          <FaTiktok />
        </a> */}
        <a
          href="https://www.instagram.com/goodlucksgoods/"
          target="_self"
          rel="noopener noreferrer"
          className="hover:text-brand-primary transition-transform hover:scale-125"
        >
          <FaInstagram />
        </a>
      </div>
    </section>
  );
}
