// src/utils/validation.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^\d{10}$/;
  return re.test(String(phone));
};

export const validateCreditCard = (creditCard) => {
  const re = /^\d{16}$/;
  return re.test(String(creditCard));
};

export const validateExpirationDate = (expirationDate) => {
  const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return re.test(String(expirationDate));
};

export const validateCVV = (cvv) => {
  const re = /^\d{3}$/;
  return re.test(String(cvv));
};