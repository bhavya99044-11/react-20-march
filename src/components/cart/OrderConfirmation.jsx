import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const OrderConfirmation = ({
  orderConfirmation,
  formatCurrency,
  onContinueShopping,
  onViewOrders,
}) => {
  if (!orderConfirmation) {
    return null;
  }

  return (
    <div className="mt-10 rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-blue-50 p-6 shadow-sm dark:border-green-900 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
              <FaCheckCircle size={22} />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
                Order confirmed
              </h2>
              <p className="mt-1 text-sm text-[color:var(--color-text-secondary)] dark:text-slate-300">
                Thanks {orderConfirmation.customerName}, your checkout is complete.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/80 p-4 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)] dark:text-slate-400">
                Order Number
              </p>
              <p className="mt-2 text-base font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
                {orderConfirmation.orderNumber}
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)] dark:text-slate-400">
                Payment
              </p>
              <p className="mt-2 text-base font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
                {orderConfirmation.paymentSummary}
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)] dark:text-slate-400">
                Receipt Sent To
              </p>
              <p className="mt-2 text-base font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
                {orderConfirmation.email}
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)] dark:text-slate-400">
                Total Paid
              </p>
              <p className="mt-2 text-base font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
                {formatCurrency(orderConfirmation.total)}
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm text-[color:var(--color-text-secondary)] dark:text-slate-300">
            Placed on {orderConfirmation.placedAt}. You can continue shopping or view your order list next.
          </p>
        </div>
        <div className="flex min-w-[220px] flex-col gap-3">
          <button
            type="button"
            onClick={onContinueShopping}
            className="cursor-pointer rounded-full bg-[#4880FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#356DFF]"
          >
            Continue Shopping
          </button>
          <button
            type="button"
            onClick={onViewOrders}
            className="cursor-pointer rounded-full border border-[color:var(--color-border-subtle)] bg-white px-6 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
