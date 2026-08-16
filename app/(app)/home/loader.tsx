export default function Loader() {
  return (
    <div className="container mx-auto p-4">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-base-300" />
        <div className="mt-2 h-4 w-56 animate-pulse rounded bg-base-300" />
      </div>

      {/* Video Card Skeletons */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-xl bg-base-100 shadow-lg"
          >
            {/* Video Preview */}
            <div className="aspect-video w-full animate-pulse bg-base-300" />

            <div className="space-y-4 p-4">
              {/* Title */}
              <div className="h-5 w-3/4 animate-pulse rounded bg-base-300" />

              {/* Description */}
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-base-300" />
                <div className="h-3 w-5/6 animate-pulse rounded bg-base-300" />
              </div>

              {/* Uploaded text */}
              <div className="h-3 w-1/2 animate-pulse rounded bg-base-300" />

              {/* File information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-base-300" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-16 animate-pulse rounded bg-base-300" />
                    <div className="h-3 w-20 animate-pulse rounded bg-base-300" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-base-300" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-16 animate-pulse rounded bg-base-300" />
                    <div className="h-3 w-20 animate-pulse rounded bg-base-300" />
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              <div className="flex items-center justify-between pt-2">
                <div className="h-4 w-28 animate-pulse rounded bg-base-300" />

                <div className="flex gap-2">
                  <div className="h-8 w-8 animate-pulse rounded-lg bg-base-300" />
                  <div className="h-8 w-20 animate-pulse rounded-lg bg-base-300" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
