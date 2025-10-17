import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTshirt,
  FaLaptop,
  FaCouch,
  FaMobileAlt,
  FaShoePrints,
  FaBoxOpen,
} from "react-icons/fa";

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/categories");
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Default fallback icons
  const defaultIcons = {
    fashion: <FaTshirt />,
    electronics: <FaLaptop />,
    furniture: <FaCouch />,
    mobiles: <FaMobileAlt />,
    sports: <FaShoePrints />,
    default: <FaBoxOpen />,
  };

  // Skeleton loader component
  const Skeleton = () => (
    <div className="animate-pulse flex flex-col items-center gap-2">
      <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );

  return (
    <section className="font-p py-10 px-6 bg-light dark:bg-dark rounded-lg">
      <h2 className="font-header text-2xl font-bold mb-6 text-primary">
        Shop by Category
      </h2>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 italic">
          No categories found.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
          {categories.map((cat) => {
            const icon =
              defaultIcons[cat.name?.toLowerCase()] || defaultIcons.default;

            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug || cat.name?.toLowerCase()}`}
                className="flex flex-col items-center gap-2 text-sm font-medium text-gray-700 dark:text-white hover:text-primary transition"
              >
                <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700 group hover:shadow-lg transition-all duration-300">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-3xl text-gray-400 group-hover:text-primary transition-colors duration-300">
                      {icon}
                    </div>
                  )}
                </div>
                <span className="font-semibold">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
