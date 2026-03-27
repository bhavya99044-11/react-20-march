import React from "react";
import { ImSad2 } from "react-icons/im";

const EmptyCartState = ({ onContinueShopping }) => {
  return (
    <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-slate-900">
      <h3 className="flex items-center justify-center gap-1 text-xl font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
        Your cart is empty <ImSad2 size={20} color="#4880FF" />
      </h3>
      <button
        type="button"
        onClick={onContinueShopping}
        className="mt-6 cursor-pointer rounded-full bg-[#4880FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#356DFF]"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyCartState;
