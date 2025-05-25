import { useParams } from "react-router-dom";
import { trpc } from "../api/trpc";
import Navbar from "../components/Navbar";
import { ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: product,
    isLoading,
    error,
  } = trpc.product.getProductBySlug.useQuery(
    slug!, //
    { enabled: !!slug }
  );

  if (isLoading) return <div className="text-center py-10">Loading product details...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  const displayPrice =
    typeof product.price === "string" ? parseFloat(product.price) : product.price;

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <img
              src={product.imageUrl || "https://via.placeholder.com/600x400.png?text=No+Image"}
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-blue-700 mb-4">${displayPrice.toFixed(2)}</p>
            <div className="mb-4 space-y-1">
              <p className="text-gray-700">
                <strong className="font-medium">Brand:</strong> {product.brand || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium">Condition:</strong>{" "}
                <span className="capitalize">{product.condition || "N/A"}</span>
              </p>
              <p className="text-gray-700">
                <strong className="font-medium">SKU:</strong> {product.sku}
              </p>
              {product.stockQuantity && (
                <p className="text-gray-700">
                  <strong className="font-medium">Stock:</strong> {product.stockQuantity} units
                </p>
              )}
              {product.minimumOrderQuantity && (
                <p className="text-gray-700">
                  <strong className="font-medium">Min. Order:</strong>{" "}
                  {product.minimumOrderQuantity} units
                </p>
              )}
            </div>
            <h2 className="text-xl font-semibold mt-6 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>

            <div className="mt-8">
              <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Inquiry (Concept)
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
