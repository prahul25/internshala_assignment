export default function Loading() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="skeleton h-10 w-full max-w-md rounded-lg" />
        <div className="flex items-center gap-2 ml-auto">
          <div className="skeleton h-10 w-[100px] rounded-lg" />
        </div>
      </div>

      <div className="flex gap-6 lg:gap-8">
        <div className="hidden lg:block w-72 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-surface rounded-lg border border-border p-4 space-y-3">
              <div className="skeleton h-4 w-20 rounded" />
              <div className="skeleton h-8 w-full rounded-md" />
            </div>
          ))}
        </div>

        <div className="flex-1 min-w-0 space-y-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-surface rounded-xl border border-border p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <div className="skeleton w-11 h-11 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2.5">
            <div className="skeleton h-4 w-3/5 rounded" />
            <div className="skeleton h-3.5 w-2/5 rounded" />
            <div className="skeleton h-3 w-1/4 rounded" />
          </div>
        </div>
        <div className="skeleton h-5 w-16 rounded" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-24 rounded-full" />
        <div className="skeleton h-6 w-28 rounded-full" />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <div className="skeleton h-5 w-24 rounded" />
      </div>

      <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
        <div className="skeleton h-3.5 w-20 rounded" />
        <div className="skeleton h-4 w-20 rounded" />
      </div>
    </div>
  );
}
