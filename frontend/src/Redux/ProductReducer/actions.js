import axios from "axios";
import { GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_FAILURE, GET_ALL_PRODUCTS_SUCCESS, VIEW_PRODUCT_REQUEST, VIEW_PRODUCT_SUCCESS, VIEW_PRODUCT_FAILURE, EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE } from "./actionTypes";
import {notify} from "../../Utils/notify";

export const getAllProducts = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
            const url = `/products`;
            const response = await axios.get(url);
            dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: response.data });
            notify("Products Loaded Successfully", "success");
        } catch (err) {
            console.error(err);
            dispatch({ type: GET_ALL_PRODUCTS_FAILURE });
        }
    }
}

export const getSingleProduct = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: VIEW_PRODUCT_REQUEST });
            const url = `/products/${id}`;
            const response = await axios.get(url);
            dispatch({ type: VIEW_PRODUCT_SUCCESS, payload: response.data });
            // notify("Products Loaded Successfully", "success");
        } catch (err) {
            console.error(err);
            dispatch({ type: VIEW_PRODUCT_FAILURE });
        }
    }
}

export const updateSingleProduct = (id, data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_PRODUCT_REQUEST });
            const url = `/products/${id}`;
            const response = await axios.patch(url, data);
            dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: response.data });
            // notify("Products Loaded Successfully", "success");
        } catch (err) {
            console.error(err);
            dispatch({ type: EDIT_PRODUCT_FAILURE });
        }
    }
}

export const deleteSingleProduct = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: DELETE_PRODUCT_REQUEST });
            const url = `/products/${id}`;
            const response = await axios.delete(url);
            dispatch({ type: DELETE_PRODUCT_SUCCESS });
            // notify("Products Loaded Successfully", "success");
        } catch (err) {
            console.error(err);
            dispatch({ type: DELETE_PRODUCT_FAILURE });
        }
    }
}

export const createSingleProduct = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CREATE_PRODUCT_REQUEST });
            const url = `/products/`;
            const response = await axios.post(url, data);
            dispatch({ type: CREATE_PRODUCT_SUCCESS });
            // notify("Products Loaded Successfully", "success");
        } catch (err) {
            console.error(err);
            dispatch({ type: CREATE_PRODUCT_FAILURE });
        }
    }
}