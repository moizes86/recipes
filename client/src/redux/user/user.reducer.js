const initialState = {
  activeUser: false,
  loading: false,
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

    case "ON_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
