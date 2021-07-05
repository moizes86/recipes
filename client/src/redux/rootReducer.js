import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import inputsReducer from "./inputs/inputs.reducer";
import searchReducer from "./search/search.reducer";

const rootReducer = combineReducers({
  inputs: inputsReducer,
  user: userReducer,
  search: searchReducer
});

export default rootReducer;
