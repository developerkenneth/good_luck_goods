import { useState, useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import Spinners from "../components/Spinners";

export default function ShowCats() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://admin.shop.goodlucks.co/api/categories"
        );
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

  // Skeleton loader component
  const Skeleton = () => (
    <div className="animate-pulse flex flex-col items-center gap-2">
      <div className="bg-gray-200  dark:bg-gray-700"></div>
      <div className="bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Shop by Category
      </h2>


 {!loading
          ? 
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
       { categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
      </div>
         
          : <Spinners loading={loading}/>}
      
    </div>
  );
}
