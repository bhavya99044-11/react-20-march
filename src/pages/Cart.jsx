import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../features/cartSlice";
import DeleteModal from "../components/common/DeleteModal";
import {
  CartHeader,
  FreeShippingBanner,
  OrderConfirmation,
  EmptyCartState,
  CartItemsCard,
  CheckoutForm,
  OrderSummaryCard,
} from "../components/cart";
import {
  SHIPPING_RATE,
  TAX_RATE,
  FREE_SHIPPING_THRESHOLD,
  initialCheckoutForm,
  formatCurrency,
  buildOrderNumber,
  getCheckoutValidationRules,
  getRewardDiscountDetails,
} from "../components/cart/cartUtils";
import { api } from "../utils/api";
import { fetchCurrentUser, getStoredSession } from "../utils/authSession";
import { checkValidation } from "../utils/helpers";
import { errorToast, successToast } from "../utils/toastMessage";
import CheckOutCart from "../components/cart/CheckOutCart";
import classNames from "classnames";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const [itemToRemove, setItemToRemove] = useState(null);
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState(initialCheckoutForm);
  const [checkoutErrors, setCheckoutErrors] = useState({});
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponFeedback, setCouponFeedback] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const cartSubtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );
  const totalQuantity = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );
  const remainingAmount = Math.max(FREE_SHIPPING_THRESHOLD - cartSubtotal, 0);
  const progressValue = Math.min(
    (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );
  const hasFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const baseShippingCost =
    cartItems.length === 0 ? 0 : hasFreeShipping ? 0 : SHIPPING_RATE;
  const { discountAmount, adjustedShippingCost, summaryLabel } =
    getRewardDiscountDetails(appliedCoupon, cartSubtotal, baseShippingCost);
  const discountedSubtotal = Math.max(cartSubtotal - discountAmount, 0);
  const shippingCost = adjustedShippingCost;
  const taxAmount = discountedSubtotal * TAX_RATE;
  const orderTotal = discountedSubtotal + shippingCost + taxAmount;

  useEffect(() => {
    let isMounted = true;

    const hydrateCheckoutUser = async () => {
      const session = getStoredSession();

      try {
        const currentUser = await fetchCurrentUser();

        if (!isMounted) {
          return;
        }

        setCheckoutForm((prev) => ({
          ...prev,
          fullName: currentUser?.name || session?.name || prev.fullName,
          email: currentUser?.email || session?.email || prev.email,
          cardName:
            prev.cardName ||
            currentUser?.name ||
            session?.name ||
            "",
        }));
      } catch (error) {
        console.error("Failed to load checkout user details:", error);

        if (!isMounted) {
          return;
        }

        setCheckoutForm((prev) => ({
          ...prev,
          fullName: session?.name || prev.fullName,
          email: session?.email || prev.email,
          cardName: prev.cardName || session?.name || "",
        }));
      }
    };

    hydrateCheckoutUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleQuantityChange = (item, nextQuantity) => {
    dispatch(
      updateCartItemQuantity({
        id: item.id,
        selectedColor: item.selectedColor ?? null,
        selectedSize: item.selectedSize ?? null,
        quantity: nextQuantity,
      }),
    );
  };

  const handleRemoveItem = (item) => {
    setItemToRemove(item);
  };

  const handleCloseRemoveModal = () => {
    setItemToRemove(null);
  };

  const handleConfirmRemove = () => {
    if (!itemToRemove) {
      return;
    }

    dispatch(
      removeCartItem({
        id: itemToRemove.id,
        selectedColor: itemToRemove.selectedColor ?? null,
        selectedSize: itemToRemove.selectedSize ?? null,
      }),
    );
    setItemToRemove(null);
  };

  const handleCheckoutFieldChange = (event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === "cardNumber") {
      nextValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    if (name === "expiryDate") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      nextValue =
        digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    }

    if (name === "cvv") {
      nextValue = value.replace(/\D/g, "").slice(0, 4);
    }

    if (name === "phone") {
      nextValue = value.replace(/[^\d+\-() ]/g, "").slice(0, 18);
    }

    const nextPaymentMethod =
      name === "paymentMethod" ? nextValue : checkoutForm.paymentMethod;

    setCheckoutForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    checkValidation(
      {
        [name]: [nextValue],
      },
      getCheckoutValidationRules(nextPaymentMethod),
      checkoutErrors,
      setCheckoutErrors,
    );
  };

  const validateCheckoutForm = () => {
    const activeRules = getCheckoutValidationRules(checkoutForm.paymentMethod);
    const fieldsToValidate = Object.keys(activeRules).reduce(
      (accumulator, field) => {
        accumulator[field] = checkoutForm[field];
        return accumulator;
      },
      {},
    );

    const errors = checkValidation(
      fieldsToValidate,
      activeRules,
      checkoutErrors,
      setCheckoutErrors,
    );

    return Object.values(errors).every((value) => value === "");
  };

  const handleStartCheckout = () => {
    if (cartItems.length === 0) {
      errorToast("Add products to continue checkout.");
      return;
    }

    setCheckoutStarted(true);
    setOrderConfirmation(null);
  };

  const handleApplyCoupon = async () => {
    const normalizedCode = couponCode.trim().toUpperCase();

    if (!normalizedCode) {
      setAppliedCoupon(null);
      setCouponFeedback("Enter a coupon code first.");
      return;
    }

    if (cartItems.length === 0) {
      setAppliedCoupon(null);
      setCouponFeedback("Add products to your cart before applying a coupon.");
      return;
    }

    if (appliedCoupon?.couponName === normalizedCode) {
      setCouponFeedback(summaryLabel || "This coupon is already applied.");
      return;
    }

    setIsApplyingCoupon(true);
    setCouponFeedback("");

    try {
      const response = await api.get("/rewards", {
        params: { couponName: normalizedCode },
      });

      const matchingCoupon = response.data?.[0];

      if (!matchingCoupon) {
        setAppliedCoupon(null);
        setCouponFeedback("Invalid coupon code.");
        return;
      }

      if (matchingCoupon.status !== "Active") {
        setAppliedCoupon(null);
        setCouponFeedback("This coupon is inactive.");
        return;
      }

      const couponExpiry = new Date(matchingCoupon.validTill);
      if (Number.isNaN(couponExpiry.getTime()) || couponExpiry.getTime() < Date.now()) {
        setAppliedCoupon(null);
        setCouponFeedback("This coupon has expired.");
        return;
      }

      setAppliedCoupon(matchingCoupon);
      setCouponCode(matchingCoupon.couponName);
      setCouponFeedback(
        getRewardDiscountDetails(matchingCoupon, cartSubtotal, baseShippingCost).summaryLabel ||
          "Coupon applied successfully.",
      );
      successToast("Coupon applied successfully.");
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      setAppliedCoupon(null);
      setCouponFeedback("Unable to apply coupon right now.");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponFeedback("");
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      errorToast("Your cart is empty.");
      return;
    }

    if (!validateCheckoutForm()) {
      errorToast("Please complete the checkout details.");
      return;
    }

    setIsProcessingCheckout(true);

    try {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 900);
      });

      const paymentSummary =
        checkoutForm.paymentMethod === "card"
          ? `Card ending in ${checkoutForm.cardNumber.replace(/\s/g, "").slice(-4)}`
          : "Cash on delivery";

      setOrderConfirmation({
        orderNumber: buildOrderNumber(),
        customerName: checkoutForm.fullName.trim(),
        email: checkoutForm.email.trim(),
        paymentSummary,
        total: orderTotal,
        placedAt: new Date().toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      });

      dispatch(clearCart());
      setCheckoutStarted(false);
      setCheckoutErrors({});
      setCheckoutForm((prev) => ({
        ...initialCheckoutForm,
        fullName: prev.fullName,
        email: prev.email,
      }));
      setAppliedCoupon(null);
      setCouponCode("");
      setCouponFeedback("");
      successToast("Order placed successfully.");
    } finally {
      setIsProcessingCheckout(false);
    }
  };
  return (
    <div className="mt-4 px-4 pb-8 sm:mt-6 no-scrollbar sm:px-6 lg:mt-[30px] lg:px-[30px] dark:bg-slate-950 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
      <CartHeader />

      <FreeShippingBanner
        hasFreeShipping={hasFreeShipping}
        cartSubtotal={cartSubtotal}
        remainingAmount={remainingAmount}
        progressValue={progressValue}
        formatCurrency={formatCurrency}
      />

      <OrderConfirmation
        orderConfirmation={orderConfirmation}
        formatCurrency={formatCurrency}
        onContinueShopping={() => navigate("/products")}
        onViewOrders={() => navigate("/order-lists")}
      />

      {cartItems.length === 0 ? (
        <EmptyCartState onContinueShopping={() => navigate("/products")} />
      ) : (
        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            <CartItemsCard
              cartItems={cartItems}
              totalQuantity={totalQuantity}
              formatCurrency={formatCurrency}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />

            {checkoutStarted ? (
              <CheckOutCart
                checkoutForm={checkoutForm}
                checkoutError={checkoutErrors}
                onFieldChange={handleCheckoutFieldChange}
                onSubmit={handlePlaceOrder}
                orderTotal={orderTotal}
                isProcessingCheckout={isProcessingCheckout}
                formatCurrency={formatCurrency}
              />
            ) : null}
          </div>

          <OrderSummaryCard
            cartItems={cartItems}
            totalQuantity={totalQuantity}
            cartSubtotal={cartSubtotal}
            shippingCost={shippingCost}
            discountAmount={discountAmount}
            taxAmount={taxAmount}
            orderTotal={orderTotal}
            checkoutStarted={checkoutStarted}
            formatCurrency={formatCurrency}
            couponCode={couponCode}
            couponFeedback={couponFeedback}
            appliedCoupon={appliedCoupon}
            isApplyingCoupon={isApplyingCoupon}
            onCouponCodeChange={setCouponCode}
            onApplyCoupon={handleApplyCoupon}
            onRemoveCoupon={handleRemoveCoupon}
            onStartCheckout={handleStartCheckout}
            onContinueShopping={() => navigate("/products")}
          />
        </div>
      )}

      <DeleteModal
        open={Boolean(itemToRemove)}
        title="Remove cart item"
        message={`Are you sure you want to remove ${itemToRemove?.name || "this item"} from your cart?`}
        confirmText="Remove"
        cancelText="Cancel"
        onClose={handleCloseRemoveModal}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
};

export default Cart;
