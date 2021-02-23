import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducres from "../reducers";
const allReducrs = combineReducers({
  width: reducres.widthReducer,
});
export default createStore(allReducrs, composeWithDevTools());
