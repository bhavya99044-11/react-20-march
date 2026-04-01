import React from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const CartItemsCard = ({
  cartItems,
  totalQuantity,
  formatCurrency,
  onQuantityChange,
  onRemoveItem,
}) => {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
      <div className="flex flex-col gap-2 border-b border-[color:var(--color-border-subtle)] pb-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-lg font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
          Cart Items
        </span>

      </div>

      <div className="hidden grid-cols-[minmax(0,2fr)_120px_150px_120px_90px] gap-4 px-4 py-4 text-sm font-semibold text-[color:var(--color-text-secondary)] dark:text-slate-300 lg:grid">
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
        <span className="text-center">Action</span>
      </div>

      <div className="divide-y divide-[color:var(--color-border-subtle)] dark:divide-slate-800">
        {cartItems.map((item) => {
          const itemTotal = Number(item.price || 0) * Number(item.quantity || 0);

          return (
            <div
              key={`${item.id}-${item.selectedColor?.id ?? "default"}-${item.selectedSize?.id ?? "default"}`}
              className="grid gap-4 px-4 py-5 lg:grid-cols-[minmax(0,2fr)_120px_150px_120px_90px] lg:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#F5F8FD] p-3 dark:bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
                    {item.name}
                  </h3>
                  {item.selectedColor?.name ? (
                    <p className="mt-1 text-sm text-[color:var(--color-text-secondary)] dark:text-slate-300">
                      Color: {item.selectedColor.name}
                    </p>
                  ) : null}
                  {item.selectedSize?.name ? (
                    <p className="mt-1 text-sm text-[color:var(--color-text-secondary)] dark:text-slate-300">
                      Size: {item.selectedSize.name}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="text-sm font-semibold text-[color:var(--color-text-primary)] dark:text-slate-100">
                <span className="mr-2 inline-block text-[color:var(--color-text-secondary)] dark:text-slate-300 lg:hidden">
                  Price:
                </span>
                {formatCurrency(item.price)}
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-block text-sm text-[color:var(--color-text-secondary)] dark:text-slate-300 lg:hidden">
                  Quantity:
                </span>
                <div className="flex items-center rounded-full border border-[color:var(--color-border-subtle)] dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => onQuantityChange(item, Math.max(1, Number(item.quantity || 1) - 1))}
                    className="h-10 w-10 cursor-pointer rounded-l-full text-lg font-bold text-[color:var(--color-text-primary)] transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                    aria-label={`Decrease quantity for ${item.name}`}
                  >
                    -
                  </button>
                  <span className="flex h-10 min-w-10 items-center justify-center px-2 text-sm font-semibold text-[color:var(--color-text-primary)] dark:text-slate-100">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onQuantityChange(item, Number(item.quantity || 0) + 1)}
                    className="h-10 w-10 cursor-pointer rounded-r-full text-lg font-bold text-[color:var(--color-text-primary)] transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                    aria-label={`Increase quantity for ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-sm font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
                <span className="mr-2 inline-block text-[color:var(--color-text-secondary)] dark:text-slate-300 lg:hidden">
                  Total:
                </span>
                {formatCurrency(itemTotal)}
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => onRemoveItem(item)}
                  className="cursor-pointer text-center text-sm font-semibold text-red-500 transition hover:text-red-600"
                >
                  <MdOutlineRemoveShoppingCart size={23} color="red" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartItemsCard;
