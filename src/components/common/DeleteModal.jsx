import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { RiCloseLine } from "react-icons/ri";
import Button from "./Button";
import {
  MODAL_CANCEL_BUTTON_CLASS,
  MODAL_DANGER_BUTTON_CLASS,
} from "./modalButtonStyles";

const CLOSE_ANIMATION_MS = 180;

const DeleteModal = ({
  open,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  loading = false,
}) => {
  const [isVisible, setIsVisible] = useState(open);
  const [isClosing, setIsClosing] = useState(false);
  const [deleteMessage,setDeleteMessage] = useState(message)
  useEffect(() => {
    if (open) {
      setDeleteMessage(message)
      setIsVisible(true);
      setIsClosing(false);
      return;
    }

    if (isVisible) {
      setIsClosing(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, CLOSE_ANIMATION_MS);
      return () => clearTimeout(timeout);
    }
  }, [open, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center">
      <div
        className={classNames(
          "absolute inset-0 bg-black/40",
          isClosing ? "backdrop-animate-out" : "backdrop-animate",
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={classNames(
          "relative z-10 w-[92%] max-w-[420px] rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:border dark:border-slate-700",
          isClosing ? "popup-animate-out" : "popup-animate",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-full p-1 text-[color:var(--color-text-secondary)] transition-colors hover:bg-slate-100 hover:text-[color:var(--orderlist-text-color)] cursor-pointer dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          <RiCloseLine className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-bold text-[color:var(--orderlist-text-color)] dark:text-slate-100">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] dark:text-slate-400">
          {deleteMessage}
        </p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            text={cancelText}
            type="button"
            onClick={onClose}
            className={MODAL_CANCEL_BUTTON_CLASS}
            useColorClasses={false}
          />
          <Button
            text={confirmText}
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={MODAL_DANGER_BUTTON_CLASS}
            useColorClasses={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
