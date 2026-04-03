import React from "react";
import Input from "../common/Input";

const inputShellClassName =
  "w-full";

const inputDivClassName =
  "rounded-2xl border border-[color:var(--color-border-subtle)] px-4 py-3 dark:border-slate-700";

const inputFieldClassName = "!w-full";

const CheckoutForm = ({
  checkoutForm,
  checkoutErrors,
  onFieldChange,
  onSubmit,
  isProcessingCheckout,
  orderTotal,
  formatCurrency,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900"
    >
      <div className="flex flex-col gap-2 border-b border-[color:var(--color-border-subtle)] pb-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-[color:var(--color-text-primary)] dark:text-slate-100">
            Checkout Details
          </h3>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)] dark:text-slate-300">
            Complete shipping and payment details to place your order.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Input id="fullName" name="fullName" label="Full Name" value={checkoutForm.fullName} onChange={onFieldChange} placeholder="John Smith" required={true} error={checkoutErrors.fullName} capitalizeWords={true} className={inputShellClassName} divClassName={inputDivClassName} inputClassName={inputFieldClassName} />
          <Input id="email" name="email" type="email" label="Email" value={checkoutForm.email} onChange={onFieldChange} placeholder="john@example.com" required={true} error={checkoutErrors.email} className={inputShellClassName} divClassName={inputDivClassName} inputClassName={inputFieldClassName} />
          <Input id="phone" name="phone" label="Phone" value={checkoutForm.phone} onChange={onFieldChange} placeholder="+1 (555) 123-4567" required={true} error={checkoutErrors.phone} className={inputShellClassName} divClassName={inputDivClassName} inputClassName={inputFieldClassName} />
          <Input id="address" name="address" label="Street Address" value={checkoutForm.address} onChange={onFieldChange} placeholder="123 Market Street" required={true} error={checkoutErrors.address} className={inputShellClassName} divClassName={inputDivClassName} inputClassName={inputFieldClassName} />

          <div className="grid gap-4 sm:grid-cols-3">
            <Input id="city" name="city" label="City" value={checkoutForm.city} onChange={onFieldChange} placeholder="Austin" required={true} error={checkoutErrors.city}  className={inputShellClassName} divClassName={inputDivClassName} inputClassName={inputFieldClassName} />
            <Input id="state" name="state" label="State" value={checkoutForm.state} onChange={onFieldChange} placeholder="TX" required={true} error={checkoutErrors.state} className={inputShellClassName} divClassName={inputDivClassName} inputClassName={inputFieldClassName} />
            <Input id="zipCode" name="zipCode" label="ZIP Code" value={checkoutForm.zipCode} onChange={onFieldChange} placeholder="78701" required={true} error={checkoutErrors.zipCode} className={inputShellClassName} divClassName={inputDivClassName} inputClassName={inputFieldClassName} />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-[color:var(--color-text-primary)] dark:text-slate-100">
              Payment Method
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[color:var(--color-border-subtle)] p-4 transition hover:border-[#4880FF] dark:border-slate-700">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={checkoutForm.paymentMethod === "card"}
                  onChange={onFieldChange}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm font-semibold text-[color:var(--color-text-primary)] dark:text-slate-100">
                    Credit or Debit Card
                  </span>
                  <span className="mt-1 block text-xs text-[color:var(--color-text-secondary)] dark:text-slate-300">
                    Instant payment with secure card details.
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[color:var(--color-border-subtle)] p-4 transition hover:border-[#4880FF] dark:border-slate-700">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={checkoutForm.paymentMethod === "cod"}
                  onChange={onFieldChange}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm font-semibold text-[color:var(--color-text-primary)] dark:text-slate-100">
                    Cash on Delivery
                  </span>
                  <span className="mt-1 block text-xs text-[color:var(--color-text-secondary)] dark:text-slate-300">
                    Pay when your order arrives at the doorstep.
                  </span>
                </span>
              </label>
            </div>
          </div>

          {checkoutForm.paymentMethod === "card" ? (
            <>
              <Input id="cardName" name="cardName" label="Name on Card" value={checkoutForm.cardName} onChange={onFieldChange} placeholder="John Smith" required={true} error={checkoutErrors.cardName} capitalizeWords={true} className={inputShellClassName} divClassName={inputDivClassName} inputClassName={inputFieldClassName} />
              <Input id="cardNumber" name="cardNumber" label="Card Number" value={checkoutForm.cardNumber} onChange={onFieldChange} placeholder="4242 4242 4242 4242" required={true} error={checkoutErrors.cardNumber} className={inputShellClassName} divClassName={inputDivClassName} inputClassName={inputFieldClassName} inputMode="numeric" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input id="expiryDate" name="expiryDate" label="Expiry Date" value={checkoutForm.expiryDate} onChange={onFieldChange} placeholder="MM/YY" required={true} error={checkoutErrors.expiryDate} className={inputShellClassName} divClassName={inputDivClassName} inputClassName={inputFieldClassName} inputMode="numeric" />
                <Input id="cvv" name="cvv" label="CVV" value={checkoutForm.cvv} onChange={onFieldChange} placeholder="123" required={true} error={checkoutErrors.cvv} className={inputShellClassName} divClassName={inputDivClassName} inputClassName={inputFieldClassName} inputMode="numeric" />
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-[color:var(--color-border-subtle)] bg-slate-50 px-4 py-5 text-sm text-[color:var(--color-text-secondary)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
              Your order will be reserved now and payment will be collected upon delivery.
            </div>
          )}

          <div className="rounded-2xl bg-[#F5F8FF] p-4 dark:bg-slate-950">
            <p className="text-sm font-semibold text-[color:var(--color-text-primary)] dark:text-slate-100">
              Delivery Estimate
            </p>
            <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] dark:text-slate-300">
              Within 3 to 5 business days.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[color:var(--color-border-subtle)] pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <p></p>
        <button
          type="submit"
          disabled={isProcessingCheckout}
          className="cursor-pointer rounded-full bg-[#4880FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#356DFF] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isProcessingCheckout ? "Processing..." : `Place Order • ${formatCurrency(orderTotal)}`}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
