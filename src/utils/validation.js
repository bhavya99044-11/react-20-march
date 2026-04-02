const loginRules = {
  email: {
    required: true,
    email: true,
  },
  password: {
    required: true,
    minLength: 5,
    maxLength: 10,
  },
};

const registerRules = {
  name: {
    required: true,
  },
  email: {
    required: true,
    email: true,
  },
  password: {
    required: true,
    minLength: 5,
    maxLength: 10,
  },
};

const forgotPasswordRules = {
  email: {
    required: true,
    email: true,
  },
};

const productStockRules = {
  name: {
    required: true,
  },
  category: {
    required: true,
  },
  price: {
    required: true,
    numeric: true,
    min: 0.01,
  },
  piece: {
    required: true,
    numeric: true,
    integer: true,
    min: 1,
    pattern: /^\d+$/,
    message: "Only positive whole numbers are allowed",
  },
};

const addEventRules = {
  title: {
    required: true,
  },
  date: {
    required: true,
  },
  endDate: {
    required: true,
  },
  time: {
    required: true,
  },
  address: {
    required: true,
  },
  city: {
    required: true,
  },
  color: {
    required: true,
  },
};

const checkoutRules = {
  fullName: {
    required: true,
  },
  email: {
    required: true,
    email: true,
  },
  phone: {
    required: true,
    pattern: /^[\d+\-() ]{10,18}$/,
    message: "Enter a valid phone number",
  },
  address: {
    required: true,
  },
  city: {
    required: true,
  },
  state: {
    required: true,
  },
  zipCode: {
    required: true,
    pattern: /^\d{5,6}$/,
    message: "Enter a valid ZIP code",
  },
  cardName: {
    required: true,
  },
  cardNumber: {
    required: true,
    pattern: /^\d{4} \d{4} \d{4} \d{4}$/,
    message: "Enter a valid 16-digit card number",
  },
  expiryDate: {
    required: true,
    pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
    message: "Use MM/YY format",
  },
  cvv: {
    required: true,
    pattern: /^[0-9]{3,4}$/,
    message: "Enter a valid CVV",
  },
};

const rewardRules = {
  couponName: {
    required: true,
    minLength: 4,
  },
  rewardType: {
    required: true,
  },
  validTill: {
    required: true,
  },
  status: {
    required: true,
  },
};

export {
  loginRules,
  registerRules,
  forgotPasswordRules,
  productStockRules,
  addEventRules,
  checkoutRules,
  rewardRules,
};
