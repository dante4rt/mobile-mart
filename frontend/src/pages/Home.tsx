// frontend/src/pages/Home.tsx
import ProductGrid from "../components/ProductGrid";
import { trpc } from "../api/trpc";
import Navbar from "../components/Navbar";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: products, isLoading, error } = trpc.product.getProducts.useQuery();

  return (
    <div className="min-h-screen bg-gray-50">
      {" "}
      <Navbar />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Used Mobile Phones</h1>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="ml-3 text-gray-600">Loading products...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-10 px-4">
            <p className="text-red-600 bg-red-100 p-4 rounded-md">
              Error loading products: {error.message}
            </p>
          </div>
        )}
        {!isLoading && !error && (!products || products.length === 0) && (
          <div className="text-center py-10 text-gray-500">No products found.</div>
        )}
        {!isLoading && !error && products && products.length > 0 && (
          <ProductGrid products={products} />
        )}
      </main>
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-200 mt-12">
        © {new Date().getFullYear()} MobileMart. All rights reserved.
      </footer>
    </div>
  );
}
