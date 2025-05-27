import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { ImageIcon, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface ProductCardProps {
  product: Product;
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 h-full">
      <div className="w-full">
        <Skeleton className="w-full h-48 sm:h-56" />
      </div>

      <CardContent className="p-4 flex flex-col flex-grow bg-white dark:bg-black">
        <div className="block mb-2 flex-grow">
          <Skeleton className="h-5 w-full mb-1" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        <div className="mt-auto">
          <Skeleton className="h-7 w-1/2 my-1" />
          <Skeleton className="h-4 w-2/3 mb-3" />
          <Skeleton className="h-4 w-4/5 mb-1" />
          <Skeleton className="h-4 w-1/3 mb-3" />
          <Skeleton className="h-9 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayPrice =
    typeof product.price === "string" ? parseFloat(product.price) : product.price;

  return (
    <Card className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 ease-in-out h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-[420px] sm:min-h-[440px]">
      <Link to={`/products/${product.slug}`} className="block overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out rounded-t-lg sm:rounded-t-xl"
          />
        ) : (
          <div className="w-full h-48 sm:h-56 bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-400 dark:text-gray-500 rounded-t-lg sm:rounded-t-xl">
            <ImageIcon size={48} />
          </div>
        )}
      </Link>

      <CardContent className="p-4 flex flex-col flex-grow bg-white dark:bg-gray-900">
        <Link to={`/products/${product.slug}`} className="block mb-2 flex-grow">
          <h3
            title={product.name}
            className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2"
          >
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto">
          <p className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400 my-1">
            US${displayPrice.toFixed(2)}
          </p>
          {product.minimumOrderQuantity && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
              Min. order: {product.minimumOrderQuantity} piece
              {product.minimumOrderQuantity > 1 ? "s" : ""}
            </p>
          )}
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
            Supplier: {product.brand || "Generic Brand"}
          </p>
          <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" /> 4.5/5 (20)
          </div>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 transition-colors custom-hover !rounded-xl !py-3 !text-base sm:!text-lg"
          >
            <Link to={`/products/${product.slug}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
