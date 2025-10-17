import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import CheckoutModal from "../components/CheckoutModal";

export default function Cart() {
  const [showModal, setShowModal] = useState(false);

  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useContext(CartContext);

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-800 dark:text-white px-4 py-10 rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-primary font-header">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400 text-lg animate-fade-in">
          Your cart is currently empty 😔
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-transform hover:scale-[1.01]"
              >
                <img
                  src={`http://127.0.0.1:8000/storage/${item.main_image}`}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ₦{Number(item.price).toFixed(2)} each
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.qty - 1)}
                      className="p-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
                      disabled={item.qty <= 1}
                    >
                      <FaMinus size={12} />
                    </button>
                    <input
                      readOnly
                      value={item.qty}
                      className="w-10 text-center bg-transparent border-none"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                      className="p-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 text-xs mt-2"
                  >
                    <FaTrash className="inline mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md space-y-4 h-fit sticky top-20">
            <h2 className="text-xl font-bold mb-2">Order Summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₦{Number(cartTotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <hr className="my-2 border-gray-300 dark:border-gray-600" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₦{cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={clearCart}
              className="w-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white py-3 rounded-lg mt-4 transition-transform hover:scale-105"
            >
              Clear Cart
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-primary hover:bg-pink-600 text-white py-3 rounded-lg mt-2 transition-transform hover:scale-105"
              disabled={cartTotal === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <CheckoutModal
          cartItems={cart}
          subtotal={cartTotal}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
}
