import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowLeft, FaShoppingCart, FaCheck } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import CommentsSection from "../components/CommentsSection";
import CheckoutModal from "../components/CheckoutModal";
import ProductModal from "../components/ProductModal";
import ProductRatingSummary from "../components/ProductRatingSummary";


const Product = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showProductModal, setShowProductModal] =useState(false);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/products/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium animate-pulse">Loading...</p>
      </div>
    );

  if (!product)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg font-medium">Product not found 😞</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 px-5 py-2 bg-primary text-white rounded-lg hover:bg-pink-600"
        >
          Go Back
        </button>
      </div>
    );

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  const images = [product.main_image, product.image2, product.image3].filter(Boolean);


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-primary dark:text-gray-300 mb-6"
      >
        <FaArrowLeft /> <span>Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Slider */}
        <div className="w-full">
          <Slider {...settings} className="rounded-2xl overflow-hidden shadow-lg">
            {images.map((img, index) => (
              <div key={index}>
                <img
                  src={`http://127.0.0.1:8000/storage/${img}`}
                  alt={product.name}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Product Details */}
        <div className="space-y-5">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {product.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">{product.category?.name}</p>
          <p className="text-xl font-semibold text-pink-600">
            ₦{Number(product.price).toLocaleString()}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>

          {product.stock > 0 ? (
            <p className="text-green-600 font-medium">
              In stock ({product.stock} available)
            </p>
          ) : (
            <p className="text-red-500 font-medium">Out of stock</p>
          )}

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setShowProductModal(true)}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-all"
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
            >
              <FaCheck /> Place Order on Whatsapp
            </button>
          </div>
        </div>
      </div>

{/* rating section */}

      {/* comments */}

        <CommentsSection productId={product.id} />

        {/* product modal */}

        {/* Use modal component */}
              {showProductModal && (
                <ProductModal
                  product={product}
                  onClose={() => setShowProductModal(false)}
                  onAddToCart={addToCart}
                />
              )}
      {/* Checkout Modal */}
      {showModal && <CheckoutModal 
      onClose={()=>setShowModal(false)} 
      cartItems={[product]}
      subtotal={Number(product.price)}
      isSingle={true}
 />}


    </div>
  );
};


export default Product;
