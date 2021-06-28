import DAL from "../../DAL/api";

const initialState = {
  activeUser: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_LOGIN":
    case "ON_UPDATE_USER":
      return {
        ...state,
        activeUser: action.payload,
      };

    case "ON_LOGOUT":
      return {
        ...state,
        activeUser: false,
      };

    default:
      return state;
  }
};

export default userReducer;
