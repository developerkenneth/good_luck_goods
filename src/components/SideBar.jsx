import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBars,
  FaMoon,
  FaSun,
  FaThLarge,
  FaShoppingCart,
  FaPhone,
} from "react-icons/fa";
import { CartContext } from "../context/CartContext"; // ✅ import the Cart Context

const SideBar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const { cartCount } = useContext(CartContext); // ✅ get live cart count

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

  const [isExpanded, setIsExpanded] = useState(true);
  const toggleSidebar = () => setIsExpanded((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`${
          isExpanded ? "w-64" : "w-20"
        } bg-white dark:bg-gray-800 shadow-md transition-all duration-300 hidden lg:flex lg:flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-light dark:border-gray-700">
          {isExpanded && <h1 className="font-bold text-lg font-header">Goodlucks<span className="text-primary">.com</span><span className="text-accent">.gh</span></h1>}
          <button onClick={toggleSidebar} className="text-xl text-dark cursor-pointer dark:text-light">
            <FaBars />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 mt-4 space-y-1 font-p">
          <SidebarLink to="/" icon={<FaHome />} label="Home" isExpanded={isExpanded} />
          <SidebarLink to="/shop" icon={<FaThLarge />} label="Shop" isExpanded={isExpanded} />

          {/* 🛒 Cart Link with Badge */}
          <SidebarLink
            to="/cart"
            icon={
              <div className="relative">
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold
                    px-1.5 py-[1px] rounded-full shadow-md"
                  >
                    {cartCount}
                  </span>
                )}
              </div>
            }
            label="Cart"
            isExpanded={isExpanded}
          />

          <SidebarLink to="/contact" icon={<FaPhone />} label="Contact" isExpanded={isExpanded} />

          {/* User + Theme */}
          <div className="px-4 py-3 border-t border-light dark:border-gray-700">
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md w-full mb-3"
            >
              <span className="text-xl">{darkMode ? <FaSun /> : <FaMoon />}</span>
              {isExpanded && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

function SidebarLink({ to, icon, label, isExpanded }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 hover:bg-pink-100 dark:hover:bg-gray-700 transition-colors ${
          isActive ? "bg-pink-200 text-primary dark:bg-gray-700 font-semibold" : ""
        }`
      }
      title={!isExpanded ? label : ""}
    >
      <span className="text-xl relative">{icon}</span>
      {isExpanded && <span className="text-sm">{label}</span>}
    </NavLink>
  );
}

export default SideBar;
