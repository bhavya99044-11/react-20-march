import React from "react";

const OrderSummaryCard = ({
  cartItems,
  totalQuantity,
  cartSubtotal,
  cartOriginalSubtotal,
  spinSavings,
  shippingCost,
  discountAmount,
  taxAmount,
  orderTotal,
  checkoutStarted,
  formatCurrency,
  couponCode,
  couponFeedback,
  appliedCoupon,
  isApplyingCoupon,
  onCouponCodeChange,
  onApplyCoupon,
  onRemoveCoupon,
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
        {spinSavings > 0 ? (
          <div className="flex items-center justify-between text-[#16a34a] dark:text-green-300">
            <span>Spin Reward Savings</span>
            <span>-{formatCurrency(spinSavings)}</span>
          </div>
        ) : null}
        {spinSavings > 0 ? (
          <div className="flex items-center justify-between text-[color:var(--color-text-secondary)] dark:text-slate-300">
            <span>Original Items Value</span>
            <span>{formatCurrency(cartOriginalSubtotal)}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between text-[color:var(--color-text-secondary)] dark:text-slate-300">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}</span>
        </div>
        {discountAmount > 0 ? (
          <div className="flex items-center justify-between text-[#16a34a] dark:text-green-300">
            <span>Coupon Discount</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between text-[color:var(--color-text-secondary)] dark:text-slate-300">
          <span>Tax</span>
          <span>{formatCurrency(taxAmount)}</span>
        </div>
      </div>
      <div className="">

        <div className="mt-5 flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(event) => onCouponCodeChange(event.target.value)}
            placeholder="Enter coupon code"
            className="min-w-0 flex-1 rounded-full border border-[color:var(--color-border-subtle)] px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          /> 
          <button
            type="button"
            onClick={appliedCoupon ? onRemoveCoupon : onApplyCoupon}
            disabled={isApplyingCoupon}
            className={`min-w-[96px] cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
              appliedCoupon
                ? "border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
                : "bg-[#4880FF] text-white hover:bg-[#356DFF]"
            }`}
          >
            {isApplyingCoupon ? "Applying..." : appliedCoupon ? "Remove" : "Apply"}
          </button>
        </div>
        <div className="mt-3 min-h-[20px]">
          {appliedCoupon ? (
            <p className="text-xs font-semibold text-green-600 dark:text-green-300">
              Applied: {appliedCoupon.couponName}
              {couponFeedback ? ` • ${couponFeedback}` : ""}
            </p>
          ) : couponFeedback ? (
            <p className="text-xs font-semibold text-red-500 dark:text-red-300">
              {couponFeedback}
            </p>
          ) : null}
        </div>
      </div>
      <div className=" border-t border-[color:var(--color-border-subtle)] pt-4 dark:border-slate-800">
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
