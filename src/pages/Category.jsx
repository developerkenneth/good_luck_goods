import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryHeader from "../components/CategoryHeader";
import AllProducts from "../components/AllProducts";
import Spinners from "../components/Spinners";
import GlobalState, { ProductContext } from "../context/ProductContext";
import SEO from "../components/SEO";

export default function Category() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchCategoryDetails() {
      const url = `https://admin.shop.goodlucks.co/api/category/${slug}`;
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
      <SEO
        title="Shop by Categories – Goodlucks Goods"
        description="Browse all product categories including phones, electronics, fashion, and more. Find quality items at the best prices in Ghana."
        keywords="categories, product categories, online shopping Ghana, goodlucks goods"
        url="https://shop.goodlucks.co/categories"
      />

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
