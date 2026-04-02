import { checkoutRules } from "../../utils/validation";

const SHIPPING_RATE = 8.99;
const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 75;

const initialCheckoutForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  paymentMethod: "card",
  cardName: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const buildOrderNumber = () =>
  `ORD-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 90 + 10)}`;

const getCheckoutValidationRules = (paymentMethod) =>
  paymentMethod === "card"
    ? checkoutRules
    : Object.fromEntries(
        Object.entries(checkoutRules).filter(
          ([field]) => !["cardName", "cardNumber", "expiryDate", "cvv"].includes(field),
        ),
      );

const getRewardDiscountDetails = (reward, cartSubtotal, shippingCost) => {
  if (!reward) {
    return {
      discountAmount: 0,
      adjustedShippingCost: shippingCost,
      summaryLabel: "",
    };
  }

  switch (reward.typeId) {
    case "delivery-free":
      return {
        discountAmount: shippingCost,
        adjustedShippingCost: 0,
        summaryLabel: "Free delivery applied",
      };
    case "flash-half":
      return {
        discountAmount: cartSubtotal * 0.5,
        adjustedShippingCost: shippingCost,
        summaryLabel: "50% off subtotal applied",
      };
    case "save-100":
      return {
        discountAmount: Math.min(100, cartSubtotal),
        adjustedShippingCost: shippingCost,
        summaryLabel: "$100 off subtotal applied",
      };
    case "save-50":
      return {
        discountAmount: Math.min(50, cartSubtotal),
        adjustedShippingCost: shippingCost,
        summaryLabel: "$50 off subtotal applied",
      };
    case "quick-drop":
      return {
        discountAmount: cartSubtotal * 0.35,
        adjustedShippingCost: shippingCost,
        summaryLabel: "35% off subtotal applied",
      };
    default:
      return {
        discountAmount: 0,
        adjustedShippingCost: shippingCost,
        summaryLabel: "",
      };
  }
};

export {
  SHIPPING_RATE,
  TAX_RATE,
  FREE_SHIPPING_THRESHOLD,
  initialCheckoutForm,
  formatCurrency,
  buildOrderNumber,
  getCheckoutValidationRules,
  getRewardDiscountDetails,
};
