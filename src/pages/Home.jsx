import Hero from "../components/Hero";
import FeaturedCarousel from "../components/FeaturedCarousel";
import Footer from "../components/Footer";
import CategoryGrid from "../components/CategoryGrid";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Spinners from "../components/Spinners";
import SEO from "../components/SEO";

const Home = () => {
  const { filteredProducts, loading } = useContext(ProductContext); //get the products

  return (
    <>
      <SEO
        title="Affordable Quality Products in Ghana"
        description="Explore all products available at Goodluck Goods, including smartphones, gadgets, electronics, and more. Fast delivery across Ghana."
        keywords="shop, products, online store Ghana, electronics, phones, Accra"
        url="https://shop.goodlucks.co"
      />
      <Hero />

      {loading ? (
        <Spinners loading={loading} />
      ) : (
        <FeaturedCarousel
          products={filteredProducts.filter((p) => p.featured)}
        />
      )}
      <CategoryGrid />

      <Footer />
    </>
  );
};

export default Home;
