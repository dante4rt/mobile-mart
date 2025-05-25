import { useState, useMemo, useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import { trpc } from "../api/trpc";
import Navbar from "../components/Navbar";
import type { AppliedFilters, FilterOptions } from "../components/FilterSidebar";
import { Loader2, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import FilterSidebar from "../components/FilterSidebar";

const initialFilters: AppliedFilters = {
  brands: [],
  conditions: [],
  minPrice: "",
  maxPrice: "",
};

export default function Home() {
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>(initialFilters);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const { data: filterOptionsData, isLoading: isLoadingOptions } =
    trpc.product.getFilterOptions.useQuery(undefined, {
      staleTime: 1000 * 60 * 5,
    });

  const availableOptions: FilterOptions = useMemo(
    () => ({
      brands: filterOptionsData?.brands || [],
      conditions: filterOptionsData?.conditions || [],
    }),
    [filterOptionsData]
  );

  const apiFilters = useMemo(() => {
    return {
      brands: appliedFilters.brands.length > 0 ? appliedFilters.brands : undefined,
      conditions: appliedFilters.conditions.length > 0 ? appliedFilters.conditions : undefined,
      minPrice: appliedFilters.minPrice ? parseFloat(appliedFilters.minPrice) : undefined,
      maxPrice: appliedFilters.maxPrice ? parseFloat(appliedFilters.maxPrice) : undefined,
    };
  }, [appliedFilters]);

  const {
    data: products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = trpc.product.getProducts.useQuery(apiFilters);

  const handleFilterChange = (newFilters: AppliedFilters) => {
    setAppliedFilters(newFilters);
  };

  const handleClearFilters = () => {
    setAppliedFilters(initialFilters);
  };

  useEffect(() => {
    if (isMobileFiltersOpen) {
      setIsMobileFiltersOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">Used Mobile Phones</h1>
          <div className="md:hidden">
            <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[360px] p-0 overflow-y-auto">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <FilterSidebar
                  availableOptions={availableOptions}
                  appliedFilters={appliedFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  className="shadow-none border-none rounded-none"
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-2">
            {isLoadingOptions ? (
              <div className="p-4 bg-card rounded-lg shadow space-y-4 animate-pulse">
                <div className="h-8 bg-muted rounded w-1/2" />
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="h-6 bg-muted rounded w-full" />
                <div className="h-6 bg-muted rounded w-2/3" />
                <div className="h-6 bg-muted rounded w-full" />
              </div>
            ) : (
              <FilterSidebar
                availableOptions={availableOptions}
                appliedFilters={appliedFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            )}
          </div>

          <div className="md:col-span-9 lg:col-span-9 xl:col-span-10">
            {isLoadingProducts && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="ml-3 text-muted-foreground">Loading products...</p>
              </div>
            )}
            {productsError && (
              <div className="text-center py-10 px-4">
                <p className="text-destructive bg-destructive/10 p-4 rounded-md">
                  Error loading products: {productsError.message}
                </p>
              </div>
            )}
            {!isLoadingProducts && !productsError && (!products || products.length === 0) && (
              <div className="text-center py-10 text-muted-foreground">
                No products match your filters. Try adjusting them!
              </div>
            )}
            {!isLoadingProducts && !productsError && products && products.length > 0 && (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </main>
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-200 mt-12">
        © {new Date().getFullYear()} MobileMart. All rights reserved.
      </footer>
    </div>
  );
}
