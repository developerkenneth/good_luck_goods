import React, { useState, useRef, useEffect, useContext } from "react";
import { ChevronDown, Tags } from "lucide-react";
import { ProductContext } from "../context/ProductContext";

export default function CategoryHeader({ category, subCategories = [] }) {

  const [selectedSub, setSelectedSub] = useState({ id: "all", name: "All"});
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { products, setProducts } = useContext(ProductContext);
  const prevProducts = [...products] ;


  useEffect(() => {
    function handleSubCatFiltered() {

      if(selectedSub.id !== "all"){
        const filteredProducts =  products.map( (product) =>{
            if(product.subcategory_id == selectedSub.id) return product;
        })

        setProducts(filteredProducts);
      }else{
          setProducts(prevProducts);
      }
       
    }

    handleSubCatFiltered();
  }, [selectedSub]);

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative w-full bg-gradient-to-r from-pink-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 text-white py-12 px-6 rounded-b-3xl shadow-md mb-8 transition-colors duration-300">
      {/* Subtle overlay for better readability */}
      <div className="absolute inset-0 bg-black/20 rounded-b-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold capitalize">
            {category?.name || "Category"}
          </h1>
          <p className="text-white/80 dark:text-gray-300 mt-1">
            Explore the best products under {category?.name || "this category"}.
          </p>
        </div>

        {/* Dropdown for Subcategories */}
        {subCategories.length > 0 && (
          <div ref={dropdownRef} className="relative w-60">
            {/* Label */}
            <div className="flex items-center gap-2 mb-2 text-sm text-white/90 dark:text-gray-300">
              <Tags className="w-4 h-4" />
              <span>Select Sub-Category</span>
            </div>

            {/* Dropdown button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between w-full bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 px-4 py-2 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <span>{selectedSub.name}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown list */}
            {open && (
              <ul className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 max-h-60 overflow-y-auto">
                <li
                  className="px-4 py-2 hover:bg-pink-50 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-100"
                  onClick={() => {
                    setSelectedSub({id:"all", name: "All"});
                    setOpen(false);
                  }}
                >
                  All
                </li>
                {subCategories.map((sub) => (
                  <li
                    key={sub.id}
                    className="px-4 py-2 hover:bg-pink-50 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-100"
                    onClick={() => {
                      setSelectedSub({id:sub.id, name : sub.name});
                      setOpen(false);
                    }}
                  >
                    {sub.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
