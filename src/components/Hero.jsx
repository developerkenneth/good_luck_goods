import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero-img.jpg";
export default function Hero() {
  return (
    <section className="w-full font-p bg-light dark:bg-dark text-gray-800 dark:text-white py-12 rounded-lg my-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-10 gap-8">
        {/* Left: Text */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl font-header md:text-5xl font-extrabold leading-tight">
            Discover the 
            <span className="text-primary"> Latest Trends</span> in Shopping
          </h1>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
            Shop the newest arrivals in fashion, electronics, and home goods — all at unbeatable prices.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/shop"
              className="bg-primary text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-pink-600 transition"
            >
              Shop Now
            </Link>
            <Link
              to="+233202651646"
              target="_blank"
              className="border border-primary text-primary px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={heroImage}
            alt="Shopping Banner"
            className="w-full max-w-md md:max-w-lg object-contain rounded"
          />
        </div>
      </div>
    </section>
  );
}
