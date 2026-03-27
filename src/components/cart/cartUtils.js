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

export {
  SHIPPING_RATE,
  TAX_RATE,
  FREE_SHIPPING_THRESHOLD,
  initialCheckoutForm,
  formatCurrency,
  buildOrderNumber,
  getCheckoutValidationRules,
};
