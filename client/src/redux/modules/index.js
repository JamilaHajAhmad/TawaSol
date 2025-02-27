import { combineReducers } from "redux";
import users from "./users";
import posts from "./posts";
import profiles from "./profiles";
import alerts from "./alerts";

export default combineReducers({
    users,
    posts,
    profiles,
    alerts
    });
/* This is the root reducer that will combine all the reducers
into one and then we will use this root reducer to create the store */