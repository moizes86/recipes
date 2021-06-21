import DAL from "../../DAL/api";

const initialState = {
  activeUser: false,
  signupError: null,
  loginError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_SET_USER":
      const { email, username, password, recipeCategories } = action.payload;
      const userWasSet_DAL = DAL.setUser(email, username, password, recipeCategories);
      return {
        ...state,
        activeUser: userWasSet_DAL,
        signupError: !userWasSet_DAL ? "User already exists" : null,
      };

    case "ON_LOGIN":
      DAL.userExists(action.payload)
      return {
        ...state,
        activeUser: action.payload,
      };

    case "ON_LOGOUT":
      return {
        ...state,
        activeUser: false,
      };

    case "ON_UPDATE_USER":
      console.log(action.payload);
      DAL.updateUser(action.payload);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userReducer;
