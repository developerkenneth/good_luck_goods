import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaThLarge,
  FaShoppingCart,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext"; // ✅ import context

export default function MobileBottomNav() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // ✅ Get cart count
  const { cartCount } = useContext(CartContext);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const navItems = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/shop", label: "Shop", icon: <FaThLarge /> },
    { to: "/cart", label: "Cart", icon: <FaShoppingCart /> },
    { to: "/contact", label: "Contact", icon: <FaPhone /> },
  ];

  return (
    <>
      <div className="font-p fixed bottom-0 left-0 right-0 z-50 bg-light dark:bg-dark border-t border-gray-200 dark:border-gray-700 lg:hidden">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center text-xs gap-1 transition-colors duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary"
                }`
              }
            >
              {/* ✅ Cart count badge */}
              {label === "Cart" && cartCount > 0 && (
                <span className="absolute -top-1 right-3 bg-red-600 text-white text-[10px] px-[5px] py-[2px] rounded-full">
                  {cartCount}
                </span>
              )}

              <span className="text-xl">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="fixed bottom-1/2 right-4 z-50 lg:hidden">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md w-full mb-3"
        >
          <span className="text-xl">{darkMode ? <FaSun /> : <FaMoon />}</span>
        </button>
      </div>
    </>
  );
}
