import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import searchReducer from "./search/search.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer
});

export default rootReducer;
