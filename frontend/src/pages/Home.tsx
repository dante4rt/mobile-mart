import { trpc } from "../api/trpc";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  const { data: products, isLoading, error } = trpc.product.getProducts.useQuery();

  if (isLoading) return <div className="text-center py-10">Loading products...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">Error loading products: {error.message}</div>
    );
  if (!products || products.length === 0)
    return <div className="text-center py-10">No products found.</div>;

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Used Mobile Phones</h1>
        <ProductGrid products={products} />
      </main>
    </div>
  );
}
