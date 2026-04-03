import { jwtDecode } from "jwt-decode";
import { validationTexts } from "./validationTexts";

const checkButtonDisable = (formData, setButton) => {
  const disabled = Object.keys(formData).every((key) => {
    return formData[key] == "";
  });
  setButton(disabled);
};

const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const capitalizeWords = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

const checkValidation = (values, rules, error, setError) => {
  const validationObject = { ...(error || {}) };

  Object.keys(values).forEach((key) => {
    const value = Array.isArray(values[key]) ? values[key][0] : values[key];
    const rule = rules[key] || {};
    const trimmedValue = typeof value === "string" ? value.trim() : value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numericValue =
      trimmedValue === "" || trimmedValue === null || trimmedValue === undefined
        ? NaN
        : Number(trimmedValue);

    if (rule.required && trimmedValue == "") {
      validationObject[key] = validationTexts.required;
    } else if (rule.email && trimmedValue && !emailRegex.test(trimmedValue)) {
      validationObject[key] = validationTexts.invalidEmail;
    } else if (
      rule.minLength &&
      typeof trimmedValue === "string" &&
      trimmedValue.length < rule.minLength
    ) {
      validationObject[key] = `Minimum ${rule.minLength} characters required`;
    } else if (
      rule.maxLength &&
      typeof trimmedValue === "string" &&
      trimmedValue.length > rule.maxLength
    ) {
      validationObject[key] = `Maximum ${rule.maxLength} characters allowed`;
    } else if (rule.numeric && Number.isNaN(numericValue)) {
      validationObject[key] = "Enter a valid number";
    } else if (rule.min !== undefined && numericValue < rule.min) {
      validationObject[key] = `Value must be at least ${rule.min}`;
    } else if (rule.integer && !Number.isInteger(numericValue)) {
      validationObject[key] = "Enter a whole number";
    } else if (rule.pattern && !rule.pattern.test(String(trimmedValue))) {
      validationObject[key] = rule.message || "Invalid value";
    } else {
      validationObject[key] = "";
    }
  });

  setError(validationObject);

  return validationObject;
};

const decodeGoogleCredential = (credential) => {
  if (!credential) return null;
  try {
    return jwtDecode(credential)
  } catch (error) {
    console.error("Failed to decode Google credential:", error);
    return null;
  }
};

export { checkButtonDisable, checkValidation, decodeGoogleCredential, capitalize, capitalizeWords };
