import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayPrice =
    typeof product.price === "string" ? parseFloat(product.price) : product.price;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.imageUrl || "https://via.placeholder.com/300x200.png?text=No+Image"}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-md"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
        <Link to={`/products/${product.slug}`}>
          <CardTitle className="text-lg hover:text-blue-600 transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-sm text-gray-600 mt-1">{product.brand}</p>
        <p className="text-xs text-gray-500 capitalize">{product.condition}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-xl font-semibold text-blue-700">${displayPrice.toFixed(2)}</p>
        <Button asChild variant="outline">
          <Link to={`/products/${product.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
