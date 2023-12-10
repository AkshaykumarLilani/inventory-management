import axios from "axios";
import {
    LOGIN_REQUEST_FAILURE,
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    SIGNUP_REQUEST_FAILURE,
    LOGOUT,
    SIGNUP_REQUEST,
} from "./actionTypes";
import { notify } from "../../Utils/notify";

export const login = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOGIN_REQUEST });
            const loginUrl = `/auth/login`;
            const response = await axios.post(loginUrl, data);
            dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: response.data });
            notify("Login Successful!", "success");
        } catch (err) {
            console.error(err);
            dispatch({ type: LOGIN_REQUEST_FAILURE });
            notify("Login Failed!", "error");
        }
    }
};

export const signup = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SIGNUP_REQUEST });
            const signupUrl = `/auth/signup`;
            const response = await axios.post(signupUrl, data);
            dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: response.data });
            notify("You are now logged in!", "success");
        } catch (err) {
            console.error(err);
            dispatch({ type: SIGNUP_REQUEST_FAILURE });
            notify("Registration Failed", "error");
        }
    }
}

export const logout = () => {
    return { type: LOGOUT };
};