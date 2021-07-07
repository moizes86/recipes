const validateRequired = (name, value) => {
  if (!value) throw Error(`${name} is required`);
};

const validateEmail = (email) => {
  validateRequired("Email", email);
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!reg.test(email)) throw Error("Invalid Email");
};

const validateUsername = (username) => {
  validateRequired("Username", username);
  const reg = /^[a-zA-Z]{5,}\S*$/;
  if (!reg.test(username)) {
    if (username.length < 5) throw Error("Username too short! Minimum 5 chars");
    if (username.length > 5) throw Error("Username too long! Maximum 20 chars");
    throw Error("Invalid username");
  }
};

const validatePassword = (password) => {
  validateRequired("Password", password);
  const reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
  if (password.length < 6) throw Error("Password length must be at least six chars");
  if (!reg.test(password)) throw Error("Invalid password. Must contain numbers and letters");
};

const validateConfirmPassword = (confirmPassword, password) => {
  validateRequired("Confirm password", confirmPassword);
  const reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
  if (password.length < 6) throw Error("Password length must be at least six chars");
  if (!reg.test(password)) throw Error("Invalid password. Must contain numbers and letters");
  if (confirmPassword !== password) throw Error("Passwords do not match");
};

const validateRecipeTitle = (title) => {
  validateRequired("Title", title);
  if (title.length < 6) throw Error("Title must be at least six chars");
  if (title.length > 45) throw Error("Title is too long! Maximum 45 chars");
};

const validateSourceUrl = (sourceUrl) => {
  const reg =
    /^(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  if (!reg.test(sourceUrl)) throw Error("Invalid source url");
};

const validateYield = (yield) => {
  if (yield < 1 || yield > 10) throw Error("Yield must be between 1-10");
};

const validatePrepTime = (prepTime) => {
  if (prepTime < 1) throw Error("Invalid prep-time");
};

const validateDifficultyLevel = (difficultyLevel) => {
  if (difficultyLevel > 3 || difficultyLevel < 1)
    throw Error("Difficulty level must be between 1-3");
};

const validateImage = (image) => {
  const reg = /(http(s?):\/\/)(.)*\.(?:jpe?g|gif|png)/;
  if (!reg.test(image)) throw Error("Invalid image url");
};

const validateIngredients = (ingredients) => {
  if (!ingredients.length) throw Error("Ingredients are required");
  ingredients.forEach((ingredient) => {
    if (!ingredient.note || !ingredient.unitId) throw Error("Invalid ingredient");
  });
};

const validateInstructions = (instructions) => {
  if (!instructions.length) throw Error("Instructions are required");
  instructions.forEach((instruction) => {
    if (!instruction) throw Error("Invalid instruction");
  });
};

module.exports = {
  validateRequired,
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  validateRecipeTitle,
  validateSourceUrl,
  validateYield,
  validatePrepTime,
  validateDifficultyLevel,
  validateImage,
  validateIngredients,
  validateInstructions,
};
