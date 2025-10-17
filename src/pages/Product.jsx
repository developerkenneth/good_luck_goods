import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowLeft, FaShoppingCart, FaCheck } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import CommentsSection from "../components/CommentsSection";

const Product = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  // Modal close confirmation
  const closeModal = () => {
    if (confirm("Are you sure you want to close this form?")) {
      setShowModal(false);
    }
  };

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
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-all"
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
            >
              <FaCheck /> Checkout
            </button>
          </div>
        </div>
      </div>

      {/* comments */}

        <CommentsSection productId={product.id} />
      {/* Checkout Modal */}
      {showModal && <CheckoutModal onClose={closeModal} product={product} />}


    </div>
  );
};

// 🧾 Modal Component
const CheckoutModal = ({ onClose, product }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `Hello! I want to order the following:\n\n🛍️ *Product:* ${product.name}\n💰 *Price:* ₦${Number(product.price).toLocaleString()}\n📦 *Quantity:* 1\n\n📋 *Customer Info:*\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAddress: ${formData.address}`;

    const whatsappLink = `https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          Checkout Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary"
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary"
          ></textarea>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <FaCheck /> Confirm & Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
