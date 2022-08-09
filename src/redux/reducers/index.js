import { combineReducers } from "redux";
import login from "./login";
import user from "./user";
import rooms from "./rooms";
import admin from "./admin";

const createRootReducer = () => {
  return combineReducers({
    login,
    user,
    rooms,
    admin
  })
}

export default createRootReducer