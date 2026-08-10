import { Skeleton } from "@/components/loaders/Skeleton";

/**
 * Animated pulse placeholder that mirrors the OrderCard layout.
 * Shown while the user's orders are being fetched from Firestore.
 */
function OrderCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-[10px] border border-line bg-surface overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col gap-2.5 border-b border-line px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="space-y-2">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-4 w-52 max-w-full" />
          <Skeleton className="h-3 w-36" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Items */}
      <div className="px-4 py-4 sm:px-5">
        <Skeleton className="mb-3 h-3 w-14" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-start gap-3 py-2.5">
              <Skeleton className="size-12 shrink-0 rounded-[4px] sm:size-14" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-3.5 w-14 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="border-t border-line px-4 py-4 sm:px-5 space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-8" />
        </div>
        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

/**
 * Renders N skeleton cards while orders are loading.
 */
export function OrdersSkeleton({ count = 3 }) {
  return (
    <div
      className="space-y-4"
      aria-busy="true"
      aria-label="Loading your orders"
    >
      {Array.from({ length: count }, (_, i) => (
        <OrderCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default OrdersSkeleton;
