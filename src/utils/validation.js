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

export {
  loginRules,
  registerRules,
  forgotPasswordRules,
  productStockRules,
  addEventRules,
};
