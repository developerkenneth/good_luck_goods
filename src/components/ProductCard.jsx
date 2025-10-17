import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const getStockStatus = (qty) => {
    if (qty > 10) return { text: `In stock (${qty})`, color: "text-green-600" };
    if (qty > 0) return { text: `Low stock (${qty})`, color: "text-yellow-500" };
    return { text: "Out of stock", color: "text-red-500" };
  };

  const stock = getStockStatus(parseInt(product.stock) || 0);

  // Price Formatting
  const formatCurrency = (amount) =>
    `₦${parseFloat(amount || 0).toLocaleString()}`;

  const hasDiscount =
    product.discount_percentage && parseFloat(product.discount_percentage) > 0;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="block w-full max-w-xs bg-white dark:bg-brand-dark rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:scale-[1.02]"
    >
      <div className="relative overflow-hidden group">
        <img
          src={
            product.main_image
              ? `http://127.0.0.1:8000/storage/${product.main_image}`
              : "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.name}
          className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10">
            {product.discount_percentage}% OFF
          </span>
        )}

        {/* Category Badge */}
        {product.category?.name && (
          <span className="absolute top-3 right-3 bg-teal-600 text-white text-xs px-2 py-1 rounded-full shadow-md z-10">
            {product.category.name}
          </span>
        )}
      </div>

      <div className="p-4 space-y-2 dark:bg-gray-800">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2">
          <span className="text-brand-primary font-bold text-lg">
            {formatCurrency(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm line-through text-gray-400 dark:text-gray-500">
              {formatCurrency(product.actual_price)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <p className={`text-xs font-medium ${stock.color}`}>{stock.text}</p>

        {/* Add to Cart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          disabled={product.stock <= 0}
          className={`w-full mt-2 py-2 px-4 text-sm font-medium rounded-lg transition ${
            product.stock <= 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-pink-600 text-white hover:bg-pink-700"
          }`}
        >
          {product.stock <= 0 ? "Sold Out" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
