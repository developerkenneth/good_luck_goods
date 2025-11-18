import TopNavbar from "../components/TopNavBar";
import AllProducts from "../components/AllProducts";
import Spinners from "../components/Spinners";
import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";
import SEO from "../components/SEO";

const Shop = () => {
  // using a context: u have to call the context like this.
  const { filteredProducts, loading } = useContext(ProductContext);

  return (
    <>
      <SEO
        title="Shop All Products"
        description="Explore all products available at Goodluck Goods, including smartphones, gadgets, electronics, and more. Fast delivery across Ghana."
        keywords="shop, products, online store Ghana, electronics, phones"
        url="https://shop.goodlucks.co/shop"
      />

      {loading ? (
        <Spinners loading={loading} />
      ) : (
        <AllProducts products={filteredProducts} />
      )}
    </>
  );
};

export default Shop;
