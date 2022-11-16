import { combineReducers } from "redux";

import { ConnectWallet } from "./connectwallet.reducers";
import { Ui } from "./ui.reducers";

const rootReducer = combineReducers({
  ConnectWallet,
  Ui,
});

export default rootReducer;
