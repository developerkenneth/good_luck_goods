import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CategoryCard = ({ category }) => {
  return (
    <div
      className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-[1.03] cursor-pointer"
    >
      {/* Category Image */}
      <img
        src={
          category.image
            ? `https://goodlucks.emethsoftwares.com.ng/storage/${category.image}`
            : "/placeholder.jpg"
        }
        alt={category.name}
        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700"></div>

      {/* Category Name */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-center">
        <h3 className="text-white text-xl font-semibold tracking-wide mb-2 group-hover:text-primary transition-colors duration-300">
          {category.name}
        </h3>

        {/* View Button */}
        <Link
          to={`/category/${category.slug}`}
          className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm hover:bg-pink-600 shadow-md"
        >
          View Products <FaArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
