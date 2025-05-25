import { Link, useParams } from "react-router-dom";
import { trpc } from "../api/trpc";
import Navbar from "../components/Navbar";
import { ShoppingCart, Tag, ChevronLeft, Loader2, AlertTriangle, ImageIcon } from "lucide-react";
import { Button } from "../components/ui/button";

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: product,
    isLoading,
    error,
  } = trpc.product.getProductBySlug.useQuery(slug!, { enabled: !!slug });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
          {" "}
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-10 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-xl text-red-600">Error loading product: {error.message}</p>
          <Button asChild variant="link" className="mt-4">
            <Link to="/">Go back to homepage</Link>
          </Button>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-10 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-xl text-gray-700">Product not found.</p>
          <Button asChild variant="link" className="mt-4">
            <Link to="/">Go back to homepage</Link>
          </Button>
        </div>
      </>
    );
  }

  const displayPrice =
    typeof product.price === "string" ? parseFloat(product.price) : product.price;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Button asChild variant="outline" className="mb-6 text-sm">
          <Link to="/">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </Button>

        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="w-full">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto max-h-[400px] md:max-h-[500px] object-contain rounded-md border border-gray-200"
                />
              ) : (
                <div className="w-full h-auto max-h-[400px] md:max-h-[500px] bg-gray-100 flex items-center justify-center text-gray-400 rounded-md border border-gray-200 aspect-square">
                  <ImageIcon size={64} />
                </div>
              )}
            </div>

            <div>
              <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                {product.brand || "Brand Unspecified"}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 my-2">{product.name}</h1>

              <div className="my-4">
                <span className="text-3xl font-bold text-red-600">
                  US${displayPrice.toFixed(2)}
                </span>
                {product.condition && (
                  <span className="ml-3 inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
                    {product.condition.replace("-", " ")}
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p>
                  <strong className="font-medium text-gray-800">SKU:</strong> {product.sku}
                </p>
                {product.stockQuantity !== null && typeof product.stockQuantity !== "undefined" && (
                  <p>
                    <strong className="font-medium text-gray-800">Availability:</strong>
                    {product.stockQuantity > 0
                      ? `${product.stockQuantity} units in stock`
                      : "Out of Stock"}
                  </p>
                )}
                {product.minimumOrderQuantity && (
                  <p>
                    <strong className="font-medium text-gray-800">Minimum Order:</strong>{" "}
                    {product.minimumOrderQuantity} unit{product.minimumOrderQuantity > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <div className="prose prose-sm max-w-none text-gray-700 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Product Description</h2>
                <p>{product.description || "No description available."}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Inquiry
                </Button>
                <Button size="lg" variant="outline" className="flex-1 dark:text-white">
                  <Tag className="mr-2 h-5 w-5" /> Request Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-200 mt-12">
        © {new Date().getFullYear()} MobileMart. All rights reserved.
      </footer>
    </div>
  );
}
