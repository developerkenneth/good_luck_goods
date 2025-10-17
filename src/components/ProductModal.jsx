import { FaTimes } from "react-icons/fa";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-brand-dark rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-brand-primary"
        >
          <FaTimes size={18} />
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-48 h-48 object-cover rounded-lg"
          />
          <div className="flex flex-col justify-between space-y-2">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {product.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {product.description || "No description provided."}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-brand-primary font-bold text-lg">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-gray-400 dark:text-gray-500">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <button
              className="mt-3 w-fit bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
