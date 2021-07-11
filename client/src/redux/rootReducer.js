const initialState = { activeUser: false, loading: false, recipes: [] };

const rootReducer = (state = initialState, action) => {
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

    case "ON_SET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
