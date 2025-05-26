import { useState, useMemo, useEffect } from "react";
import ProductGrid, { ProductGridSkeleton } from "../components/ProductGrid";
import { trpc } from "../api/trpc";
import Navbar from "../components/Navbar";
import type { AppliedFilters, FilterOptions } from "../components/FilterSidebar";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import FilterSidebar from "../components/FilterSidebar";
import { PaginationControls } from "../components/PaginationControls";
import { FilterSidebarSkeleton } from "../components/FilterSidebarSkeleton";
import { useSearch } from "../context/SearchContext";

const initialFilters: AppliedFilters = {
  brands: [],
  conditions: [],
  minPrice: "",
  maxPrice: "",
};

export default function Home() {
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>(initialFilters);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchQuery, setSearchQuery } = useSearch();
  const itemsPerPage = 8;

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
      search: searchQuery || undefined,
      page: currentPage,
      limit: itemsPerPage,
    };
  }, [appliedFilters, currentPage, searchQuery]);

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError,
  } = trpc.product.getProducts.useQuery(apiFilters);

  const handleFilterChange = (newFilters: AppliedFilters) => {
    setAppliedFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setAppliedFilters(initialFilters);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (isMobileFiltersOpen) {
      setIsMobileFiltersOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const products = productsData?.products || [];
  const pagination = productsData?.pagination;

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
            Used Mobile Phones
            {searchQuery && (
              <span className="ml-2 text-base font-normal text-gray-600 dark:text-gray-400">
                Search results for "{searchQuery}"
              </span>
            )}
          </h1>
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
                {isLoadingOptions ? (
                  <FilterSidebarSkeleton />
                ) : (
                  <FilterSidebar
                    availableOptions={availableOptions}
                    appliedFilters={appliedFilters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                    className="shadow-none border-none rounded-none"
                  />
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-2">
            {isLoadingOptions ? (
              <FilterSidebarSkeleton />
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
            {searchQuery && (
              <div className="mb-4 flex items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Showing results for "{searchQuery}"
                </span>
                <Button
                  variant="link"
                  className="text-sm ml-2 text-blue-600 dark:text-blue-400"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              </div>
            )}
            {isLoadingProducts && <ProductGridSkeleton />}
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
              <>
                <ProductGrid products={products} />

                {pagination && pagination.totalPages > 1 && (
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <footer className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-12">
        © {new Date().getFullYear()} MobileMart. All rights reserved.
      </footer>
    </div>
  );
}
