import { api, setAuthToken } from "../../utils";
import { showAlertMessage } from "./alerts";

const REGISTER_SUCCESS = "users/REGISTER_SUCCESS";
const REGISTER_FAILURE = "users/REGISTER_FAILURE";
const USER_LOADED = "users/USER_LOADED";
const USER_LOADING_FAILURE = "users/USER_LOADED_FAILURE";

export const loadUser = () => async dispatch => {
    try {
        const res = await api.get("/users");
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
            setAuthToken(payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_FAILURE:
            setAuthToken();
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            }
        case USER_LOADING_FAILURE:
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