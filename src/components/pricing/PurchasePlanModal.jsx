import React, { useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Button } from "../common";
import { FaCheckCircle } from "react-icons/fa";
import classNames from "classnames";
import {
  MODAL_CANCEL_BUTTON_CLASS,
  MODAL_PRIMARY_BUTTON_CLASS,
} from "../common/modalButtonStyles";

const PurchasePlanModal = ({
  open,
  plan,
  loading = false,
  onClose,
  onConfirm,
}) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, loading, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-animate"
        onClick={loading ? null : onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        className="relative z-10 w-[92%] max-w-[440px] rounded-2xl border border-[var(--color-border-subtle)] bg-white p-6 shadow-xl popup-animate dark:border-slate-700 dark:bg-slate-900"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute right-4 top-4 cursor-pointer rounded-full p-1 text-[color:var(--color-text-secondary)] transition-colors hover:bg-slate-100 hover:text-[color:var(--orderlist-text-color)] disabled:cursor-not-allowed dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          <RiCloseLine className="h-5 w-5" />
        </button>

        <h3 className="text-lg font-bold text-[color:var(--orderlist-text-color)] dark:text-slate-100">
          Confirm Purchase
        </h3>
        <div
          className={classNames(
            "relative mt-4 rounded-lg border border-[2px] border-[#2563EB] bg-blue-50 p-4 dark:bg-slate-800/80",
          )}
        >
          <div className="absolute -top-2 -right-2 z-40 rounded-full bg-white dark:bg-slate-900">
            <FaCheckCircle size={20} color="#2563EB" />
          </div>
          <h2 className="text-[22px] font-bold text-[#2563EB] dark:text-blue-300">
            {plan.name}
          </h2>
          <span className="mt-2 inline-block text-[18px] font-semibold text-[color:var(--orderlist-text-color)] dark:text-slate-100">
            ${plan.price} /-
          </span>
          <ul className="mt-4 list-inside list-disc font-semibold text-gray-700 marker:text-[#2563EB] dark:text-slate-200">
            {plan.features
              .filter((item) => item.active)
              .map((item) => (
                <li key={`${plan.id}-${item.label}`}>{item.label}</li>
              ))}
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            text="Cancel"
            type="button"
            onClick={onClose}
            disabled={loading}
            className={MODAL_CANCEL_BUTTON_CLASS}
            useColorClasses={false}
          />
          <Button
            text="Purchase"
            type="button"
            onClick={onConfirm}
            loading={loading}
            className={MODAL_PRIMARY_BUTTON_CLASS}
            useColorClasses={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchasePlanModal;
