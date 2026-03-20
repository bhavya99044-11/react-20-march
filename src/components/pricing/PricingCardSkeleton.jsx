import React from "react";
import Skeleton from "react-loading-skeleton";

const featureWidths = [220, 220, 220, 220, 220, 220, 220];

const PricingCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-[24px] h-[calc(100vh-23.2vh)] overflow-y-auto no-scrollbar bg-white text-[color:var(--color-text-body)] shadow-lg dark:border dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 [--base-color:#E5E7EB] [--highlight-color:#F3F4F6] dark:[--base-color:#1F2937] dark:[--highlight-color:#334155]">
      <div className="mt-10 mb-10 flex flex-col items-center text-center">
        <Skeleton width={128} height={31} />
        <div className="mt-[10px]">
          <Skeleton width={116} height={22} />
        </div>
        <div className="mt-[10px]">
          <Skeleton width={140} height={63} />
        </div>
      </div>

      <div className="mx-4 min-h-[2px] bg-[color:var(--color-border-light)]" />

      <div className="flex flex-1 flex-col items-center gap-[15px] pt-10">
        {featureWidths.map((width, index) => (
          <Skeleton key={index} width={width} height={28} borderRadius={12} />
        ))}
      </div>

      <div className="mx-4 mt-[39px] min-h-[2px] bg-[color:var(--color-border-light)]" />

      <div className="mt-6 pb-4 flex w-full flex-col items-center">
        <Skeleton width={180} height={60} borderRadius={999} />
        <div className="mt-6">
          <Skeleton width={210} height={22} />
        </div>
      </div>
    </div>
    
  );
};

export default PricingCardSkeleton;
