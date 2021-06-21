
const validations = {
  username: {
    required: true,
    pattern: /^[a-zA-Z]{5,}\S*$/,
  },
  email: {
    required: true,
    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    required: true,
    pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/,
  },
  confirmPassword: {
    required: true,
    shouldConfirmPassword: true,
  },
  searchInput: {
    required: true,
    pattern: /^[a-zA-Z]{1,}\S.*[a-zA-Z]$/,
  },
};

export const validateInput = ({ name, value, password }) => {
  const newErrors = [];
  const { required, pattern, shouldConfirmPassword } = validations[name];

  if (required && !value) {
    newErrors.push(`Field is required`);
  }

  if (pattern && !pattern.test(value)) {
    newErrors.push(`Invalid ${name}`);
  }

  if (shouldConfirmPassword && password !== value) {
    newErrors.push("Passwords do not match");
  }

  return newErrors;
};
