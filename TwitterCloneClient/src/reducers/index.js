import { combineReducers } from "redux";
import authReducer from "./authReducer"; 
import postReducer from "./postReducer";  
import settingsReducer from "./settingsReducers";

export const reducers=combineReducers({authReducer,postReducer,settingsReducer})