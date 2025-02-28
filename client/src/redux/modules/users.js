import { api, setAuthToken } from "../../utils";
import { showAlertMessage } from "./alerts";

const REGISTER_SUCCESS = "users/REGISTER_SUCCESS";
const REGISTER_FAILURE = "users/REGISTER_FAILURE";
const USER_LOADED = "users/USER_LOADED";
const USER_LOADING_FAILURE = "users/USER_LOADED_FAILURE";

const LOGIN_SUCCESS = "users/LOGIN_SUCCESS";
const LOGIN_FAILURE = "users/LOGIN_FAILURE";
const LOGOUT = "users/LOGOUT";

export const loadUser = () => async dispatch => {
    try {
        const res = await api.get("/api/users");
        dispatch({ type: USER_LOADED, payload: res.data });
    }
    catch(error) {
        dispatch({ type: USER_LOADING_FAILURE });
    }
}

export function register(formData) {
    return async function registerThunk(dispatch) {
        try {
            // Call the register API endpoint
            const res = await api.post("/api/users/register", formData);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            dispatch(loadUser());
            dispatch(showAlertMessage("Registration successful", "success"));
        }
        catch(error) {
            const errors = error.response.data.errors;
            if(errors.length > 0) {
                errors.forEach(error => { 
                    dispatch(showAlertMessage(error.msg, "error"));
                })
            }
            dispatch({ type: REGISTER_FAILURE });
        }
    }
}

export function login(email, password) {
    return async function loginThunk(dispatch) {
        try {
            // Call the login API endpoint
            const res = await api.post("/api/users/login", { email, password});
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            dispatch(loadUser());
            dispatch(showAlertMessage("Log in successful", "success"));
        }
        catch(error) {
            const errors = error.response.data.errors;
            if(errors.length > 0) {
                errors.forEach(error => { 
                    dispatch(showAlertMessage(error.msg, "error"));
                })
            }
            dispatch({ type: LOGIN_FAILURE });
        }
    }
}

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    dispatch(showAlertMessage("Logged out", "success"));
}

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function reducer(state=initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            setAuthToken(payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            setAuthToken();
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            }
        case USER_LOADING_FAILURE:
        case LOGOUT:
            setAuthToken();
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default:
            return state;
    } 
}