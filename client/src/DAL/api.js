


// function validateInputField(inputFields) {
//   const totalErrors = [];
//   for (const inputName in inputFields) {
//     const errors = this.validateData(inputName, inputFields[inputName]);
//     if (errors) {
//       console.log(`Invalid ${inputName}`);
//       totalErrors.push(errors);
//     }
//   }
//   return totalErrors;
// }

// export const validateData = (inputName, value, password) => {
//   const validations = {
//     username: {
//       required: true,
//       pattern: /^[a-zA-Z]{5,}\S*$/,
//     },
//     email: {
//       required: true,
//       pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//     },
//     password: {
//       required: true,
//       pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/,
//     },
//     confirmPassword: {
//       required: true,
//     },
//     searchInput: {
//       required: true,
//       pattern: /^[a-zA-Z]{1,}\S.*[a-zA-Z]$/,
//     },
//   };

//   const { required, pattern } = validations[inputName];

//   if (required && !value) {
//     if (inputName === "confirmPassword") return "Please confirm password";
//     return `${inputName} is required`;
//   }

//   if (pattern && !pattern.test(value)) {
//     return `Invalid ${inputName}`;
//   }

//   if (inputName === "confirmPassword" && password !== value) {
//     return "Passwords do not match";
//   }

//   return false;
// };

