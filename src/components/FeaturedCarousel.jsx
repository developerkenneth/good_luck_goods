import ProductCard from "./ProductCard";

export default function FeaturedCarousel({ products }) {
  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <section className="py-10 px-4 font-p">
      <h2 className="text-2xl font-bold mb-4 text-brand-primary font-header">
        Featured Products
      </h2>

      {hasProducts ? (
        <div className="py-6 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              style={{ scrollSnapAlign: "start" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No products found.</p>
      )}
    </section>
  );
}
