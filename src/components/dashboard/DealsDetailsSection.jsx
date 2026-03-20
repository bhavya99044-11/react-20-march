import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Select } from "@/components/common";
import Table from "@/components/dashboard/Table";

const TableSkeleton = ({ columns = 4, rows = 4 }) => {
  const safeColumns = Math.max(columns, 1);
  const safeRows = Math.max(rows, 1);
  const headerCells = useMemo(
    () => Array.from({ length: safeColumns }),
    [safeColumns]
  );
  const bodyRows = useMemo(
    () => Array.from({ length: safeRows }),
    [safeRows]
  );

  return (
    <div className="w-full bg-white dark:bg-slate-900 [--skeleton-base:#e5e7eb] [--skeleton-highlight:#f3f4f6] dark:[--skeleton-base:#1f2937] dark:[--skeleton-highlight:#334155]">
      <div
        className="grid bg-header-gray rounded-xl px-6 pt-4 pb-[13px] dark:bg-slate-800"
        style={{ gridTemplateColumns: `repeat(${safeColumns}, minmax(0, 1fr))` }}
      >
        {headerCells.map((_, index) => (
          <Skeleton
            key={`header-${index}`}
            height={14}
            width={93}
            borderRadius={6}
            baseColor="var(--skeleton-base)"
            highlightColor="var(--skeleton-highlight)"
          />
        ))}
      </div>

      {bodyRows.map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="grid items-center border-b-[0.4px] border-[var(--color-border-dark)]/40 px-6 py-4 dark:border-slate-700"
          style={{ gridTemplateColumns: `repeat(${safeColumns}, minmax(0, 1fr))` }}
        >
          {headerCells.map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              height={12}
              width={130}
              borderRadius={6}
              baseColor="var(--skeleton-base)"
              highlightColor="var(--skeleton-highlight)"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const DealsDetailsSection = ({ loading, monthOptions, month, onChange, headers, rows }) => {
  const columnCount = headers?.length ?? 4;
  return (
    <div className="section-animate mt-[26px] rounded-2xl bg-white shadow-sm pt-[25px] pb-[20px] pl-[32px] pr-[32px] dark:bg-slate-900 dark:border dark:border-slate-800">
      <div className="flex items-center justify-between">
          <span className="font-bold text-[20px] text-gray-800 dark:text-slate-100">Deals Details</span>
        {loading ? (
          <Skeleton width={120} height={28} />
        ) : (
          <Select
            className="text-sm z-60 border pr-[13px] pl-[8px] flex items-center max-h-[28px] border-[var(--orderlist-border-color)] rounded-[4px] bg-[#FCFDFD] dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
            options={monthOptions}
            value={month}
            onChange={onChange}
          />
        )}
      </div>
      <div className="mt-[35px]">
        {loading ? (
          <TableSkeleton columns={columnCount} rows={1} />
        ) : rows?.length ? (
          <Table headers={headers} data={rows} />
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default DealsDetailsSection;
