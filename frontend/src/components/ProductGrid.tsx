import type { Product } from "../types/product";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={product.imageUrl || "https://via.placeholder.com/300x200.png?text=No+Image"}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">
                ${" "}
                {(
                  (typeof product.price === "number"
                    ? product.price
                    : parseFloat(product.price)) as number
                ).toFixed(2)}
              </span>
              <a href={`/products/${product.slug}`} className="text-blue-500 hover:underline">
                View Details
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
