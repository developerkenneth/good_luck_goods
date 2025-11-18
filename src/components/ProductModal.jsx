import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  if (!product) return null;

  // Normalize colors
  const colors = Array.isArray(product.colors)
    ? product.colors
    : product.colors
    ? product.colors.split(",")
    : [];

  // Price formatting
  const formatCurrency = (amount) =>
    `₦${parseFloat(amount || 0).toLocaleString()}`;

  // Stock
  const getStockStatus = (qty) => {
    if (qty > 10) return { text: `In stock (${qty})`, color: "text-green-600" };
    if (qty > 0) return { text: `Low stock (${qty})`, color: "text-yellow-500" };
    return { text: "Out of stock", color: "text-red-500" };
  };
  const stock = getStockStatus(parseInt(product.stock) || 0);

  // Payment method
  const paymentMethod =
    product.payment_method?.toLowerCase() === "prepaid"
      ? { text: "Prepaid", color: "bg-blue-100 text-blue-600" }
      : { text: "Pay on Delivery", color: "bg-green-100 text-green-600" };

  // Add to cart handler
  const handleAdd = () => {
    if (!selectedColor && colors.length > 0) {
      alert("Please select a color first!");
      return;
    }

    onAddToCart({
      ...product,
      selectedColor,
      quantity,
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 bg-black/60 z-50 flex justify-center items-end md:items-center px-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Modal Container */}
        <motion.div
          key="modal"
          className="bg-white dark:bg-gray-800 rounded-t-3xl md:rounded-2xl shadow-2xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-lg"
            onClick={onClose}
          >
            ✕
          </button>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Image */}
            <div className="flex-shrink-0 w-full md:w-1/2">
              <img
                src={
                  product.main_image
                    ? `https://admin.shop.goodlucks.co/storage/${product.main_image}`
                    : "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={product.name}
                className="w-full h-60 object-cover rounded-xl border border-gray-200 dark:border-gray-700"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between w-full md:w-1/2">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {product.name}
                </h2>

                {/* Category */}
                {product.category?.name && (
                  <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                    Category: {product.category.name}
                  </p>
                )}

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-brand-primary font-bold text-xl">
                    {formatCurrency(product.price)}
                  </span>
                  {product.discount_percentage > 0 && (
                    <span className="text-sm line-through text-gray-400 dark:text-gray-500">
                      {formatCurrency(product.actual_price)}
                    </span>
                  )}
                </div>

                {/* Stock */}
                <p className={`text-xs font-medium mt-1 ${stock.color}`}>
                  {stock.text}
                </p>

                {/* Payment Method */}
                {product.payment_method && (
                  <p
                    className={`inline-block text-[11px] font-medium px-2 py-1 rounded-full mt-2 ${paymentMethod.color}`}
                  >
                    💳 {paymentMethod.text}
                  </p>
                )}

                {/* Color Selection */}
                {colors.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Choose color:
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {colors.map((color, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(color.trim())}
                          className={`w-7 h-7 rounded-full border-2 ${
                            selectedColor === color.trim()
                              ? "border-pink-600 scale-110"
                              : "border-gray-300"
                          } transition-transform`}
                          style={{ backgroundColor: color.trim() }}
                          title={color.trim()}
                        ></button>
                      ))}
                    </div>
                    {selectedColor && (
                      <p className="text-xs text-gray-500 mt-1 italic">
                        Selected: {selectedColor}
                      </p>
                    )}
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mt-4 flex items-center gap-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Quantity:
                  </p>
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                      }
                      className="px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      −
                    </button>
                    <span className="px-4 text-gray-800 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAdd}
                disabled={product.stock <= 0}
                className={`w-full mt-5 py-2 px-4 rounded-lg transition font-semibold ${
                  product.stock <= 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-pink-600 text-white hover:bg-pink-700"
                }`}
              >
                {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-5 border-t border-gray-200 dark:border-gray-700 pt-3">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Description
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description.length > 250
                  ? product.description.slice(0, 250) + "..."
                  : product.description}
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
