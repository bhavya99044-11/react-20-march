import Skeleton from "react-loading-skeleton";

export default function ChartSkeleton({ height = 130 }) {
  return (
    <div className="w-full [--skeleton-base:#e5e7eb] [--skeleton-highlight:#f3f4f6] dark:[--skeleton-base:#1f2937] dark:[--skeleton-highlight:#334155]">
      <Skeleton
        height={height}
        borderRadius={12}
        baseColor="var(--skeleton-base)"
        highlightColor="var(--skeleton-highlight)"
      />
    </div>
  );
}
