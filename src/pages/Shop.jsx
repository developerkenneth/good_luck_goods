import TopNavbar from "../components/TopNavBar";
import AllProducts from "../components/AllProducts";
import Spinners from "../components/Spinners";
import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";

const Shop = () => {

  // using a context: u have to call the context like this.
  const {filteredProducts, loading} = useContext(ProductContext);

 
  return (
    <>
      {loading ? (
        <Spinners loading={loading} />
      ) : (
        <AllProducts products={filteredProducts} />
      )}
    </>
  );
};

export default Shop;
