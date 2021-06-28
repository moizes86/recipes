const dummyDB = {
  users: [
    {
      email: "moshe@moshe.mn",
      username: "moshemantsur",
      password: "moshe86",
      dietsSelected: ["Kosher", "Vegan"],
    },
    {
      email: "moshe1@mos.mn",
      username: "moshemantsur1",
      password: "moshe861",
    },
  ],
  recipes: ["recipe1", "recipe2", "recipe3"],
  diets: ["Vegan", "Kosher", "Straight", "Gay", "Halal"],
};

function validateInputField(inputFields) {
  const totalErrors = [];
  for (const inputName in inputFields) {
    const errors = this.validateData(inputName, inputFields[inputName]);
    if (errors) {
      console.log(`Invalid ${inputName}`);
      totalErrors.push(errors);
    }
  }
  return totalErrors;
}

export const validateData = (inputName, value, password) => {
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
    },
    searchInput: {
      required: true,
      pattern: /^[a-zA-Z]{1,}\S.*[a-zA-Z]$/,
    },
  };

  const { required, pattern } = validations[inputName];

  if (required && !value) {
    if (inputName === "confirmPassword") return "Please confirm password";
    return `${inputName} is required`;
  }

  if (pattern && !pattern.test(value)) {
    return `Invalid ${inputName}`;
  }

  if (inputName === "confirmPassword" && password !== value) {
    return "Passwords do not match";
  }

  return false;
};

const getUser = (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userIndex = dummyDB.users.findIndex((user) => user.email === email);
      resolve(userIndex);
    }, 200);
  });
};

export const createUser = async ({ email, username, password }, dietsSelected) => {
  const userToSignup = { email, username, password, dietsSelected: dietsSelected };
  const userIndex = await getUser(email);
  if (userIndex === -1) {
    dummyDB.users.push(userToSignup);
    return { status: true, body: { email, username } };
  } else {
    return { status: false, message: "User already exists" };
  }
};

export const updateUser = (values, dietsSelected) => {
  const { userIndex, ...details } = values;
  return new Promise((resolve) => {
    setTimeout(() => {
      dummyDB.users[userIndex] = { ...dummyDB.users[userIndex], ...details, dietsSelected };
      resolve(dummyDB.users[userIndex]);
    }, 200);
  });
};

export const login = async ({ email, password }) => {
  const userIndex = await getUser(email);
  console.log(dummyDB.users[userIndex]);

  if (userIndex === -1 || dummyDB.users[userIndex].password !== password) {
    return { status: false, message: "Error login" };
  } else {
    return { status: true, body: dummyDB.users[userIndex] };
  }
};

export const getUserDetails = async (email) => {
  const userIndex = await getUser(email);
  return { userIndex, user: dummyDB.users[userIndex] };
};

export const getDiets = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dummyDB.diets);
    }, 50);
  });
};

export const addRecipe = (values) =>{
  console.log(values)
}

const DAL = {
  recipeActions(actionType, data) {
    switch (actionType) {
      case "getRecipes":
        return this.getRecipes();

      case "getDiets":
        return this.getDiets();

      case "filterRecipes":
        //  this.filterRecipes(data)
        break;

      case "addRecipe":
        return this.addRecipe(data);

      case "editRecipe":
        //  this.editRecipe(data)
        break;

      case "deleteRecipe":
        // this.deleteRecipe(data)
        break;

      case "addComment":
        // this.addComment(data)
        break;

      case "editComment":
        // this.editComment(data)
        break;

      case "deleteComment":
        // this.deleteComment(data);
        break;

      default:
        break;
    }
  },

  getRecipes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(dummyDB.recipes);
      }, 50);
    });
  },

  addRecipe(newRecipe) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dummyDB.recipes.push(newRecipe);
        resolve(dummyDB.recipes);
      }, 50);
    });
  },

  async requestSignup({ email, username, password }) {
    const userToSignup = { email, username, password };
    try {
      const userInDB = await this.userExists(email);
      console.log(userInDB.message);
      if (!userInDB) dummyDB.users.push(userToSignup);
      console.log(dummyDB.users);
    } catch (error) {
      console.log(error);
    }
  },

  async requestUpdateDetails(data, detailsToUpdate) {
    // check if exists, get the user and their index
    const { user, index } = await this.userExists(data.email);
    if (user && index) {
      // validate
      if (user.email === data.email && user.password === data.password) {
        // update details
        dummyDB.users[index] = { ...user, ...detailsToUpdate };
        console.log("Details updated:");
        console.log(dummyDB.users[index]);
      } else {
        console.log("details don't match");
      }
    } else {
      console.log("user does not exists");
    }
  },
};

export default DAL;

// TESTS
const userToSignup = {
  email: "moshe@mos.mn",
  username: "MosheMantsur",
  password: "moshe86",
  confirmPassword: "moshe86",
};

const userToLogin = {
  email: "moshe@mos.mn",
  password: "moshe86",
};

const userToUpdate = {
  email: "moshe0@mos.mn",
  password: "moshe861",
  confirmPassword: "moshe861",
};

// DAL.userActions(userToSignup, "signup");
// DAL.userActions(userToLogin, "login");
// DAL.userActions(userToUpdate, "updateDetails", {
//   username: "moshemantsur",
//   password: "moshe86!!!",
// });

