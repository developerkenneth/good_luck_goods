// Product Image Gallery Component
import { useState } from "react";
import { FaExpand } from "react-icons/fa";

const ProductGallery = ({ images }) => {
  const [current, setCurrent] = useState(images[0]);
  const [showFullscreen, setShowFullscreen] = useState(false);

  return (
    <>
      {/* MAIN IMAGE */}
      <div
        className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg cursor-zoom-in"
        onClick={() => setShowFullscreen(true)}
      >
        <img
          src={`https://admin.shop.goodlucks.co/storage/${current}`}
          alt="Product"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <FaExpand className="absolute top-4 right-4 text-white bg-black/40 p-2 rounded-full text-lg" />
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={`https://admin.shop.goodlucks.co/storage/${img}`}
            onClick={() => setCurrent(img)}
            className={`h-20 w-full object-cover rounded-lg cursor-pointer border-2 
            ${current === img ? "border-pink-500" : "border-transparent"}`}
          />
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {showFullscreen && (
        <div
          onClick={() => setShowFullscreen(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-zoom-out"
        >
          <img
            src={`https://goodlucks.emethsoftwares.com.ng/storage/${current}`}
            className="max-h-[90%] max-w-[90%] rounded-xl object-contain"
          />
        </div>
      )}
    </>
  );
};

export default ProductGallery;
