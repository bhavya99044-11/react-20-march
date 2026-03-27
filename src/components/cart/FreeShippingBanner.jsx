import React from "react";
import { FaDotCircle } from "react-icons/fa";

const FreeShippingBanner = ({
  hasFreeShipping,
  cartSubtotal,
  remainingAmount,
  progressValue,
  formatCurrency,
}) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center rounded-2xl bg-white p-4 font-semibold shadow-sm dark:bg-slate-900">
      <div className="flex w-full flex-wrap items-center justify-center text-center text-[color:var(--color-text-primary)] dark:text-slate-100">
        {hasFreeShipping ? (
          <>
            Your order total is {formatCurrency(cartSubtotal)}.
            <span className="ml-1 text-green-600">Free shipping applied.</span>
          </>
        ) : (
          <>
            Great! Only {formatCurrency(remainingAmount)} away from getting
            <span className="ml-1 text-yellow-500">Free Shipping</span>
          </>
        )}
      </div>
      <div className="mt-4 flex w-full max-w-4xl gap-3">
        <span className="pt-1 text-sm text-[color:var(--color-text-secondary)] dark:text-slate-300">
          $0
        </span>
        <div className="relative flex-1 pb-14">
          <progress
            value={progressValue}
            max={100}
            className="h-3 w-full overflow-hidden rounded-full [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-[#4880FF] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[#4880FF]"
          />
          <div className="absolute top-5 right-0 flex flex-col items-end gap-1 text-right">
            <span className="flex items-center">
              <FaDotCircle color="#4880FF" />
            </span>
            <div className="absolute left-[1px] top-5 -ml-10 w-24 text-sm text-[color:var(--color-text-primary)] dark:text-slate-100">
              Free Shipping
            </div>
          </div>
        </div>
        <span className="pt-1 text-sm text-[color:var(--color-text-secondary)] dark:text-slate-300">
          $75
        </span>
      </div>
    </div>
  );
};

export default FreeShippingBanner;
