import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryHeader from "../components/CategoryHeader";
import AllProducts from "../components/AllProducts";
import Spinners from "../components/Spinners";
import GlobalState, { ProductContext } from "../context/ProductContext";


export default function Category() {
  const { slug } = useParams();
  const {products, setProducts} = useContext(ProductContext);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchCategoryDetails(params) {
      const url = `http://127.0.0.1:8000/api/category/${slug}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error status ${res.status}`);
        const result = await res.json();
        // set category
        setCategory(result.data.category);
        setProducts(result.data.products);
        setSubCategories(result.data.subcategories);
      } catch (e) {
        console.error(`oops an error occured. ${e}`);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryDetails();
  }, []);

  return (
    <>
      {/* category header */}
      <CategoryHeader category={category} subCategories={subCategories} />

      {loading ? (
        <Spinners loading={loading} />
      ) : (
        <AllProducts products={products} />
      )}
    </>
  );
}
