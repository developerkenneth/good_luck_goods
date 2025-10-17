import TopNavbar from "../components/TopNavBar";
import Hero from "../components/Hero";
import FeaturedCarousel from "../components/FeaturedCarousel";
import CategoryGrid from "../components/CategoryGrid";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Spinners from "../components/Spinners";

const Home = () => {
  const { filteredProducts, loading } = useContext(ProductContext); //get the products

  return (
    <>
      <Hero />

      {loading ? (
        <Spinners loading={loading} />
      ) : (
        <FeaturedCarousel products={filteredProducts.filter(p => p.featured)} />
      )}
      <CategoryGrid />
    </>
  );
};

export default Home;
