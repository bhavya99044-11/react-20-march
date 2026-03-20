import Skeleton from "react-loading-skeleton";

export default function CircleSkeleton({ size = 140 }) {
  return (
    <div className="flex justify-center [--skeleton-base:#e5e7eb] [--skeleton-highlight:#f3f4f6] dark:[--skeleton-base:#1f2937] dark:[--skeleton-highlight:#334155]">
      <Skeleton
        width={size}
        height={size}
        circle
        baseColor="var(--skeleton-base)"
        highlightColor="var(--skeleton-highlight)"
      />
    </div>
  );
}
