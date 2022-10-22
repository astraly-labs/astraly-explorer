import { combineReducers } from "redux";

import { ConnectWallet } from "./connectwallet.reducers";
import { Toast } from "./toast.reducers";
import { Ui } from "./ui.reducers";

const rootReducer = combineReducers({
  ConnectWallet,
  Toast,
  Ui,
});

export default rootReducer;
