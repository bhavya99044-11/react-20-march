import React from "react";
import Skeleton from "react-loading-skeleton";

const InboxListSkeleton = ({ rows = 12 }) => {
  return (
    <div className="border-r border-[var(--color-border-light)] dark:border-slate-700 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={`inbox-skeleton-${index}`}
          className="flex items-center justify-between px-5 py-5 border-b border-[var(--color-border-light)] dark:border-slate-800"
        >
          <div className="flex items-center">
            <Skeleton width={16} height={16} />
            <div className="">
              <Skeleton className="ml-6" width={16} height={16} />
            </div>
            <Skeleton width={104} className="ml-[30px] mr-10" height={19} />
            <Skeleton width={60} height={19} className="rounded-full" />
            <Skeleton width={570} className="ml-5 flex-1" height={19} />
          </div>
          <Skeleton width={55} className="mr-5" height={19} />
        </div>
      ))}
    </div>
  );
};

export default InboxListSkeleton;

