import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import reducres from "../reducers";
const storageConfig = {
  key: "root",
  storage: storageSession, // 缓存机制
  blacklist: ["isDetails", "isOpen", "width",], // reducer 里不持久化的数据,除此外均为持久化数据
};
const allReducrs = combineReducers({
  width: reducres.widthReducer,
  isOpen: reducres.openReducer,
  isDetails: reducres.isDetails,
  userInfo: reducres.userInfo,
  playList: reducres.savePlayList,
  currentMusic: reducres.currentMusic,
});
const myPersistReducer = persistReducer(storageConfig, allReducrs);
const store = createStore(myPersistReducer, composeWithDevTools());
export const persistor = persistStore(store);
export default store;
