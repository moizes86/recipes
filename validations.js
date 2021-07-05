
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

 const validateInput = (name, value, password) => {
  const { required, pattern, shouldConfirmPassword } = validations[name];

  if (required && !value) {
    throw Error(`${name} is required`);
  }

  if (pattern && !pattern.test(value)) {
    throw Error(`Invalid ${name}`);
  }

  if (shouldConfirmPassword && password !== value) {
    throw Error ("Passwords do not match");
  }

};

module.exports = {validateInput};