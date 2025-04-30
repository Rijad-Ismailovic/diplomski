const isEmail = (str) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
};

const hasSpecialChars = (str) => /[^a-zA-Z0-9]/.test(str);

export const validateRegistrationForm = (
  fullName,
  email,
  username,
  password
) => {
  let isValid = true;
  const errors = {
    fullName: "",
    email: "",
    username: "",
    password: "",
  };

  if (fullName == "") {
    errors.fullName = "Field is required";
    isValid = false;
  }

  if (email == "") {
    errors.email = "Field is required";
    isValid = false;
  } else {
    if (!isEmail(email)) {
      errors.email = "Must be valid email format";
      isValid = false;
    }
  }

  if (username == "") {
    errors.username = "Field is required";
    isValid = false;
  } else {
    if (hasSpecialChars(username)) {
      errors.username = "Username cannot contain special characters";
      isValid = false;
    }
  }

  if (password == "") {
    errors.password = "Field is required";
    isValid = false;
  } else {
    if (password.length < 6) {
      errors.password = "Password must be longer than 5 characters";
    }
  }

  return { isValid, errors };
};
