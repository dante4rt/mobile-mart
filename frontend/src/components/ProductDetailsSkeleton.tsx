import { Skeleton } from "../components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Skeleton className="h-6 w-40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Skeleton className="w-full aspect-square max-h-[500px] rounded-lg" />
        </div>

        <div className="flex flex-col space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/3" />

          <div className="space-y-2 py-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="space-y-2 py-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-24 w-full" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
