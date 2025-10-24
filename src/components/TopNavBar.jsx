import { useContext, useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import { ProductContext } from "../context/ProductContext";

export default function TopNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    searchKey,
    setSearchKey,
    setSelectedCategory,
    categories,
    catLoading,
  } = useContext(ProductContext);



  const handleSearch = (e) => {
    setSearchKey(e.target.value);
    console.log("Searching:", e.target.value);
  };

  return (
    <nav className="w-full font-p bg-white dark:dark:bg-gray-800 border-b rounded-md border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 mb-4">
        {/* Logo */}
        <div className="text-xl font-bold text-brand-primary">
          <img className="w-32 h-10" src={logo} alt="Good luck shop logo" />
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:flex">
          <div className="flex items-center w-full bg-brand-light dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
            <input
              id="search-input"
              type="search"
              placeholder="Search products..."
              value={searchKey}
              onChange={handleSearch}
              className="w-full bg-transparent px-4 py-2 text-sm text-gray-700 dark:text-white focus:outline-none"
            />
            <button
              id="search-btn"
              className="px-4 text-brand-primary cursor-pointer"
              onClick={() => console.log("Search button clicked:", searchKey)}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-white hover:text-brand-primary"
            disabled={catLoading} // disable while loading
          >
            {catLoading ? "Loading..." : "Categories"}{" "}
            <FaChevronDown className="text-xs" />
          </button>

          {/* Dropdown only when categories are loaded */}
          {isOpen && !catLoading && categories.length > 0 && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    className="px-4 py-2 hover:bg-brand-light dark:hover:bg-brand-dark/70 cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsOpen(false);
                    }}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Show "No categories" if done loading but empty */}
          {isOpen && !catLoading && categories.length === 0 && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50 p-2 text-sm text-gray-500">
              No categories found
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-3 md:hidden">
        <div className="flex items-center bg-brand-light dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <input
            type="text"
            placeholder="Search products..."
            value={searchKey}
            onChange={handleSearch}
            className="w-full bg-transparent px-4 py-2 text-sm text-gray-700 dark:text-white focus:outline-none"
          />
          <button
            className="px-4 text-brand-primary"
            onClick={() => console.log("Mobile search clicked:", searchKey)}
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </nav>
  );
}
