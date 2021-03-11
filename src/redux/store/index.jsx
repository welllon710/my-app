import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducres from "../reducers";
const allReducrs = combineReducers({
  width: reducres.widthReducer,
  isOpen: reducres.openReducer,
  isDetails: reducres.isDetails,
});
export default createStore(allReducrs, composeWithDevTools());
