import { combineReducers } from "redux";
import login from "./login";
import user from "./user";
import rooms from "./rooms";

const createRootReducer = () => {
  return combineReducers({
    login,
    user,
    rooms
  })
}

export default createRootReducer