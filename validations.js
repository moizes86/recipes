

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
console.log('bhbkv');