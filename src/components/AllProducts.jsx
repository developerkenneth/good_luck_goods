import ProductCard from "./ProductCard";

const AllProducts = ({products}) => {
  return (
    <>
      <section className="py-10">
        <h2 className="text-2xl font-bold mb-4 text-brand-primary font-header">
            Products
        </h2>

        <div className="py-6 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4  gap-3 font-p">
          {products.map((product) => (
            <div
              key={product.id}
              className=""
              style={{
                scrollSnapAlign: "start",
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AllProducts;
