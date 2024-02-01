// InputValidation.js
export const validateUsername = (username) => {
  if (username.length < 3) {
    return "Username should be at least 3 characters";
  }
  return null;
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return "Password should be at least 6 characters";
  }
  return null;
};

export const validateMobilePhone = (mobilePhone) => {
  const mobilePhoneRegex = /^[0-9]{1,12}$/;
  if (!mobilePhoneRegex.test(mobilePhone)) {
    return "Invalid mobile phone number";
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return null;
};
