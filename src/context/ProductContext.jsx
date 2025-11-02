import { createContext, useEffect, useState } from "react";
import fetchProducts from "../api/fetch-products.js";
import fetchCategories from "../api/fetchCategories.js";

//  creating the context
export const ProductContext = createContext(null);

// create the global state that receives children as value
function GlobalState({ children }) {
  const [products, setProducts] = useState([]); //creating the product state
  const [loading, setLoading] = useState(true);
  const [catLoading, setCatLoading] = useState(true); //category loading state...

  //creating categories state
  const [categories, setCategories] = useState([]);

  //search function added
  const [searchKey, setSearchKey] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); //looking for selected categories

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data?.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data?.categories || []);
      } catch (e) {
        console.error(e);
      } finally {
        setCatLoading(false);
      }
    }

    loadCategories();
  }, []);

  // filtering the products base on the category and search keyword
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchKey.trim() === "" ||
      product?.name?.toLowerCase().includes(searchKey.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || product?.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        loading,
        searchKey,
        setSearchKey,
        selectedCategory,
        setSelectedCategory,
        filteredProducts,
        categories,
        setCategories
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default GlobalState;
