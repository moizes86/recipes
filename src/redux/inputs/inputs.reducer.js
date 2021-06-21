import { validateInput } from "../../DAL/validations";

const initialState = {
  email: null,
  username: null,
  password: "",
  confirmPassword: "",
  searchInput: "",
  recipeCategories: [],
  errors: {
    email: [null],
    username: [null],
    password: [null],
    confirmPassword: [null],
    searchInput: [null],
  },
};

const inputsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_INPUT_CHANGE":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "ON_VALIDATE_INPUT":
      let errorsArr;

      if (action.payload.name === "confirmPassword") {
        const { password } = state;
        errorsArr = validateInput({ ...action.payload, password });
      } else {
        errorsArr = validateInput(action.payload);
      }

      return {
        ...state,
        errors: { ...state.errors, [action.payload.name]: errorsArr },
      };

    case "ON_SELECT_RECIPE_CATEGORY":
      const { name, checked } = action.payload;
      checked
        ? state.recipeCategories.push(name)
        : state.recipeCategories.splice(state.recipeCategories.indexOf(name), 1);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default inputsReducer;
