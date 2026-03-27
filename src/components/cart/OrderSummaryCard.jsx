import React from "react";

const OrderSummaryCard = ({
  cartItems,
  totalQuantity,
  cartSubtotal,
  shippingCost,
  taxAmount,
  orderTotal,
  checkoutStarted,
  formatCurrency,
  onStartCheckout,
  onContinueShopping,
}) => {
  return (
    <div className="h-fit rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 xl:sticky xl:top-6">
      <h3 className="text-lg font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
        Order Summary
      </h3>
      <div className="mt-6 space-y-4 text-sm">
        <div className="flex items-center justify-between text-[color:var(--color-text-secondary)] dark:text-slate-300">
          <span>Products</span>
          <span>{cartItems.length}</span>
        </div>
        <div className="flex items-center justify-between text-[color:var(--color-text-secondary)] dark:text-slate-300">
          <span>Total Quantity</span>
          <span>{totalQuantity}</span>
        </div>
        <div className="flex items-center justify-between text-[color:var(--color-text-secondary)] dark:text-slate-300">
          <span>Subtotal</span>
          <span>{formatCurrency(cartSubtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-[color:var(--color-text-secondary)] dark:text-slate-300">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}</span>
        </div>
        <div className="flex items-center justify-between text-[color:var(--color-text-secondary)] dark:text-slate-300">
          <span>Estimated Tax</span>
          <span>{formatCurrency(taxAmount)}</span>
        </div>
      </div>
      <div className="mt-6 border-t border-[color:var(--color-border-subtle)] pt-4 dark:border-slate-800">
        <div className="flex items-center justify-between text-base font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
          <span>Total</span>
          <span>{formatCurrency(orderTotal)}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onStartCheckout}
        className="mt-6 w-full cursor-pointer rounded-full bg-[#4880FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#356DFF]"
      >
        {checkoutStarted ? "Checkout In Progress" : "Proceed to Checkout"}
      </button>
      <button
        type="button"
        onClick={onContinueShopping}
        className="mt-3 w-full cursor-pointer rounded-full border border-[color:var(--color-border-subtle)] bg-white px-6 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      >
        Keep Shopping
      </button>
    </div>
  );
};

export default OrderSummaryCard;
