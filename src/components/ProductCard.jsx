import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductModal from "./ProductModal";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  const getStockStatus = (qty) => {
    if (qty > 10) return { text: `In stock (${qty})`, color: "text-green-600" };
    if (qty > 0) return { text: `Low stock (${qty})`, color: "text-yellow-500" };
    return { text: "Out of stock", color: "text-red-500" };
  };

  const stock = getStockStatus(parseInt(product.stock) || 0);

  const formatCurrency = (amount) =>
    `GHS ${parseFloat(amount || 0).toLocaleString()}`;

  const hasDiscount =
    product.discount_percentage && parseFloat(product.discount_percentage) > 0;

  const colors = Array.isArray(product.colors)
    ? product.colors
    : product.colors
    ? product.colors.split(",")
    : [];

  const paymentMethod =
    product.payment_method?.toLowerCase() === "prepaid"
      ? { text: "Prepaid", color: "bg-blue-100 text-blue-600" }
      : { text: "Pay on Delivery", color: "bg-green-100 text-green-600" };

  return (
    <>
      <div className="block w-full max-w-xs bg-white dark:bg-gray-800 dark:bg-brand-dark rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform h-full hover:scale-[1.02]">
        <div className="relative overflow-hidden group">
          <Link to={`/product/${product.slug}`}>
            <img
              src={
                product.main_image
                  ? `https://admin.shop.goodlucks.co/storage/${product.main_image}`
                  : "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={product.name}
              className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10">
              {product.discount_percentage}% OFF
            </span>
          )}

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

          <div className="flex items-center gap-2">
            <span className="text-brand-primary font-bold text-lg">
              {formatCurrency(product.actual_price)}
            </span>
            {hasDiscount && (
              <span className="text-sm line-through text-gray-400 dark:text-gray-500">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <p className={`text-xs font-medium ${stock.color}`}>{stock.text}</p>

          {colors.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Colors:
              </span>
              <div className="flex gap-1">
                {colors.slice(0, 5).map((color, i) => (
                  <span
                    key={i}
                    title={color.trim()}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.trim() }}
                  ></span>
                ))}
              </div>
            </div>
          )}

          {product.payment_method && (
            <p
              className={`inline-block text-[11px] font-medium px-2 py-1 rounded-full mt-2 ${paymentMethod.color}`}
            >
              💳 {paymentMethod.text}
            </p>
          )}

          <button
            onClick={() => setShowModal(true)}
            disabled={product.stock <= 0}
            className={`w-full mt-3 py-2 px-4 text-sm font-medium rounded-lg transition ${
              product.stock <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-pink-600 text-white hover:bg-accent"
            }`}
          >
            {product.stock <= 0 ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Use modal component */}
      {showModal && (
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
}
