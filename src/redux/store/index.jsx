import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducres from "../reducers";
const allReducrs = combineReducers({
  width: reducres.widthReducer,
  isOpen: reducres.openReducer,
});
export default createStore(allReducrs, composeWithDevTools());
