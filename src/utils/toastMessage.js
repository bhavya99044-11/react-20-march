import { toast } from "react-toastify";

const showToastOnce = (type, message) => {
  const toastId = `${type}:${message}`;
  if (toast.isActive(toastId)) return;
  toast[type](message, { toastId });
};

const successToast = (message) => {
  showToastOnce("success", message);
};

const errorToast = (message) => {
  showToastOnce("error", message);
};

export {successToast,errorToast};
