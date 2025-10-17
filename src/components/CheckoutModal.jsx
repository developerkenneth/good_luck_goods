import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CheckoutModal({ cartItems, subtotal, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [confirmClose, setConfirmClose] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("checkoutUser");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  // Save user data when it changes
  useEffect(() => {
    localStorage.setItem("checkoutUser", JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const saved = localStorage.getItem("checkoutUser");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("checkoutUser", JSON.stringify(form));
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `🛒 *New Order Received* \n\n` +
        `👤 *Name:* ${form.name}\n📧 *Email:* ${form.email}\n📞 *Phone:* ${form.phone}\n🏠 *Address:* ${form.address}\n\n` +
        `🛍️ *Order Details:*\n${cartItems
          .map(
            (item) =>
              `• ${item.name} - ${item.qty} × ₦${Number(item.price).toFixed(
                2
              )} = ₦${(Number(item.price) * item.qty).toFixed(2)}`
          )
          .join("\n")}\n\n💰 *Total:* ₦${subtotal.toFixed(2)}`
    );

    const whatsappNumber = "2348012345678"; // your number
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappLink, "_blank");
  };

  const handleClose = () => {
    if (
      form.name ||
      form.email ||
      form.phone ||
      form.address ||
      cartItems.length > 0
    ) {
      setConfirmClose(true);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg p-8"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold text-center text-primary mb-6 font-header">
            🛍️ Checkout Information
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <textarea
                name="address"
                placeholder="Delivery Address"
                value={form.address}
                onChange={handleChange}
                required
                rows={3}
                className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              ></textarea>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-xl dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition-all"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl transition-all shadow-md"
              >
                Send via WhatsApp
              </button>
            </div>
          </form>

          {/* Confirm Close Popup */}
          {confirmClose && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-3xl">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl text-center shadow-lg w-11/12 max-w-sm">
                <p className="text-gray-800 dark:text-white mb-4 font-medium">
                  Are you sure you want to close? Your entered data will be
                  saved for next time.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setConfirmClose(false)}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg"
                  >
                    Confirm Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
