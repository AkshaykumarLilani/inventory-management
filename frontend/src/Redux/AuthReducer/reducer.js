import { notify } from "../../Utils/notify";
import {
    LOGIN_REQUEST_FAILURE,
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT,
    SIGNUP_REQUEST,
} from "./actionTypes";

// Initial State
const initialState = {
    token: "",
    isAuth: false,
    loading: false,
    error: null,
    success: false,
    user: null
};

// Reducer
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            notify("Logout successful", "success");
            return initialState;
        case LOGIN_REQUEST_FAILURE:
            return { ...initialState, error: true, loading: false };
        case LOGIN_REQUEST_SUCCESS:
            return { ...state, isAuth: true, loading: false, error: null, success: true, token: action.payload.token, user: action.payload.user };
        case LOGIN_REQUEST:
            return { ...initialState, loading: true };
        case SIGNUP_REQUEST:
            return { ...initialState, loading: true };
        case LOGOUT:
            return { ...initialState }
        default:
            return state;
    }
};