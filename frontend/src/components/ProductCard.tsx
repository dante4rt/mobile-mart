import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { ImageIcon, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayPrice =
    typeof product.price === "string" ? parseFloat(product.price) : product.price;

  return (
    <Card className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out h-full">
      <Link to={`/products/${product.slug}`} className="block overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        ) : (
          <div className="w-full h-48 sm:h-56 bg-gray-100 flex items-center justify-center text-gray-400">
            <ImageIcon size={48} />
          </div>
        )}
      </Link>

      <CardContent className="p-4 flex flex-col flex-grow bg-white">
        <Link to={`/products/${product.slug}`} className="block mb-2 flex-grow">
          <h3
            title={product.name}
            className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2" // Requires @tailwindcss/line-clamp
          >
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto">
          {" "}
          <p className="text-lg font-bold text-red-600 my-1">US${displayPrice.toFixed(2)}</p>
          {product.minimumOrderQuantity && (
            <p className="text-xs text-gray-500 mb-3">
              Min. order: {product.minimumOrderQuantity} piece
              {product.minimumOrderQuantity > 1 ? "s" : ""}
            </p>
          )}
          <p className="text-xs text-gray-500 mb-1">Supplier: {product.brand || "Generic Brand"}</p>
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" /> 4.5/5 (20)
          </div>
          <Button
            asChild
            variant="outline"
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <Link to={`/products/${product.slug}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
